import React from "react"
import { Container, Row, Col } from "reactstrap"
import styled from "styled-components"
import CustomImage from "components/shared/CustomImage"

const Logo = styled(CustomImage)`
    transform: scale(.97);
    transition: ${props => props.theme.transitionBase};

    &:hover {
        transform: scale(1);
    }
`

const ImageGrid = (props) => {
    return (
        <Container className="py-4" fluid>
            <Row className="align-items-center">
                {props.data.images.map((image, i) => {
                    return (
                        <Col xs={4} key={i}>
                            {image.url !== null ? (
                                <a href={image.url} target="_blank" rel="noopener noreferrer">
                                    <Logo 
                                        image={image.image} 
                                    />
                                </a>
                            ) : (
                                <Logo 
                                    image={image.image} 
                                />
                            )}
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default ImageGrid