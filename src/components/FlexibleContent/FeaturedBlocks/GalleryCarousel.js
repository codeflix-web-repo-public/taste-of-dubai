import React from "react"
import { Container } from "reactstrap"
import BlockTitle from "components/shared/BlockTitle"
import GallerySlider from "components/shared/GallerySlider"

const GalleryCarousel = (props) => {
    const { block } = props

    return(
        <Container className="py-4" fluid>
            {block.title && 
                <BlockTitle template="featured">{block.title}</BlockTitle>
            }
            <GallerySlider images={block.images} displayMore={false} />
        </Container>
    )
}

export default GalleryCarousel