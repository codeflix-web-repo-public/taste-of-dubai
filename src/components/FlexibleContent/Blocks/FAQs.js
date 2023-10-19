import React, { Component } from "react"
import { TabContent, TabPane, Container, Row, Col, UncontrolledCollapse } from "reactstrap"
import styled from "styled-components"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { LinkSearchReplace } from "utils/LinkSearchReplace"

const SectionButton = styled.button`
    padding: 0;
    margin: 0 0 1rem 0;
    background-color: transparent;
    border: 0;
    display: block;
    font-family: ${props => props.theme.font.family.regular};
    color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    text-align: left;

    &:focus {
        outline: 0;
    }

    &.active {
        color: ${props => props.theme.colors.primary};
        font-family: ${props => props.theme.font.family.black};
    }
`

const FAQButton = styled.button`
    display: block;
    width: 100%;
    background-color: transparent;
    padding: 1rem 1rem 1rem 0;
    border: 0;
    border-top: 1px solid ${props => props.theme.colors.primary};
    text-align: left;
    font-family: ${props => props.theme.font.family.bold};
    color: ${props => props.theme.colors.black};
    
    &:focus {
        outline: 0;
    }

    .icon {
        position: absolute;
        right: 1rem;
        color: ${props => props.theme.colors.black};
        transform: rotate(0);

        svg {
            max-width: 12px;
        }
    }

    &.active {
        color: ${props => props.theme.colors.black};
        .icon {
            transform: rotate(180deg);
        }
    }
`

class FAQs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeSection: 0
        }
    }

    toggleSection(tab) {
        if (this.state.activeSection !== tab) {
            this.setState({
                activeSection: tab
            })
        }
    }

    toggleClass(id) {
        document.getElementById(id).classList.toggle("active")
    }

    render() {
        return (
            <Container className="py-5">
                <Row>
                    <Col md={3}>
                        {this.props.block.section && this.props.block.section.map((sec, i) => {
                            return (
                                <SectionButton 
                                    key={i}
                                    onClick={() => { this.toggleSection(i) }} 
                                    className={classNames({ active: this.state.activeSection === i })}
                                >
                                    {sec.title}
                                </SectionButton>
                            )
                        })}
                    </Col>
                    <Col md={8}>
                        <TabContent activeTab={this.state.activeSection}>
                            {this.props.block.section && this.props.block.section.map((sec, secId) => {
                                return (
                                    <TabPane tabId={secId} key={secId}>
                                        {sec.faqs.map((faq, faqId) => {
                                            return(
                                                <Row key={faqId}>
                                                    <Col sm="12">
                                                        <FAQButton id={`faq${secId}${faqId}`} onClick={() => this.toggleClass(`faq${secId}${faqId}`)} onTouchStart={() => this.toggleClass(`faq${secId}${faqId}`)}>
                                                            {faq.question}
                                                            <FontAwesomeIcon icon={faAngleDown} className="icon" />
                                                        </FAQButton>
                                                        <UncontrolledCollapse toggler={`#faq${secId}${faqId}`}>
                                                            <div dangerouslySetInnerHTML={{ __html: LinkSearchReplace(faq.answer) }} className="pb-3"/>
                                                        </UncontrolledCollapse>
                                                    </Col>
                                                </Row>
                                            )
                                        })}
                                    </TabPane>
                                )
                            })}
                        </TabContent>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FAQs