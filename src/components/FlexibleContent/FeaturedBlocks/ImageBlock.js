import React from "react"
import styled from "styled-components"
import { Container } from "reactstrap"
import CustomImage from "components/shared/CustomImage"

const ImageFigure = styled.figure`
    width: 100%;
    margin: 0;
`

const ImageBlock = (props) => {
    return (
        <Container className="pb-3" fluid>
            <ImageFigure>
                {props.data.image &&
                    <CustomImage 
                        image={props.data.image} 
                    />    
                }
                {props.data.image && props.data.image.caption &&
                    <figcaption dangerouslySetInnerHTML={{ __html: props.data.image.caption }} />
                }
            </ImageFigure>
        </Container>
    )
}

export default ImageBlock



