import React from "react"
import { Container } from "reactstrap"
import GalleryGrid from "components/shared/GalleryGrid"
import BlockTitle from "components/shared/BlockTitle"

const GalleryMasonry = (props) => {
    const { block } = props

    return(
        <Container className="pb-4" fluid>
            {block.title && 
                <BlockTitle template="featured">{block.title}</BlockTitle>
            }
            <GalleryGrid images={block.images} displayMore={false} columns={2}/>
        </Container>
    )
}

export default GalleryMasonry