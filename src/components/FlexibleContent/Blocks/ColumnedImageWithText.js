import React from "react"
import Slider from "react-slick"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { media } from "utils/Media"
import ContainerMax from "components/shared/ContainerMax"
import ContentMax from "components/shared/ContentMax"
import CarouselStyled from "components/shared/CarouselStyled"
import WPLink from "components/shared/WPLink"
import CarouselItem from "./Carousel/CarouselItem"
import BlockTitle from "components/shared/BlockTitle"

const ContainerMaxStyled = styled(ContainerMax)`
    padding-right: 0;
	overflow: hidden;

    @media ${media.md} {
        padding-right: ${props => props.theme.bootstrapGutterWidth};
    }

	@media (min-width: 1300px) {
		overflow: visible;
	}

    .slick-slider {
        .slick-dots {
            bottom: -.5rem;
        }
    } 
`

const ColumnedImageWithText = (props) => {
    const { block } = props
    const { blocks } = block

    const getItems = blocks && blocks.map((b, i) => {
        return(
            <CarouselItem 
                image={b.image && b.image}
                title={b.title && b.title}
                url={b.link && b.link.url}
                link={b.link && b.link}
                excerpt={b.text && b.text}
                type="ColumnedImageWithText"
                borderOnHover="no" 
                key={i} 
            />
        )
    })

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: blocks.length > 2 ? 3 : 2,
        slidesToScroll: 1,
        lazyload: true,
        prevArrow: <PrevButton/>,
        nextArrow: <NextButton/>,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
					centerPadding: '60px'
                }
            }
        ]
    }

    return(
        <ContainerMaxStyled background={block.background} className={`${props.template === "featured" ? "mb-4" : "my-4 my-xl-5"}`}>
            <ContentMax>
                <CarouselStyled itemCount={blocks.length} template={props.template}>
                    {block.title && 
                        <BlockTitle template={props.template}>{block.title}</BlockTitle>
                    }

                    <Slider {...settings}>
                        {getItems}
                    </Slider>
            
                    {/*do we have a view all link?*/}
                    {block.link &&
                    <div className="pt-5 pt-md-4">
                        <WPLink url={block.link.url} target={block.link.target} button color="black">
                            {block.link.title}
                        </WPLink>
                    </div>
                    }
                </CarouselStyled>
            </ContentMax>
        </ContainerMaxStyled>
    )
}

ColumnedImageWithText.defaultProps = {
    template: "default"
}

export default ColumnedImageWithText