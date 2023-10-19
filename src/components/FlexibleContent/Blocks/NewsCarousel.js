import React from "react"
import {StaticQuery, graphql} from "gatsby"
import Slider from "react-slick"
import styled, { css } from "styled-components"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons"
import ContainerMax from "components/shared/ContainerMax"
import ContentMax from "components/shared/ContentMax"
import CarouselStyled from "components/shared/CarouselStyled"
import NewsPreview from "components/shared/NewsPreview"
import WPLink from "components/shared/WPLink"
import BlockTitle from "components/shared/BlockTitle"
import { media } from "utils/Media"

const Background = styled.div`
	padding-top: 3rem;
	padding-bottom: 3rem;
	${props => props.background === "colour" && css`
		background-image: ${props => props.theme.colors.gradient};
	`}
`

const ContainerMaxStyled = styled(ContainerMax)`
    padding-right: 0;
	overflow: hidden;
    @media ${media.md} {
        padding-right: ${props => props.theme.bootstrapGutterWidth};
    }

	@media (min-width: 1300px) {
		overflow: visible;
	}
`

const NewsCarousel = (props) => (
    <StaticQuery
        query={graphql`
		{
			allWpNewsArticle(sort: {order: DESC, fields: date}, limit: 12, filter: {status: {eq: "publish"}}) {
				edges {
					node {
						uri
						title
						date
						acfNews {
							hidePublishDate
							newsYoutube
							featuredImage45 {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
                srcSet
							}
						}
						acfUrgencyLabel {
							label {
								... on WpUrgencyLabel {
									acfUrgencyLabels {
										text
									}
								}
							}
						}
					}
				}
			}
		}
        `}
        render={data => {
			const { block } = props
            const posts = data.allWpNewsArticle.edges

            const getNews = posts && posts.map((post, i) => {
                return <NewsPreview data={post} key={i} borderOnHover={block.borderOnHover} />
            })

			function PrevButton({ onClick }) {
				return(
					<button onClick={onClick} className="slider-arrow prev" aria-label="Previous">
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>
				) 
			}
	
			function NextButton({ onClick }) {
				return (
					<button onClick={onClick} className="slider-arrow next" aria-label="Next">
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				)
			}

			const settings = {
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 3,
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
				<Background background={block.background}>
					<ContainerMaxStyled>
						<ContentMax>
							<CarouselStyled background={block.background} itemCount={posts.length}>
							    {block.title &&
									<BlockTitle 
										dangerouslySetInnerHTML={{__html: block.title }} 
										white={block.background === "colour" ? true : false}
										outline={block.background === "colour" ? true : false}
									/>
								}

								<Slider {...settings}>
									{getNews}
								</Slider>
						
								{/*do we have a view all link?*/}
								{block.button &&
									<div className="pt-3">
										<WPLink url={block.button.url} target={block.button.target} button color="black">
											{block.button.title}
										</WPLink>
									</div>
								}
							</CarouselStyled>
						</ContentMax>
					</ContainerMaxStyled>
				</Background>
            )
        }}
    />
)

export default NewsCarousel