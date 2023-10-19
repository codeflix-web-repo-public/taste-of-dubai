import React from "react"
import { Container, Row, Col } from "reactstrap"
import styled from "styled-components"
import { media } from "utils/Media"
import classNames from "classnames"
import CustomImage from "components/shared/CustomImage"
import ContainerMax from "components/shared/ContainerMax"
import Button from "components/shared/Button"
import WPLink from "components/shared/WPLink"

const ImageTextWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${media.md} {
        min-height: calc(( (688 / 466) * (100vw / 2) ) - 10px); //(original height / original width) x new width = new height
    }

    @media ${media.lg} {
        min-height: calc(( (795 / 960) * (100vw / 2) ) - 10px); //(original height / original width) x new width = new height
    }

    @media ${media.xxl} {
        min-height: 650px;
    }
    
    @media ${media.xxxl} {
        min-height: 794px;
    }
`

const Content = styled.div`
    /* padding: ${props => props.theme.bootstrapGutterWidth}; */

    @media ${media.md} {
        padding: 1rem 0 0 calc(${props => props.theme.bootstrapGutterWidth} * 4);
    }

    &.image-right {
        @media ${media.md} {
            padding: 1rem calc(${props => props.theme.bootstrapGutterWidth} * 4) 0 0;
        }
    }

    h1, h2, h3 {
        font-size: 1.9rem;
        color: ${props => props.theme.colors.themeTitle} !important;
        @media ${media.md} {
            font-size: ${props => props.theme.font.h1.size};
        }
        span {
            color: ${props => props.theme.colors.themeTitle} !important;
        }
    }
`

const ImageCol = styled(Col)`
    padding: 0;

    @media ${media.md} {
        position: absolute;
        left: 0;
        padding-left: 0;
        top: 0;
        max-height: 100%;
        overflow: hidden;
        /* padding-right: ${props => props.theme.bootstrapGutterWidth}; */
    }

    &.image-right {
        @media ${media.md} {
            left: auto;
            right: 0;
            padding-right: 0;
            /* padding-left: ${props => props.theme.bootstrapGutterWidth}; */
        }
    }
`

const ColStyled = styled(Col)`
    padding: 0;

    @media ${media.md} {
        padding: 0 15px;
    }
`

const ImageText = (props) => {

    let id = ""
    if (props.block.anchorId !== null) {
        id = props.block.anchorId.toLowerCase()
        id = props.block.anchorId.replace(' ', '')
    }

    return (
        <ContainerMax 
            id={id}
            maxWidth="1920"
            className={classNames({
                "py-4": props.block.padding === "yes",
                "px-md-0": true
            })}
        >
            <ImageTextWrap>
                <Container>
                    <Row className="align-items-center py-3">
                        <ImageCol md={6} className={classNames({ "image-right": props.block.imagePosition === "right"  })}>
                            <CustomImage image={props.block.imageTablet} className="d-none d-md-block d-lg-none w-100" />
                            <CustomImage image={props.block.image} className="d-md-none d-lg-block w-100" />
                        </ImageCol>
                        <ColStyled md={{ size: 6, offset: props.block.imagePosition === "right" ? 0 : 6 }}>
                            <Content className={classNames({ "image-right": props.block.imagePosition === "right" })}>
                                <div dangerouslySetInnerHTML={{ __html: props.block.text }} className="py-4 pb-md-4 pt-md-0" />
                                {
                                    props.block.links && props.block.links.map((link, i) => {
                                        if (
                                            link.__typename === "WpPage_Acfflexiblecontent_Blocks_ImageWithText_Links_Link"
                                        ) {
                                            return (
                                                <WPLink url={link.link.url} target={link.link.target} rel="noopener noreferrer" button color="black" key={i} className="mr-2 mb-2">
                                                    {link.link.title}
                                                </WPLink>
                                            )
                                        } else if (
                                            link.__typename === "WpPage_Acfflexiblecontent_Blocks_ImageWithText_Links_File"
                                        ) {
                                            return (
                                                <Button href={link.file.mediaItemUrl} target="_blank" rel="noopener noreferrer" color="black" key={i} className="mr-2 mb-2">
                                                    {link.linkText}
                                                </Button>
                                            )
                                        }
                                        return null;
                                    })
                                }
                            </Content>
                        </ColStyled>
                    </Row>
                </Container>
            </ImageTextWrap>
        </ContainerMax>
    );
}

export default ImageText