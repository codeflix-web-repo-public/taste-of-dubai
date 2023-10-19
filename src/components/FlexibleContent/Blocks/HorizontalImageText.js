import React from "react"
import styled, { css } from "styled-components"
import CustomImage from "components/shared/CustomImage"
import { Row, Col } from "reactstrap"
import { media } from "utils/Media"
import BlockTitle from "components/shared/BlockTitle"
import ContainerWithGradient from "components/shared/ContainerWithGradient"
import ContentMax from "components/shared/ContentMax"
import WPLink from "components/shared/WPLink"
import Text from "components/shared/Text"

const ContentMaxStyled = styled(ContentMax)`
    position: relative;
    z-index: 2;
    color: white;

    @media ${media.md} {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    @media (min-width: 1600px) {
        padding-left: 0;
        padding-right: 0;
    }

    ${props => props.button && css`
        position: absolute;
        bottom: -4rem;
    `}
`

const HorizontalImageText = (props) => {
    return(
        <ContainerWithGradient className={`my-4 ${props.block.link ? "mb-5" : ""}`}>
            {/* <ContentMaxStyled> */}
                <Row className="align-items-md-center">
                    {props.block.image &&
                        <Col sm={4} className="text-center pb-3 pb-md-0">
                            <CustomImage
                                image={props.block.image}
                            />   
                        </Col>
                    }
                    <Col sm={8}>
                        {props.block.title && 
                            <BlockTitle white outline>{props.block.title}</BlockTitle>
                        }
                        {props.block.text && 
                            <Text as="div" white dangerouslySetInnerHTML={{ __html: props.block.text }} />
                        }
                    </Col>
                </Row>
            {/* </ContentMaxStyled> */}
            {props.block.link && 
                <ContentMaxStyled button>
                    <WPLink url={props.block.link.url} target={props.block.link.target} button color="black">
                        {props.block.link.title}
                    </WPLink>
                </ContentMaxStyled>
            }
        </ContainerWithGradient>
    )
}

export default HorizontalImageText