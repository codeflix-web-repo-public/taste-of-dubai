import React, {Component} from "react"
import {Container} from "reactstrap"
import ReactDOM from 'react-dom'
import { Form, Label, FormGroup, Input, FormFeedback } from "reactstrap"
import scrollToElement from "scroll-to-element"
import styled from "styled-components"
import Button from "components/shared/Button"
import Text from "components/shared/Text"
import {
    validateRequired,
    validateEmail
} from 'utils/Validations'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons"


const FormStyled = styled(Form)`
    label {
        text-transform: uppercase;
        margin: 0;
        font-size: ${props => props.theme.font.size.sm};
        font-family: ${props => props.theme.font.family.bold};
    }

    .form-control {
        height: 50px;
        border-radius: 0;
        border-color: ${props => props.theme.colors.grey2};

        &::placeholder {
            color: ${props => props.theme.colors.grey4};
        }
    }

    select {
        appearance: none;
    }

    svg {
        position: absolute;
        right: 1rem;
        top: .8rem;
        color: ${props => props.theme.colors.secondary};
        font-size: 1.5rem;
    }

    textarea.form-control {
        min-height: 150px;
    }

    .invalid-feedback {
        color: ${props => props.theme.colors.primary};
    }

    .form-control.is-invalid:focus {
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0;
    }
`

const FormFeedbackStyled = styled(FormFeedback)`
    text-align: right;
`

const DropdownButton = styled.button`
    border: 0;
    padding: 0;
    display: block;
    width: 100%;
`

class CompetitionForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            question: '',
            question_heading: props.data.questionHeading,
            name: '',
            email: '',
            send_to: props.data.sendTo,
            googleVerified: '',
            sendingFormRequest: false,
            validate: {
                question: '',
                name: '',
                email: '',
                googleVerified: '',
                googleVerifiedErrMsg: 'Google recaptcha is required'
            },
            required: {
                question: '',
                name: '',
                email: '',
            },
            success: false
        }

        // Bind this to methods
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.onGoogleVerify = this.onGoogleVerify.bind(this)

        // Bind this to validation methods
        this.validateRequired = validateRequired.bind(this);
        this.validateEmail = validateEmail.bind(this);

        // Create form ref
        this.form = React.createRef();
        this.successMessage = React.createRef();
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

        // Update value in state
        this.setState({
            required,
            [name]: value,
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
        let path = "/competition"
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
                            <Label for="question">{data.questionHeading}<Text as="span" red>*</Text></Label>
                            <Input
                                type="text"
                                name="question"
                                id="question"
                                placeholder={data.questionPlaceholder}
                                valid={this.state.validate.question === 'has-success'}
                                invalid={this.state.validate.question === 'has-danger'}
                                value={this.state.question}
                                onChange={e => {
                                    this.handleChange(e)
                                    this.validateRequired(e)
                                }}
                            />
                            <FormFeedbackStyled>
                                This field is required
                            </FormFeedbackStyled>
                        </FormGroup>
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
                        {data.newsletterText && 
                            <Text className="pt-2" dangerouslySetInnerHTML={{ __html: data.newsletterText }} />
                        }

                        <FormGroup check>
                            <Label check>
                                <Input 
                                    type="radio" 
                                    name="newsletter" 
                                    checked={this.state.newsletter === "yes"}
                                    value="yes"
                                    onChange={e => {
                                        this.handleChange(e)
                                    }}
                                />{' '}
                                {data.newsletterYesText}
                            </Label>
                        </FormGroup>
                        <FormGroup check className="pt-2">
                            <Label check>
                                <Input 
                                    type="radio" 
                                    name="newsletter" 
                                    checked={this.state.newsletter === "no"}
                                    value="no"
                                    onChange={e => {
                                        this.handleChange(e)
                                    }}
                                />{' '}
                                {data.newsletterNoText}
                            </Label>
                        </FormGroup>
                        <Text regular className="pt-3">
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

export default CompetitionForm
