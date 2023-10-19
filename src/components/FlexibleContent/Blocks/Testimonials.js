import React, { useContext } from "react"
import { StaticQuery, graphql } from "gatsby"
import ContainerMax from "components/shared/ContainerMax"
import styled from "styled-components"
import Slider from "react-slick"
import CustomImage from "components/shared/CustomImage"
import quoteLeft from "images/quote-left.svg"
import quoteRight from "images/quote-right.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { LanguageContext } from "utils/LanguageContext"
import { media } from "utils/Media"

const Testimonials = styled.div`
	margin: 5rem 0;
	text-align: center;
	h4 {
		text-transform: uppercase;
        color: ${props => props.theme.colors.primary};
	}
	h5 {
        color: ${props => props.theme.colors.primary};
	}
	.slick-slider {
		padding-bottom: 66px;
		.slick-slide {
			.text {
				position: relative;
				p {
					max-width: calc(100% - 80px);
					margin: 0 auto 1em;
				    font-size: 1.125rem;/*18*/
				    line-height: 1.44;

				    @media ${media.md} {
						max-width: 528px;
					    font-size: 1.5rem;/*24*/
					    line-height: 1.33;
				    }

				    @media ${media.lg} {
						max-width: 793px;
				    }
				}
				&:before,
				&:after {
					content: "";
					width: 36px;
					height: 30px;
					background-repeat: no-repeat;
					background-position: 0 0;
					background-size: cover;
					position: absolute;
				}
				&:before {
					background-image: url("${quoteLeft}");
					top: 0;
					left: 0;
				    @media ${media.md} {
						left: 15px;
				    }
				    @media ${media.lg} {
						left: 50%;
						margin-left: -496px;						
				    }
				}
				&:after {
					background-image: url("${quoteRight}");
					bottom: 0;
					right: 0;
				    @media ${media.md} {
						right: 15px;
				    }
				    @media ${media.lg} {
				    	right: auto;
						left: 50%;
						margin-left: 460px;
				    }
				}
			}
			.img-wrap {
				max-width: 126px;
				margin: 47px auto 0;
			    @media ${media.md} {
			    	max-width: 182px;
			    }
			}
		}
		.slider-arrow {
			position: absolute;
			bottom: -14px;
			border: none;
			font-size:24px;
			z-index: 10;
			color: ${props => props.theme.colors.secondary};
			
		    @media ${media.lg} {
		    	bottom: auto;
		    	top: 50%;
				transform: translateY(-50%);
		    }
			&.prev {
				left: 0;
			    @media ${media.md} {
					left: 50%;
					margin-left: -140px;
			    }
			    @media ${media.lg} {
			    	left: 0;
			    	margin: 0;
			    }
			}
			&.next {
				right: 0;
			    @media ${media.md} {
					right: 50%;
					margin-right: -140px;
			    }
			    @media ${media.lg} {
			    	right: 0;
			    	margin: 0;
			    }
			}
			&:hover {
				color: ${props => props.theme.colors.secondary};
			}
			svg {
				max-width: 12px;
				max-height: 24px;
			}
		}
	}
`

const TestimonialsExport = ({ block }) => {
    const { currentLanguage } = useContext(LanguageContext)

    return(
        <StaticQuery
            query={graphql`
                query {
                    allWp {
                        edges {
                            node {
                                ...optionsFragment
                            }
                        }
                    }		  
                }
            `}
            render={data => {
                if (
                    data.allWp.edges[0].node[currentLanguage.code] && 
                    data.allWp.edges[0].node[currentLanguage.code].acfOptions.blockTestimonials
                ) {
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
    
                    //if we're overriding the defaults, the data comes form the block, otherwise it comes from the options page
                    let title = data.allWp.edges[0].node[currentLanguage.code].acfOptions.blockTestimonials.defaultTitle
                    let subtitle = data.allWp.edges[0].node[currentLanguage.code].acfOptions.blockTestimonials.defaultSubtitle
                    let testimonials = data.allWp.edges[0].node[currentLanguage.code].acfOptions.blockTestimonials.testimonials
                    
                    if (block.overrideDefaults) {
                        title = block.title
                        subtitle = block.subtitle
                        testimonials = 	block.testimonials
                    }
                    
                    //slider settings
                    var settings = {
                        dots: true,
                        infinite: true,
                        speed: 500,
                        focusable: false,  
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        prevArrow: <PrevButton />,
                        nextArrow: <NextButton />,
                    }
                    
                    return (
                        <ContainerMax>
                            <Testimonials>
                                <h4 dangerouslySetInnerHTML={{ __html: title }} />            
                                <h5 dangerouslySetInnerHTML={{ __html: subtitle }} />
                                <Slider {...settings}>
                                    {testimonials && testimonials.map((testimonial, i) => (
                                        <div className="testimonial" key={i}>
                                            <div className="text" dangerouslySetInnerHTML={{ __html: testimonial.testimonial }} />
                                            {testimonial.logo &&
                                                <div className="img-wrap">
                                                    <CustomImage 
                                                        image={testimonial.logo} 
                                                    />
                                                </div>
                                            }
                                        </div>
                                    ))}
                                </Slider>
                            </Testimonials>
                        </ContainerMax>
                    )
                } else return ""
            }}
        />
    )
}

export default TestimonialsExport