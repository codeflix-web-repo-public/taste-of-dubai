import React from "react"
import Slider from "react-slick"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { media } from "utils/Media"
import ContainerMax from "components/shared/ContainerMax"
import ContentMax from "components/shared/ContentMax"
import CarouselStyled from "components/shared/CarouselStyled"
import WPLink from "components/shared/WPLink"
import BlockTitle from "components/shared/BlockTitle"
import CarouselItem from "./CarouselItem"

const ContainerMaxStyled = styled(ContainerMax)`
    padding-right: 0;
	overflow: hidden;

    @media ${media.md} {
        padding-right: ${props => props.theme.bootstrapGutterWidth};
    }

	@media (min-width: 1300px) {
		overflow: visible;
	}

	${props => props.background === "coloured" && css`
		background: ${props => props.theme.colors.gradient};
	`}
`

const Carousel = (props) => {
	const { block } = props
	const blocks = block.items

	const getItems = blocks && blocks.map((post, i) => {
		return(
			<CarouselItem 
				data={post}
				image={post.acfTastePageSettings.featuredImage45}
				label={post.acfUrgencyLabel.label && post.acfUrgencyLabel.label.acfUrgencyLabels.text}
				title={post.title}
				url={post.uri}
				excerpt={post.excerpt}
				pageType={post.acfTastePageSettings.type}
				type={post.__typename}
				borderOnHover={block.borderOnHover} 
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
		slidesToShow: parseInt(block.columns),
		slidesToScroll: 1,
		lazyload: false,
		prevArrow: <PrevButton/>,
		nextArrow: <NextButton/>,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
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

	return (
		<>
		<ContainerMaxStyled background={block.background} className="my-4 my-xl-5">
			<ContentMax>
				<CarouselStyled itemCount={blocks.length}>
					<BlockTitle dangerouslySetInnerHTML={{__html: block.title}} />

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
		</>
	)
}

export default Carousel