import React, { Component } from "react"
import styled from "styled-components"
import { Container } from "reactstrap"
import ReactPlayer from "react-player"
import scrollToElement from "scroll-to-element"
import { media } from "utils/Media"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"
import CustomImage from "components/shared/CustomImage"
import { LinkSearchReplace } from "utils/LinkSearchReplace"

const FaqBlockStyled = styled(Container)`
    margin-bottom: 1rem;
    width: 100%;

    .question {
        padding: 1rem 0;
        border: 0;
        border-top: 1px solid ${props => props.theme.colors.primary};
        position: relative;
        cursor: pointer;
        background: transparent;
        width: 100%;
        text-align: left;

        &.paddingLeft {
            padding-left: 47px;
        }

        &.active {
            color: ${props => props.theme.colors.black};

            p {
                color: ${props => props.theme.colors.black};
            }
        }

        svg.icon {
            font-size: 25px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 5px;
        }

        svg.faq-arrow {
            font-size: 25px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            max-height: 25px; 
            max-width: 25px; 
        }
    }

    .answer {
        padding-bottom: 1rem;

        p:last-child {
            margin: 0;
        }

        iframe {
            height: 288px;
            width: 100%;

            @media ${media.md} {
                height: 300px;
            }

            @media ${media.lg} {
                height: 330px;
            }
        }

        &.embed-responsive {
            iframe {
                height: 100%;
            }
        }
    }
`

const Question = styled.span`
    display: block;
    /* padding: .5rem 0; */
    margin: .5rem 0;
    p {
        margin: 0 !important;
    }
`

class FaqBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openIndex: null
        };
    }

    setOpenIndex = (e, index) => {
        e.preventDefault()
        if (this.state.openIndex === index) {
            index = null;
        }
        this.setState({ openIndex: index });

        if (index !== null) {
            const el = e.target

            setTimeout(() => {
                scrollToElement(el, {
                    offset: -120,
                    duration: 500
                });
            }, 500);
        }
    }

    render() {
        return (
            <FaqBlockStyled fluid>
                {this.props.data.faq && this.props.data.faq.map((faq, i) => {
                    return (
                        <div className="faq-row" key={i}>
                            <button 
                                className={classNames({
                                    question: true,
                                    active: i === this.state.openIndex
                                })} 
                                onClick={(e) => this.setOpenIndex(e, i)}
                            >
                                <Question dangerouslySetInnerHTML={{ __html: faq.question }} />
                                {this.state.openIndex === i ? (
                                    <FontAwesomeIcon className="faq-arrow" icon={faAngleUp} />
                                ) : (
                                    <FontAwesomeIcon className="faq-arrow" icon={faAngleDown} />
                                )}
                            </button>
                            {this.state.openIndex === i &&
                                faq.answerContent && faq.answerContent.map((block, i) => {
                                    switch (block.__typename) {
                                        case "WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock_faq_AnswerContent_TextAnswer":
                                        case "WpPost_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock_faq_AnswerContent_TextAnswer":
                                            return(
                                                <div 
                                                    className="answer mb-4" 
                                                    key={i} 
                                                    dangerouslySetInnerHTML={{ __html: LinkSearchReplace(block.text) }} 
                                                />
                                            )

                                        case "WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock_faq_AnswerContent_ImageAnswer":
                                        case "WpPost_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock_faq_AnswerContent_ImageAnswer":
                                            return(
                                                <CustomImage 
                                                    className="answer mb-4" 
                                                    image={block.image} 
                                                    key={i} 
                                                />
                                            )

                                        case "WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock_faq_AnswerContent_VideoAnswer":
                                        case "WpPost_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock_faq_AnswerContent_VideoAnswer":
                                            return(
                                                <ReactPlayer 
                                                    url={block.video} 
                                                    className="answer embed-responsive embed-responsive-16by9 mb-4" 
                                                    key={i}  
                                                />
                                            )

                                        default:
                                            return ""
                                    }
                                })
                            }
                        </div>
                    )
                })}
            </FaqBlockStyled>
        )
    }
}

export default FaqBlock