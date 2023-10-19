import React, { Component, useContext } from "react"
import { StaticQuery, graphql } from "gatsby"
import CustomImage from "components/shared/CustomImage"
import { Container, Row, Col, Label, Form, Input, FormFeedback, FormGroup } from "reactstrap"
import scrollToElement from "scroll-to-element"
import styled from "styled-components"
import { media } from "utils/Media"
import ContainerMax from "components/shared/ContainerMax"
import Button from "components/shared/Button"
import Text from "components/shared/Text"
// import { LinkSearchReplace } from "utils/LinkSearchReplace"
import { LanguageContext } from "utils/LanguageContext"
import {
    validateRequired,
    validateEmail
} from "utils/Validations"

const ContainerMaxStyled = styled(ContainerMax)`
    color: ${props => props.theme.colors.grey1};   
    padding-top: 3rem;
    padding-bottom: 1.5rem;

    @media ${media.md} {
        padding-top: 4rem;
        padding-bottom: 4rem;
    }

    label {
        font-family: ${props => props.theme.font.family.bold};
        font-size: ${props => props.theme.font.size.sm};
        margin: 0;
    }

    a {
        color: ${props => props.theme.colors.yellow};

        &:hover {
            text-decoration: underline;
        }
    }

    .form-group {
        margin-bottom: 2rem;
    }
`

const Title = styled.h3`
    text-transform: uppercase;
    position: absolute;
    top: -3.7rem;
`

const ContainerStyled = styled(Container)`
    position: relative;
    padding: 2rem;
    padding-top: 2.5rem;
    color: white;

    &:before {
        content: "";
        position: absolute;
        background-image: ${props => props.theme.colors.gradient};
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
`

const ContainerInner = styled.div`
    position: relative;
    z-index: 2;
`

const StyledInput = styled(Input)`
    background-color: transparent;
    color: ${props => props.theme.colors.grey1};
    background-color: ${props => props.theme.colors.white};
    padding: .15rem 1rem;
    width: 100%;
    border: none;
    height: 40px;
    border-radius: 0;
    font-size: ${props => props.theme.font.size.sm};

    &::placeholder {
        color: ${props => props.theme.colors.black};
        font-size: ${props => props.theme.font.size.sm};
    }
`

const FormFeedbackStyled = styled(FormFeedback)`
    color: white;
    position: absolute;
`

const SubmitButton = styled(Button)`
    width: 100%;

    @media ${media.md} {
        margin-top: 1.55rem;
    }

    &.disabled {
        opacity: 1;
        span {
            background-color: ${props => props.theme.colors.purple} !important;
        }
    }
`

class NewsletterSignup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cd_fullname: "",
            email: "",
            validate: {
                email: ''
            },
            required: {
                email: ''
            },
            returnURL: "https://tasteofabudhabifestival.com/thanks-for-signing-up/"
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validateRequired = validateRequired.bind(this)
        this.validateEmail = validateEmail.bind(this)
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            // this.setState({
            //     returnURL: window.location.href
            // })

            const result = this.getParameterByName('result')
            const fullname = this.getParameterByName('fullname')
            const email = this.getParameterByName('email')
            const trackingname = this.getParameterByName('trackingname')

            if (result) {
                const header = document.getElementById('siteHeader')
                let headerHeight = 0
                if (header) {
                    headerHeight = header.offsetHeight
                }

                this.setState({
                    status: result
                })

                if (result === "success") {
                    window.analytics.identify({
                        fullname: fullname,
                        email: email,
                    })
                    window.analytics.track(trackingname, {
                        fullname: fullname,
                        email: email,
                    })
                }

                setTimeout(() => {
                    scrollToElement("#newsletter-signup", {
                        offset: - headerHeight,
                        duration: 500
                    })
                }, 200);
            }
        }
    }

    getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        let required = this.state.required

        if (required.hasOwnProperty(name)) {
            required[name] = value
        }

        // Update value in state
        this.setState({
            required,
            [name]: value,
        })
    }

    onSubmit(e) {
        var emailAddress = this.state.email
        var errorString = '';
        if (emailAddress === '' || emailAddress.indexOf('@') === -1) {
            errorString = 'Please enter your email address';
        }

        if (errorString.length > 0) {
            alert(errorString)
            e.preventDefault()
        }
    }

    render() {
        return (
            <ContainerMax maxWidth="1920" id="newsletter-signup" noPadding className="overflow-hidden position-relative">
                <CustomImage image={this.props.data.backgroundImageMobile} className="d-md-none position-absolute w-100 h-100 object-fit-cover" />
                <CustomImage image={this.props.data.backgroundImage} className="d-none d-md-block position-absolute w-100 h-100 object-fit-cover" />
                <ContainerMaxStyled>
                    <ContainerStyled>
                        <ContainerInner>
                            {this.props.data.title &&
                                <Title>{this.props.data.title}</Title>
                            }
                            {this.props.data.text &&
                                <Text as="div" bold dangerouslySetInnerHTML={{ __html: this.props.data.text }} className="pb-3" />
                            }
                            <div class="_form_5"></div><script src="https://tasteofdubai2023.activehosted.com/f/embed.php?id=5" type="text/javascript" charset="utf-8"></script>
                            <Form
                                name="signup"
                                id="_form_5_"
                                action='https://tasteofdubai2023.activehosted.com/proc.php?'
                                method='post'
                                autoComplete="off"
                                noValidate
                                onSubmit={(e) => this.onSubmit(e)}
                                ref={form => this.form = form}
                            >
                                <input type="hidden" name="u" value="5" />
                                <input type="hidden" name="f" value="5" />
                                <input type="hidden" name="s" />
                                <input type="hidden" name="c" value="0" />
                                <input type="hidden" name="m" value="0" />
                                <input type="hidden" name="act" value="sub" />
                                <input type="hidden" name="v" value="2" />
                                <input type="hidden" name="or" value="6f5a9c77644d611b0338a2a29c2630c1" />
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col xs={12} md={4} lg={5} className="pb-2 pb-lg-0">
                                                <Label for="fullname">FIRST NAME</Label>
                                                <StyledInput
                                                    type="text"
                                                    name="fullname"
                                                    id="fullname"
                                                    placeholder="Name"
                                                    value={this.state.cd_fullname}
                                                    onChange={e => {
                                                        this.handleChange(e)
                                                    }}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} lg={5} className="pb-2 pb-lg-0">
                                                <FormGroup>
                                                    <Label for="EMAIL">EMAIL*</Label>
                                                    <StyledInput
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        placeholder="Your email address"
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
                                            </Col>
                                            <Col xs={12} md={{ order: 1, size: 4 }} lg={2}>  {/*className="d-flex align-items-center"*/}
                                                <SubmitButton
                                                    as="button"
                                                    color="tertiary"
                                                    className={`${this.state.validate.email === "has-danger" || this.state.email === "" ? "disabled" : ""}`}
                                                    disabled={this.state.validate.email === "has-danger" || this.state.email === ""}
                                                >
                                                    <span>{this.props.data.buttonText}</span>
                                                </SubmitButton>
                                            </Col>
                                        </Row>
                                        {(this.props.data.successText && this.state.status === "success") &&
                                            <Row>
                                                <Col>
                                                    <Text
                                                        bold
                                                        lg
                                                        dangerouslySetInnerHTML={{ __html: this.props.data.successText }}
                                                        className="pt-3"
                                                    />
                                                </Col>
                                            </Row>
                                        }
                                        {this.state.status === "error" &&
                                            <Row>
                                                <Col>
                                                    <Text
                                                        bold
                                                        lg
                                                        className="pt-3"
                                                    >
                                                        An error occured
                                                    </Text>
                                                </Col>
                                            </Row>
                                        }
                                        {this.props.data.termsText &&
                                            <Row>
                                                <Col>
                                                    <Text as="div" sm dangerouslySetInnerHTML={{ __html: this.props.data.termsText }} className="pt-3" />
                                                </Col>
                                            </Row>
                                        }
                                    </Col>
                                </Row>
                            </Form>
                        </ContainerInner>
                    </ContainerStyled>
                </ContainerMaxStyled>
            </ContainerMax>
        )
    }
}

const NewsletterSignupExport = () => {
    const { currentLanguage } = useContext(LanguageContext)
    return (
        <StaticQuery
            query={graphql`
            query {
                allWp {
                    edges {
                        node {
                            ...optionsFragment
                        }
                    }
                }
            }
            `}
            render={data => {
                if (
                    data.allWp.edges[0].node[currentLanguage.code] &&
                    data.allWp.edges[0].node[currentLanguage.code].acfOptions.blockNewsletterSignup
                ) {
                    return (
                        <NewsletterSignup data={data.allWp.edges[0].node[currentLanguage.code].acfOptions.blockNewsletterSignup} />
                    )
                } else {
                    return ""
                }
            }}
        />
    )
}

export default NewsletterSignupExport