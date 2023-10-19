import React from "react"
import Slider from "react-slick"
import styled from "styled-components"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons"
import CustomImage from "components/shared/CustomImage"
import BlockTitle from "components/shared/BlockTitle"
import ContainerWithGradient from "components/shared/ContainerWithGradient"
import CarouselStyled from "components/shared/CarouselStyled"
import WPLink from "components/shared/WPLink"

const Wrap = styled(WPLink)`
    background-color: white;
    padding: 1rem;
    text-decoration: none;
    cursor: pointer;

    h4 {
        text-transform: uppercase;
        font-size: ${props => props.theme.font.h5.size};
        margin: 0;
        padding: .5rem 0 .25rem 0;
    }

    &:hover {
        text-decoration: none;
        h4 {
            color: ${props => props.theme.colors.primary};
        }
    }
`

const TheresMore = (props) => {
    const { block } = props
    const data = block.block.acfTheresMore

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
		slidesToShow: 4,
		slidesToScroll: 1,
		lazyload: true,
		prevArrow: <PrevButton />,
		nextArrow: <NextButton />,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
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


    const items = data.items.map((item, i) => {
        return(
            <div className="d-flex" key={i}>
                <Wrap url={item.link.url}>
                    <CustomImage 
                        image={item.image}
                    />
                    {item.title &&
                        <h4>{item.title}</h4>
                    }
                </Wrap>
            </div>
        )
    })

    return(
        <ContainerWithGradient className="my-4">
            {data.title && 
                <BlockTitle white outline>
                    {data.title}
                </BlockTitle>
            }
            <CarouselStyled itemCount={data.items.length} type="TheresMore" background="colour">
                <Slider {...settings}>
                    {items}
                </Slider>
            </CarouselStyled>
        </ContainerWithGradient>
    )
}

export default TheresMore