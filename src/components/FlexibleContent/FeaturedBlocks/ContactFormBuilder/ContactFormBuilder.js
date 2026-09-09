import React, { Component } from "react"
import styled from "styled-components"
import ReactDOM from 'react-dom'
import scrollToElement from "scroll-to-element"
import axios from 'axios'
import { Container } from "reactstrap"
import Text from "components/shared/Text"
import Button from "components/shared/Button"
import FormStyled from "components/shared/FormStyled"
import {
    validateRequired,
    validateEmail,
    validateFile
} from 'utils/Validations'
import TextField from "./TextField"
import DropdownField from "./DropdownField"
import CheckboxField from "./CheckboxField"
import RadioField from "./RadioField"
import FileUploadField from "./FileUploadField"

const API = {
    get: (name, path, init) => axios.get(`${process.env.GATSBY_BACKEND_URL}${path}`, { params: init.queryStringParameters }),
    post: (name, path, init) => axios.post(`${process.env.GATSBY_BACKEND_URL}${path}`, init.body),
}


const Loading = styled.span`
    display: inline-block;
    width: 35px;
    height: 35px;

    &:after {
        content: " ";
        display: block;
        width: 35px;
        height: 35px;
        margin-left: .5rem;
        border-radius: 50%;
        border: 6px solid #000;
        border-color: #000 transparent #000 transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

const SuccessMessage = styled.div`
    color: ${props => props.theme.colors.primary};
`

class ContactFormBuilder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            send_to: this.props.block.sendTo,
            email_subject: this.props.block.emailSubject,
            google_sheet_id: this.props.block.googleSheetId,
            fields: {},
            validate: {},
            required: {},
            googleVerified: '',
            sendingFormRequest: false,
            success: false
        }

        // Bind this to methods
        this.handleChange = this.handleChange.bind(this)
        this.setFieldState = this.setFieldState.bind(this)
        // this.setEnquiryType = this.setEnquiryType.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.onGoogleVerify = this.onGoogleVerify.bind(this)

        // Bind this to validation methods
        this.validateRequired = validateRequired.bind(this);
        this.validateEmail = validateEmail.bind(this);
        this.validateFile = validateFile.bind(this);

        // Create form ref
        this.form = React.createRef();
        this.successMessage = React.createRef();
    }

    componentDidMount() {
        this.setFieldState()
    }

    setFieldState() {
        let fields = {}
        let validate = {}
        let required = {}

        // console.log(this.props.block.fields)

        // Set initial state for fields
        this.props.block.wpFields && this.props.block.wpFields.forEach((field) => {
            let name = field.name
            if (field.__typename === "WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Checkboxes") {
                fields[name] = []
                field.options.forEach((option, i)=> {
                    fields[name][i] = { label: field.label, value: option.label, isChecked: false }
                })
            } else {
                fields[name] = { label: field.label, value: ""}
            }
            validate[name] = ""
            if (field.required === "yes") required[name] = ""
        })

        this.setState({
            fields,
            validate,
            required
        })
    }

    // Method to update field values in state on change
    async handleChange(e) {
        // e.preventDefault()
        const target = e.target
        const name = target.name
        const value = target.value

        let required = this.state.required

        if (required.hasOwnProperty(name)) {
            required[name] = value
        }

        let fields = this.state.fields
        
        if (target.type === 'checkbox') {
            let hasValue = ""
            fields[name].forEach(field => {
                if (field.value === value) {
                    field.isChecked = target.checked
                    if (field.isChecked) {
                        hasValue = true
                    }
                } 
            })
            if (required.hasOwnProperty(name)) {
                required[name] = hasValue
            }
        } else if (target.type === 'file') {
            fields[name].value = target.files[0]
            fields[name].name = target.files[0].name
            fields[name].type = "file"
            fields[name].size = target.files[0].size
            fields[name].base64 = await this.toBase64(target.files[0])
        } else {
            fields[name].value = value
        }

        // used on backend
        fields[name].type = target.type

        // Update value in state
        this.setState({
            required,
            fields
        })
    }


    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

    async handleSubmit(e) {
        e.preventDefault();

        //disable the button so we can't send multiple requests
        this.setState({ sendingFormRequest: true })

        // Create form data ready for api wrapper call
        let formData = {};
        for (let key in this.state) {
            formData[key] = this.state[key];
        }

        let { validate } = this.state
        let errors = false
        
        // make sure all validated
        for (let key in this.state.validate) {
            if (this.state.required[key] === "" && key !== "googleVerified" && key !== "googleVerifiedErrMsg") {
                validate[key] = 'has-danger'
                errors = true
            }

            this.setState({ validate });
        }

        // return if errors
        if (errors) {
            this.setState({ sendingFormRequest: false })
            return
        }

        for (let key in formData.fields) {
			//this is hte code that uses the AWS Amplify backend Lambda function to upload the file to S3
            if (formData.fields[key].type !== undefined && formData.fields[key].type === "file") {
	
				//check file size first
				if (formData.fields[key].size/1048576>2) {//greater than 2MB
					validate[key] = 'has-danger'
                	errors = true
            		this.setState({ validate });
				} else {
	                try {
	                	//it's possible to overwrite existing files if we use the same filename so we add the current unix timestamp to the request to prevent that
	                    const result = await Storage.put(Date.now()+formData.fields[key].name, formData.fields[key].value);
	                    console.log('result of put: ',result)
	                    
	                    //because the pre-signed s3 links expire after maximum 1 week, we pass the object key 
	                    //to a page on the wordpress backend, which generates the S3 url on demand
	                    
	                    const fileUrl = process.env.GATSBY_BACKEND_URL+'/admin.php?page=s3_bucket&key='+result.key;
	                    
	                    // on return add s3 url to formdata ready to be inserting to email and google sheets
						formData.fields[key] = {label: "File Upload", value: fileUrl, type: "text"};
	                } catch (error) {
	                    console.log('Error uploading file: ', error);
						//this error is trigger if the file is not of the correct type
						validate[key] = 'has-danger'
	                	errors = true
	            		this.setState({ validate });
	                }
                }
            }
        }

        // return if errors
        if (errors) return

        let apiName = 'tasteFestivalLondon';
        let path = "/contact-form-builder"
        let myInit = { // OPTIONAL
            body: formData,
            headers: {}, // OPTIONAL
            response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
            // queryStringParameters: formData
        }

        // console.log(formData)

         return API.post(apiName, path, myInit).then(response => {
             // return response.data
             this.setState({ sendingFormRequest: false })

             // console.log(response)

             if (response.status === 200 && response.data.result === "success") {
                 
                 this.setState({
                    success: true,
                    fields: {}
                 });

                 //reset fields
                 this.setFieldState()
             }
         }).catch(error => {
             this.setState({sendingFormRequest: false});
             console.log(error)
             return error.response
         })
    }

    render() {
        const { wpFields, requiredFieldsText, submitText, thankYouMessage } = this.props.block

        // console.log(this.state)

        return(
            <>
                <Container className="py-4" fluid>
                    <FormStyled onSubmit={(e) => this.handleSubmit(e)} noValidate ref={this.form}>
                        {
                            wpFields && wpFields.map((field, i) => {
                                switch (field.__typename) {
                                    case "WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Text":
                                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Text':
                                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Text':
                                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Text':
                                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Text':
                                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Text':
                                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Text':
                                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Text':
                                        return(
                                            <TextField 
                                                key={i} 
                                                field={field} 
                                                state={this.state} 
                                                handleChange={this.handleChange} 
                                                validateRequired={this.validateRequired} 
                                            />
                                        )

                                    case "WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Dropdown":
                                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Dropdown':
                                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Dropdown':
                                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Dropdown':
                                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Dropdown':
                                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Dropdown':
                                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Dropdown':
                                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Dropdown':
                                        return(
                                            <DropdownField 
                                                key={i} 
                                                field={field} 
                                                state={this.state} 
                                                handleChange={this.handleChange} 
                                                validateRequired={this.validateRequired} 
                                            />
                                        )

                                    case "WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Checkboxes":
                                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Checkboxes':
                                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Checkboxes':
                                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Checkboxes':
                                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Checkboxes':
                                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Checkboxes':
                                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Checkboxes':
                                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Checkboxes':
                                        return(
                                            <CheckboxField 
                                                key={i}
                                                field={field} 
                                                state={this.state} 
                                                handleChange={this.handleChange} 
                                                validateRequired={this.validateRequired} 
                                            />
                                        )

                                    case "WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Radio":
                                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Radio':
                                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Radio':
                                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Radio':
                                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Radio':
                                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Radio':
                                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Radio':
                                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Radio':
                                        return(
                                            <RadioField 
                                                key={i}
                                                field={field} 
                                                state={this.state} 
                                                handleChange={this.handleChange} 
                                                validateRequired={this.validateRequired} 
                                            />
                                        )

                                    case "WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_FileUpload":
                                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_FileUpload':
                                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_FileUpload':
                                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_FileUpload':
                                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_FileUpload':
                                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_FileUpload':
                                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_FileUpload':
                                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_FileUpload':
                                        return(
                                            <FileUploadField 
                                                key={i}
                                                field={field} 
                                                state={this.state} 
                                                handleChange={this.handleChange} 
                                                validateFile={this.validateFile} 
                                                validateRequired={this.validateRequired} 
                                            />
                                        )

                                    default:
                                        return ""
                                }
                            })
                        }

                        <Text sm bold>* {requiredFieldsText}</Text>

                        <div className="d-flex align-items-center">
                            <Button
                                as="button" 
                                color="black" 
                                className="my-3"
                                type="submit"
                                disabled={this.state.sendingFormRequest}
                            >
                                <span>
                                    {this.state.sendingFormRequest ? ("Sending...") : (<>{submitText}</>)}
                                </span>
                            </Button>
                            {this.state.sendingFormRequest &&
                                <Loading />
                            }
                        </div>
                    </FormStyled>
                </Container>
                {this.state.success &&
                    <Container className="py-4" fluid>
                        <SuccessMessage dangerouslySetInnerHTML={{__html: thankYouMessage}} ref={this.successMessage}/>
                    </Container>
                }
            </>
        )
        
    }
}

export default ContactFormBuilder