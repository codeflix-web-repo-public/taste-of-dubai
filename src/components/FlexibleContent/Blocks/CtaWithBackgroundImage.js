import React from "react"
import styled from "styled-components"
import { Row, Col } from "reactstrap"
import { media } from "utils/Media"
import ContainerMax from "components/shared/ContainerMax"
import ContentMax from "components/shared/ContentMax"
import WPLink from "components/shared/WPLink"
import CustomImage from "components/shared/CustomImage"

const ContainerMaxWrap = styled(ContainerMax)`
    position: relative;
    overflow: hidden;
`

const ContainerMaxStyled = styled(ContainerMax)`
    position: relative;
    z-index: 1;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(358.57deg, #000000 9.6%, rgba(0, 0, 0, 0) 90%);
        opacity: 0.6;
        z-index: 1;
    }
`

const ContentMaxStyled = styled(ContentMax)`
    color: white;
    min-height: 570px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-right: ${props => props.theme.bootstrapGutterWidth};
    padding-left: ${props => props.theme.bootstrapGutterWidth};
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: relative;
    z-index: 2;

    @media ${media.md} {
        align-items: center;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-right: 2rem;
        padding-left: 2rem;
    }

    @media ${media.xxl} {
        min-height: 760px;
    }

    h3 {
        color: white;
        text-transform: uppercase;
    }
`

const CtaWithBackgroundImage = (props) => {
    return(
        <ContainerMaxWrap maxWidth="1920" noPadding>
            <CustomImage image={props.block.imageMobile} className="d-md-none position-absolute w-100 h-100 object-fit-cover" />
            <CustomImage image={props.block.imageDesktop} className="d-none d-md-block position-absolute w-100 h-100 object-fit-cover" />
            <ContainerMaxStyled maxWidth="1920" noPadding>
                <ContentMaxStyled>
                    <Row className="w-100">
                        <Col md={8}>
                            {props.block.title &&
                                <h3>
                                    {props.block.title}
                                </h3>
                            }
                            {props.block.text && 
                                <div dangerouslySetInnerHTML={{ __html: props.block.text }} />
                            }
                            {props.block.link &&
                                <div className="pt-3">
                                    <WPLink url={props.block.link.url} target={props.block.link.target} button>
                                        {props.block.link.title}
                                    </WPLink>
                                </div>
                            }
                        </Col>
                    </Row>
                </ContentMaxStyled>
            </ContainerMaxStyled>
        </ContainerMaxWrap>
    )
}

export default CtaWithBackgroundImage