import React, { Component } from "react"
import styled, { css } from "styled-components"
import { navigate } from "gatsby"
import {  Modal, ModalBody, Row, Col } from "reactstrap"
import CustomImage from "components/shared/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faGlobe, faTimes } from "@fortawesome/free-solid-svg-icons"
import { media } from "utils/Media"
import Text from "components/shared/Text"
import WPLink from "components/shared/WPLink"
import CarouselItemBg from "components/shared/CarouselItemBg"
import { LinkSearchReplace } from "utils/LinkSearchReplace"
import MenuTable from "components/shared/MenuTable"

const ListingItemStyled = styled.div`
    position: relative;
    line-height: 0;
    cursor: pointer;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.15));
    padding: 1rem;
    background-color: white;
    margin-bottom: .5rem;

    ${props => !props.hoverState && css`
        cursor: default;
    `}

    .content {
        background-color: white;
        padding-top: 1rem;
        z-index: 11;
        line-height: 1.1;

        h3 {
            font-size: ${props => props.theme.font.size.sm};
            text-transform: uppercase;
            margin-bottom: 0;

            @media ${media.md} {
                font-size: ${props => props.theme.font.size.lg};
            }
        }

        .menu-link  {
            font-size: ${props => props.theme.font.size.sm};
            font-family: ${props => props.theme.font.family.bold};
            text-transform: uppercase;
            text-decoration: none;
            color: ${props => props.theme.colors.purple};
            display: block;
        }
    }

    .content-items {
        font-size: ${props => props.theme.font.size.sm};
        padding-top: 1rem;
        line-height: 1.4;

        h5 {
            text-transform: uppercase;
            font-size: ${props => props.theme.font.size.sm};
            margin-bottom: 0.25rem;
        }
    }

    &:hover {
        .hoverBg {
            opacity: 1;
        }
    }
`

const ImageWrap = styled.div`
    position: relative;
`

const ColStyled = styled(Col)`
    a {
        font-size: 1.5rem;
        padding-right: 1.5rem;
    }
`

const Close = styled.button`
	background: transparent;
	border: 0;
	position: fixed;
	z-index: 1;
	right: 2rem;
	top: 1rem;
	display: block;
	color: ${props => props.theme.colors.black};
    font-size: 1.5rem;

    @media ${media.sm} {
        right: .5rem;
	    top: .5rem;
        position: absolute;
    }

    @media ${media.md} {
        right: -.5rem;
	    top: -.75rem;
    }
    /* @media ${media.lg} {
        right: -1rem;
	    top: -1.5rem;
    } */
`

const MenuModal = styled(Modal)`
    @media ${media.md} {
        display: flex; 
        align-items: center;
        min-height: calc(100% - 3.5rem);
    }
    
    .modal-content {
        padding: 1rem;
        font-size: ${props => props.theme.font.size.base};

        h4 {
            font-family: ${props => props.theme.font.family.black};
            font-weight: ${props => props.theme.font.weight.black};
            font-size: ${props => props.theme.font.size.xl};
        }
    }
`

class MenuListingItem extends Component {
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

    onClick(type) {
        if (type === "page") {
            // go to page
            navigate(this.props.data.uri)
        } else if (type === "popup") {
            // launch modal
            this.toggleModal()
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
        const { image, items } = data.acfMenu 
        let hoverState = type === "none" ? false : true
        return(
            <>
                <ListingItemStyled 
                    onClick={(e) => this.onClick(type)}
                    hoverState={hoverState}
                >
                    <ImageWrap>
                        <CustomImage
                            image={image}
                        />
                        {hoverState &&
                            <CarouselItemBg 
                                className="hoverBg" 
                                borderOnHover={false}
                                type="menu"
                            >
                                <div>View Menu</div>
                            </CarouselItemBg>
                        }
                    </ImageWrap>
                    <div className="content">
                        <h3>{data.title}</h3>
                        {items && items.map((item, i) => {
                            return(
                                <div className="content-items" key={i}>
                                    {item.title && 
                                        <Row>
                                            <Col>
                                                <h5>
                                                    {item.title}
                                                </h5>
                                            </Col>
                                        </Row>
                                    }
                                    <Row>
                                        <Col>
                                            <div dangerouslySetInnerHTML={{ __html: item.name }} className="font-weight-bold" />
                                        </Col>
                                        <Col xs="auto">
                                            <div dangerouslySetInnerHTML={{ __html: item.price }} />
                                        </Col>
                                    </Row>
                                </div>
   
                            )
                        })}
                        {data.acfTastePageSettings.type === "popup" &&
                            <a href="#" onClick={this.toggleModal} className="menu-link pt-3">
                                <span>View Menu</span>
                            </a> 
                        }
                        {data.acfTastePageSettings.type === "page" &&
                            <WPLink url={data.uri} className="menu-link pt-3">
                                <span>View Menu</span>
                            </WPLink>
                        }
                    </div>
                </ListingItemStyled>

                {data.acfTastePageSettings.type === "popup" && this.state.modal &&
                    <MenuModal isOpen={this.state.modal} toggle={this.toggleModal} size="lg">
                        <ModalBody>
                            <Close onClick={this.toggleModal}>
                                <FontAwesomeIcon icon={faTimes} />
                                <span className="sr-only">Close</span>
                            </Close>
                            <Row>
                                <Col md={4} className="d-none d-lg-block">
                                    <CustomImage
                                        image={data.acfTastePageSettings.featuredImage45}
                                    /> 
                                </Col>
                                <Col xs={12} lg={8}>
                                    {data.acfTastePageSettings.popupTitle &&
                                        <Text as="h4" primary uppercase>{data.acfTastePageSettings.popupTitle}</Text>
                                    }
                                    {data.acfTastePageSettings.popupText &&
                                        <Text base dangerouslySetInnerHTML={{ __html: data.acfTastePageSettings.popupText }} />
                                    }
                                    <MenuTable items={items} />
                                    {/* {items && items.map((item, i) => {
                                        return(
                                            
                                            <React.Fragment key={i}>
                                                <Row className="pb-3">
                                                    <Col xs={9} md={10}>
                                                        <div 
                                                            className="font-weight-bold" 
                                                            dangerouslySetInnerHTML={{ __html: LinkSearchReplace(item.name) }} 
                                                        />
                                                        {item.description &&
                                                            <div dangerouslySetInnerHTML={{ __html: LinkSearchReplace(item.description) }} />
                                                        }
                                                    </Col>
                                                    <Col xs={3} md={2}>
                                                        <div dangerouslySetInnerHTML={{ __html: item.price }} />
                                                    </Col>
                                                </Row>
                                            </React.Fragment>
                                        )
                                    })} */}
                                    <Row className="align-items-center">
                                        {data.acfTastePageSettings.popupCtaLink &&
                                            <Col md="auto" className="pb-3 pb-lg-0">
                                                <WPLink 
                                                    url={data.acfTastePageSettings.popupCtaLink.url} 
                                                    button 
                                                    color="black" 
                                                    target={data.acfTastePageSettings.popupCtaLink.target}
                                                >
                                                    {data.acfTastePageSettings.popupCtaLink.title}
                                                </WPLink>
                                            </Col>
                                        }
                                        <ColStyled md="auto">
                                            {data.acfTastePageSettings.popupFacebook && 
                                                <a href={data.acfTastePageSettings.popupFacebook} target="_blank" rel="noopener noreferrer">
                                                    <span className="sr-only">Facebook</span>
                                                    <FontAwesomeIcon icon={faFacebookF} />
                                                </a>
                                            }
                                            {data.acfTastePageSettings.popupTwitter && 
                                                <a href={data.acfTastePageSettings.popupTwitter} target="_blank" rel="noopener noreferrer">
                                                    <span className="sr-only">Twitter</span>
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </a>
                                            }
                                            {data.acfTastePageSettings.popupInstagram && 
                                                <a href={data.acfTastePageSettings.popupInstagram} target="_blank" rel="noopener noreferrer">
                                                    <span className="sr-only">Instagram</span>
                                                    <FontAwesomeIcon icon={faInstagram} />
                                                </a>
                                            }
                                            {data.acfTastePageSettings.popupWebsiteLink && 
                                                <WPLink url={data.acfTastePageSettings.popupWebsiteLink} target="_blank" rel="noopener noreferrer">
                                                    <span className="sr-only">Website</span>
                                                    <FontAwesomeIcon icon={faGlobe} />
                                                </WPLink>
                                            }
                                        </ColStyled>
                                    </Row>
                                </Col>
                            </Row>
                        </ModalBody>
                    </MenuModal>
                }
            </>
        )
    }
}

export default MenuListingItem