import React from "react"
import Slider from "react-slick"
import styled from "styled-components"
import CustomImage from "components/shared/CustomImage"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons"

const SliderStyled = styled(Slider)`
    padding: 0;
    padding-bottom: 1rem;

    .slider-arrow {
        left: -.5rem;
        bottom: auto;
        top: 50%;
        transform: translateY(-50%);

        &.next {
            left: auto;
            right: -.5rem;
        }
    }

    .slick-dots {
        bottom: 0;
    }

    .gatsby-image-wrapper {
        /* transform: scale(0.9); */
        transition: all .4s ease;
    }

    .slick-center {
        .gatsby-image-wrapper {
            transform: scale(1);
        }
    }
`

const Slide = styled.div`
    border: 0;
    padding: 0;
    background-color: transparent;
`

const PopupGalleryCarousel = (props) => {
    const { images } = props

    function PrevButton({ onClick }) {
        return(
            <button onClick={onClick} className="slider-arrow prev" aria-label="Previous">
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
        ) 
    }

    function NextButton({ onClick }) {
        return (
            <button onClick={onClick} className="slider-arrow next" aria-label="Next">
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
        )
    }

    //slider settings
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        lazyload: true,
        prevArrow: <PrevButton/>,
        nextArrow: <NextButton/>,
    }

    const sliderImages = images.map((image, i) => {
        if (image.image) {
            return(
                <Slide key={i}>
                    <CustomImage image={image.image} />
                </Slide>
            )
        } else return null
    })

    return(
        <SliderStyled {...settings}>
            <Slide key="portait">
                <CustomImage image={props.image} />
            </Slide>
            {sliderImages}
        </SliderStyled>
    )
}

export default PopupGalleryCarousel