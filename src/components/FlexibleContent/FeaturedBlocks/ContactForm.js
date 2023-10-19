import React, {Component} from "react"
import {Container} from "reactstrap"
import ReactDOM from 'react-dom'
import {Label, FormGroup, Input, FormFeedback} from "reactstrap"
import scrollToElement from "scroll-to-element"
import styled from "styled-components"
import Button from "components/shared/Button"
import Text from "components/shared/Text"
import FormStyled from "components/shared/FormStyled"
import {
    validateRequired,
    validateEmail
} from 'utils/Validations'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"


const FormFeedbackStyled = styled(FormFeedback)`
    text-align: right;
`

const DropdownButton = styled.div`
    border: 0;
    padding: 0;
    display: block;
    width: 100%;

    svg {
        color: black;
    }
`

class ContactForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            telephone: '',
            email: '',
            enquiry_type: 'General',
            send_to: 'queries@tastefestivals.com',
            message: '',
            googleVerified: '',
            sendingFormRequest: false,
            validate: {
                name: '',
                telephone: '',
                email: '',
                enquiry_type: '',
                message: '',
                googleVerified: '',
                googleVerifiedErrMsg: 'Google recaptcha is required'
            },
            required: {
                name: '',
                enquiry_type: 'General',
                email: '',
            },
            success: false
        }

        // Bind this to methods
        this.handleChange = this.handleChange.bind(this)
        this.setEnquiryType = this.setEnquiryType.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.onGoogleVerify = this.onGoogleVerify.bind(this)

        // Bind this to validation methods
        this.validateRequired = validateRequired.bind(this);
        this.validateEmail = validateEmail.bind(this);

        // Create form ref
        this.form = React.createRef();
        this.successMessage = React.createRef();
    }

    componentDidMount() {
        // set enquiry type for first item on load
        this.setEnquiryType(this.props.data.enquiryTypes[0].name, this.props.data.enquiryTypes[0].email)
    }

    // Method to update field values in state on change
    handleChange(e) {
        const target = e.target
        const name = target.name
        const value = target.value

        let required = this.state.required

        if (required.hasOwnProperty(name)) {
            required[name] = value
        }

        if (name === "enquiry_type") {
            // Update value in state
            const send_to = target.options[target.selectedIndex].getAttribute('data-email')
            this.setState({
                required,
                [name]: value,
                send_to
            });
        } else {
            // Update value in state
            this.setState({
                required,
                [name]: value,
            });
        }
    }

    setEnquiryType(value, send_to) {
        // set for first item on load
        this.setState({
            enquiry_type: value,
            send_to
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        //disable the button so we can't send multiple requests
        this.setState({sendingFormRequest: true});

        // Create form data ready for api wrapper call
        let formData = {};
        for (let key in this.state) {
            if (typeof this.state[key] === 'object' && this.state[key].constructor === Object) {
                for (let k in this.state[key]) {
                    formData[key + '[' + k + ']'] = this.state[key][k];
                    //formData.append(key + '[' + k + ']', this.state[key][k])
                }
            } else {
                formData[key] = this.state[key];
                //formData.append(key, this.state[key]);
            }
        }

        let {validate} = this.state
        let errors = false

        for (let key in this.state.validate) {
            if (this.state.required[key] === "" && key !== "googleVerified" && key !== "googleVerifiedErrMsg") {
                validate[key] = 'has-danger'
                errors = true
            }

            this.setState({validate});
        }

        // return if errors
        if (errors) return

        let apiName = 'tasteFestivalLondon';
        let path = "/contact"
        let myInit = { // OPTIONAL
            headers: {}, // OPTIONAL
            response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
            queryStringParameters: formData
        }

        return API.get(apiName, path, myInit).then(response => {
            // return response.data
            this.setState({sendingFormRequest: false});

            // console.log(response)

            if (response.status === 200 && response.data.result === "success") {
                const domNode = ReactDOM.findDOMNode(this.successMessage.current)

                this.setState({
                    success: true
                });

                scrollToElement(domNode, {
                    offset: -120,
                    duration: 500
                });

                // window.scrollTo({
                //     top: domNode.offsetTop,
                //     behavior: 'smooth'
                // })
            }
        }).catch(error => {
            this.setState({sendingFormRequest: false});
            console.log(error)
            return error.response
        })
    }

    render() {
        const {data} = this.props

        if (this.state.success) {
            return (
                <Container className="py-4" fluid>
                    <div dangerouslySetInnerHTML={{__html: data.thankyouMessage}} ref={this.successMessage}/>
                </Container>
            )
        } else {
            return (
                <Container className="py-4" fluid>
                    <FormStyled onSubmit={(e) => this.handleSubmit(e)} noValidate ref={this.form}>
                        <FormGroup>
                            <Label for="name">{data.nameHeading}<Text as="span" red>*</Text></Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder={data.namePlaceholder}
                                value={this.state.name}
                                valid={this.state.validate.name === 'has-success'}
                                invalid={this.state.validate.name === 'has-danger'}
                                onChange={e => {
                                    this.handleChange(e)
                                    this.validateRequired(e)
                                }}
                            />
                            <FormFeedbackStyled>
                                Your name is required
                            </FormFeedbackStyled>
                        </FormGroup>
                        <FormGroup>
                            <Label for="enquiry_type">{data.enquiryHeading}<Text as="span" red>*</Text></Label>
                            <DropdownButton className="position-relative">
                                <Input
                                    type="select"
                                    name="enquiry_type"
                                    id="enquiry_type"
                                    onChange={this.handleChange}
                                    value={this.state.enquiryTypes}
                                >
                                    {data.enquiryTypes && data.enquiryTypes.map((enquiry, i) => {
                                        return (
                                            <option
                                                key={i}
                                                value={enquiry.name}
                                                data-email={enquiry.email}
                                            >
                                                {enquiry.name}
                                            </option>
                                        )
                                    })}
                                </Input>
                                {/* {this.state.dropdownOpen ? (
                                    <FontAwesomeIcon icon={faAngleUp}/>
                                ) : ( */}
                                    <FontAwesomeIcon icon={faAngleDown}/>
                                {/* )} */}
                            </DropdownButton>
                        </FormGroup>
                        <FormGroup>
                            <Label for="telephone">{data.telephoneHeading}</Label>
                            <Input
                                type="text"
                                name="telephone"
                                id="telephone"
                                placeholder={data.telephonePlaceholder}
                                valid={this.state.validate.telephone === 'has-success'}
                                invalid={this.state.validate.telephone === 'has-danger'}
                                value={this.state.telephone}
                                onChange={e => {
                                    this.handleChange(e)
                                    // this.validateRequired(e)
                                }}
                            />
                            <FormFeedbackStyled>
                                A valid phone number is required
                            </FormFeedbackStyled>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">{data.emailHeading}<Text as="span" red>*</Text></Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder={data.emailPlaceholder}
                                value={this.state.email}
                                valid={this.state.validate.email === 'has-success'}
                                invalid={this.state.validate.email === 'has-danger'}
                                onChange={e => {
                                    this.handleChange(e)
                                    this.validateRequired(e)
                                    this.validateEmail(e)
                                }}
                            />
                            <FormFeedbackStyled>
                                A valid email address is required
                            </FormFeedbackStyled>
                        </FormGroup>
                        <FormGroup>
                            <Label for="message">{data.messageHeading}</Label>
                            <Input
                                type="textarea"
                                name="message"
                                id="message"
                                value={this.state.message}
                                placeholder={data.messagePlaceholder}
                                onChange={e => this.handleChange(e)}
                            />
                        </FormGroup>
                        <Text regular>
                            <Text as="span" red>*</Text> Required fields<br/>
                        </Text>
                        <Button 
                            as="button" 
                            color="black" 
                            className="my-3"
                            type="submit"
                        >
                            <span>{data.submitText}</span>
                        </Button>
                    </FormStyled>
                </Container>
            )
        }
    }
}

export default ContactForm
