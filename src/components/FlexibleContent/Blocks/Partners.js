import React from "react"
import { Container, Row, Col } from "reactstrap"
import CustomImage from "components/shared/CustomImage"
import styled from "styled-components"

const Seperator = styled.div`
    height: 1px;
    width: 100%;
    background-color: ${props => props.theme.colors.whiteOff};
    margin: 2rem 0 1rem 0;
`

const Logo = styled(CustomImage)`
    transform: scale(.97);
    transition: ${props => props.theme.transitionBase};

    &:hover {
        transform: scale(1);
    }
`

const Partners = (props) => {
    const sectionsLength = props.block.sections.length - 1
    return (
        <Container className="py-4">
            {props.block.sections.map((section, i) => {
                return (
                    <Row className="justify-content-center align-items-center" key={i}>
                        <Col xs={12} className="text-center">
                            <h3 className="pb-3">{section.title}</h3>
                        </Col>
                        {section.logos.map((logo, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <Col xs={4} md={3}>
                                        {logo.url !== null ? (
                                            <a href={logo.url} target="_blank" rel="noopener noreferrer">
                                                <Logo 
                                                    image={logo.image} 
                                                />
                                            </a>
                                        ) : (
                                            <Logo 
                                                image={logo.image} 
                                            />
                                        )}
                                    </Col>
                                    {logo.lineBreak === "yes" &&
                                        <div className="w-100 pt-4"></div>
                                    }
                                </React.Fragment>
                            )
                        })}
                        {sectionsLength !== i &&
                            <Col xs={12}>
                                <Seperator />
                            </Col>
                        }
                    </Row>
                )
            })}
        </Container>
    )
}

export default Partners