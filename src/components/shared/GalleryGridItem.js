import React from "react"
import styled from "styled-components"
import CarouselItemBg from "components/shared/CarouselItemBg"

const GridHubItemWrap = styled.div`
    cursor: pointer;
    position: relative;
    background-color: white;
    line-height: 0;

    button {
        padding: 0;
        border: 0;
        width: 100%;
    }

    .overlay {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }

    .image {
        display: block;
        position: relative;
        z-index: 1;
        img {
            width: 100%;
        }
    }
    
    &:hover {
        .overlay {
            opacity: 1;
        }
        .hoverBg {
            opacity: 1;
        }
    }
`

const GalleryGridItem = (props) => {
    // let size = props.size
    const image = props.thumbnail?.mediaDetails?.sizes[0]
    return (
        <GridHubItemWrap>
            <div
                srl_overlay="true"
                className="overlay"
            >
                <CarouselItemBg
                    className="hoverBg"
                    borderOnHover={props.borderOnHover}
                    type={"gallery"}
                >
                    <div>View</div>
                </CarouselItemBg>
            </div>
            <div className="image">
                <img
                    src={image.sourceUrl}
                    // srcSet={image.srcSet}
                    // sizes={image.sizes}
                    alt={props.altText}
                />
            </div>
        </GridHubItemWrap>
    )
}

export default GalleryGridItem