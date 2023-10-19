import React, { Component, useContext } from "react"
import { StaticQuery, graphql } from "gatsby"
import CustomImage from "components/shared/CustomImage"
import { Row, Col } from "reactstrap"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faSync } from "@fortawesome/free-solid-svg-icons"
import ContainerMax from "components/shared/ContainerMax"
import ContentMax from "components/shared/ContentMax"
import { LanguageContext } from "utils/LanguageContext"
import { media } from "utils/Media"
import Button from "components/shared/Button"
import BlockTitle from "components/shared/BlockTitle"
import SocialBg from "images/social-background.svg"

const Background = styled.div`
    background-image: url("${SocialBg}");
`

const ContainerMaxStyled = styled(ContainerMax)`
    padding-top: 2rem;
    padding-bottom: 2rem;

    h3 {
        display: flex;
        align-items: center;
        
        a {
            color: ${props => props.theme.colors.themeTitle};
            padding-left: 1.5rem;
            font-size: 1.5rem;

            @media ${media.md} {
                font-size: 2.3rem;
                padding-left: 2rem;
            }

            svg {
                max-height: 37px;
            }
        }
    }
`

const ImageWrap = styled.div`
    position: relative;
    line-height: 0;
    &:before {
        content: "";
        position: absolute;
        top: .5rem;
        left: .5rem;
        width: 100%;
        height: 100%;
        background-color: black;
    }
    img {
        position: relative;
        z-index: 2;
    }
`

class SocialImages extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeSet: 0
        }

        this.rotateImages = this.rotateImages.bind(this)
    }

    rotateImages(e) {
        e.preventDefault();
        const set = this.state.activeSet + 1
        this.setState({
            activeSet: set === 3 ? 0 : set
        })
    }

    render() {
        const { blockSocialImages } = this.props.data

        return(
            <Background>
                <ContainerMaxStyled>
                    <ContentMax>
                        <Row>
                            {blockSocialImages.title && 
                                <Col xs="auto">
                                    <BlockTitle>
                                        {blockSocialImages.title}
                                        {this.props.data.socialFacebookGlobal &&
                                            <a href={this.props.data.socialFacebookGlobal} target="_blank" rel="noopener noreferrer">
                                                <span className="sr-only">Facebook</span>
                                                <FontAwesomeIcon icon={faFacebookF} />
                                            </a>
                                        }
                                        {this.props.data.socialTwitterGlobal &&
                                            <a href={this.props.data.socialTwitterGlobal} target="_blank" rel="noopener noreferrer">
                                                <span className="sr-only">Twitter</span>
                                                <FontAwesomeIcon icon={faTwitter} />
                                            </a>
                                        }
                                        {this.props.data.socialInstagramGlobal &&
                                            <a href={this.props.data.socialInstagramGlobal} target="_blank" rel="noopener noreferrer">
                                                <span className="sr-only">Instagram</span>
                                                <FontAwesomeIcon icon={faInstagram} />
                                            </a>
                                        }
                                        {this.props.data.socialYoutubeGlobal &&
                                            <a href={this.props.data.socialYoutubeGlobal} target="_blank" rel="noopener noreferrer">
                                                <span className="sr-only">Youtube</span>
                                                <FontAwesomeIcon icon={faYoutube} />
                                            </a>
                                        }
                                    </BlockTitle>
                                </Col>
                            }
                        </Row>

                        {this.state.activeSet === 0 &&
                            <Row>
                                <Col xs={6} md={3} className="pb-3 pb-md-0">
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image1}
                                        />
                                    </ImageWrap> 
                                </Col>
                                <Col xs={6} md={3} className="pb-3 pb-md-0">
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image2}
                                        />
                                    </ImageWrap>
                                </Col>
                                <Col xs={6} md={3}>
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image3}
                                        />
                                    </ImageWrap>
                                </Col>
                                <Col xs={6} md={3}>
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image4}
                                        />
                                    </ImageWrap>
                                </Col>
                            </Row>
                        }
                        {this.state.activeSet === 1 &&
                            <Row>
                                <Col xs={6} md={3} className="pb-3 pb-md-0">
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image5}
                                        />
                                    </ImageWrap>
                                </Col>
                                <Col xs={6} md={3} className="pb-3 pb-md-0">
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image6}
                                        />
                                    </ImageWrap>
                                </Col>
                                <Col xs={6} md={3}>
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image7}
                                        />
                                    </ImageWrap>
                                </Col>
                                <Col xs={6} md={3}>
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image8}
                                        />
                                    </ImageWrap>
                                </Col>
                            </Row>
                        }
                        {this.state.activeSet === 2 &&
                            <Row>
                                <Col xs={6} md={3} className="pb-3 pb-md-0">
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image9}
                                        />
                                    </ImageWrap>
                                </Col>
                                <Col xs={6} md={3} className="pb-3 pb-md-0">
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image10}
                                        />
                                    </ImageWrap>
                                </Col>
                                <Col xs={6} md={3}>
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image11}
                                        />
                                    </ImageWrap>
                                </Col>
                                <Col xs={6} md={3}>
                                    <ImageWrap>
                                        <CustomImage
                                            image={blockSocialImages.image12}
                                        />
                                    </ImageWrap>
                                </Col>
                            </Row>
                        }

                        <div className="pt-4">
                            <Button href="#" onClick={this.rotateImages} color="black">
                                <span>Refresh &nbsp; <FontAwesomeIcon icon={faSync} /></span>
                            </Button>
                        </div>
                    </ContentMax>
                </ContainerMaxStyled>
            </Background>
        )
    }
}

const SocialImagesExport = (props) => {
    const { currentLanguage } = useContext(LanguageContext)
    return(
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
                    data.allWp.edges[0].node[currentLanguage.code].acfOptions.blockSocialImages
                ) {
                    return (
                        <SocialImages data={data.allWp.edges[0].node[currentLanguage.code].acfOptions} {...props} />
                    )
                } else {
                    return ""
                }
            }}
        />
    )
}

export default SocialImagesExport