import React, { Component } from "react"
import styled, { css } from "styled-components"
import { Link, navigate } from "gatsby"
import CustomImage from "components/shared/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { media } from "utils/Media"
import Text from "components/shared/Text"
import Button from "components/shared/Button"
import WPLink from "components/shared/WPLink"
import CarouselItemBg from "components/shared/CarouselItemBg"
import UrgencyLabel from "components/shared/UrgencyLabel"
import Popup from "components/shared/Popup"

const ListingItemStyled = styled.div`
    position: relative;
    line-height: 0;
    cursor: pointer;

    ${props => !props.hoverState && css`
        cursor: default;
    `}

    .content {
        background-color: white;
        padding: 1rem;
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        width: calc(100% - 2rem);
        z-index: 11;
        line-height: 1.1;

        h3 {
            font-size: ${props => props.theme.font.size.sm};
            font-family: ${props => props.theme.font.family.bold};
            font-weight: ${props => props.theme.font.weight.bold};
            text-transform: uppercase;
            margin-bottom: 0;

            @media ${media.md} {
                font-size: ${props => props.theme.font.size.base};
            }
        }

        .qf-title {
            text-transform: uppercase;
            font-size: ${props => props.theme.font.size.sm};
            font-family: ${props => props.theme.font.family.bold};
            //* May need to change due to theme
            color: ${props => props.theme.colors.tertiary};
            display: flex;
            justify-content: space-between;
            align-items: center;

            svg {
                position: relative;
                transform: rotate(0);

                &.active {
                    transform: rotate(-180deg);
                }
            }
        }

        .qf-hidden {
            display: none;

            @media ${media.md} {
                display: block;
            }
        }

        .qf-mobile-link  {
            font-size: ${props => props.theme.font.size.sm};
            font-family: ${props => props.theme.font.family.bold};
            text-transform: uppercase;
            text-decoration: none;
            color: ${props => props.theme.colors.purple};
            display: block;
            
            @media ${media.md} {
                display: none;
            }
        }
    }

    &:hover {
        .hoverBg {
            opacity: 1;
        }
        .urgency-label {
            @media ${media.md} {
                display: none;
            }
        }
    }
`

class ListingItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: false,
            modal: false
        }

        this.checkModalUrl = this.checkModalUrl.bind(this)
        this.onClick = this.onClick.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }

    componentDidMount() {
        this.checkModalUrl()
    }

    checkModalUrl() {
        const hash = typeof window !== "undefined" && window.location.hash.replace("#", "")
        // if we have hash in url and matched slug launch modal
        if(hash && hash === this.props.data.slug) {
            this.setState({
                modal: true
            })
        }
    }

    onClick(type, quickfacts) {
        if (quickfacts && window.innerWidth > 767) {
            this.setState({
                active: !this.state.active
            })
        } else {
            if (type === "page") {
                // go to page
                navigate(this.props.data.uri)
            } else if (type === "popup") {
                // launch modal
                this.toggleModal()
            }
        }
    }

    toggleModal(e) {
        e && e.stopPropagation()
        e && e.preventDefault()
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        const { data } = this.props
        const { type } = data.acfTastePageSettings 
        const { quickFactsTitle, quickFactsText } = data.acfQuickFacts 
        let hoverState = type === "none" && !quickFactsText ? false : true
        return(
            <>
                <ListingItemStyled 
                    onClick={(e) => this.onClick(type, quickFactsText)}
                    hoverState={hoverState}
                >
                    {data.acfTastePageSettings.featuredImage45 &&
                        <CustomImage
                            image={data.acfTastePageSettings?.featuredImage45}
                        /> 
                    }
                    {data.acfUrgencyLabel && data.acfUrgencyLabel.label &&
                        <UrgencyLabel title={data.acfUrgencyLabel.label.acfUrgencyLabels.text} hidden={this.state.active} /> 
                    }
                    {hoverState &&
                        <CarouselItemBg 
                            className="hoverBg" 
                            borderOnHover={false}
                        >
                            {data.acfTastePageSettings.type === "page" && !quickFactsText &&
                                <div>Read More</div>
                            }
                        </CarouselItemBg>
                    }
                    <div className="content">
                        <h3>{data.title}</h3>
                        {data.acfQuickFacts && quickFactsTitle && quickFactsText &&
                            <>
                                <div className="qf-hidden">
                                    <p className="qf-title mt-3">
                                        {quickFactsTitle}
                                        <FontAwesomeIcon icon={faAngleDown} className={`${this.state.active ? "active" : ""}`} />
                                    </p>

                                    {this.state.active && 
                                        <>
                                            <Text 
                                                as="div" 
                                                sm 
                                                dangerouslySetInnerHTML={{ __html: quickFactsText }} 
                                            />

                                            {data.acfTastePageSettings.type === "popup" &&
                                                <Button as="button" color="black" className="mt-3" onClick={this.toggleModal}>
                                                    <span>Read more</span>
                                                </Button>
                                            }

                                            {data.acfTastePageSettings.type === "page" &&
                                                <Button as={Link} to={data.uri} color="black" className="mt-3">
                                                    <span>Read more</span>
                                                </Button>
                                            }
                                        </>
                                    }
                                </div>
                                {data.acfTastePageSettings.type === "page" &&
                                    <WPLink url={data.uri} className="qf-mobile-link mt-2">
                                        <span>Read more</span>
                                    </WPLink>
                                }
                            </>
                        }
                    </div>
                </ListingItemStyled>
                {data.acfTastePageSettings.type === "popup" && this.state.modal &&
                    <Popup isOpen={this.state.modal} toggle={this.toggleModal} data={data} />
                }
            </>
        )
    }
}

export default ListingItem