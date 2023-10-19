import React from "react"
import WPLink from "components/shared/WPLink"
import GalleryGrid from "components/shared/GalleryGrid"
import BlockTitle from "components/shared/BlockTitle"
import ContainerWithGradient from "components/shared/ContainerWithGradient"

const GalleryMasonry = (props) => {
    const { block } = props

    return(
        <ContainerWithGradient className="my-4">
            {block.title && 
                <BlockTitle white>{block.title}</BlockTitle>
            }
            <GalleryGrid images={block.images} displayMore={false} borderOnHover={true} />
            {block.link &&
                <WPLink url={block.link.url} target={block.link.target} button color="secondary" className="mt-3">
                    {block.link.title}
                </WPLink>
            }
        </ContainerWithGradient>
    )
}

export default GalleryMasonry