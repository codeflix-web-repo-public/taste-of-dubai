import React from "react"
import ContainerMax from "components/shared/ContainerMax"
import Carousel from "./Carousel"

const HeroCarousel = (props) => {
    return (
        <ContainerMax maxWidth="1920" noPadding>
            <Carousel slides={props.block.slides} />
        </ContainerMax>
    )
}

export default HeroCarousel