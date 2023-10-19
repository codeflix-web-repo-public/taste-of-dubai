import styled, { css } from "styled-components"
import { media } from "utils/Media"

const CarouselStyled = styled.div`
    @media ${media.sm} {
		margin-right: 0;
    }		

	.slick-slider {
		/* padding-bottom: 2rem; */

		.slick-track {
			display: flex;
		}
		.slick-list {
			margin: 0 -6px;	
			/* padding-bottom: 1rem; */
			padding-left: 0 !important;
			padding-bottom: 80px !important;

		    @media ${media.md} {
				margin: 0 -15px;
		    }
			
			@media ${media.lg} {
				padding-bottom: 1rem !important;
				${props => (props.itemCount > 3 && props.type !== "TheresMore") && css`
					padding-bottom: 80px !important;
				`} 
			}
		}
		.slick-slide {
			padding: 0 6px;	
	        height: auto;
		    @media ${media.md} {
				padding: 0 15px;
		    }
		    > div {
		    	height: 100%;
				display: flex;
		    }
		}
		.slider-arrow {
			position: absolute;
			bottom: 0;
			background: black;
			appearance: none;
			border: none;
			font-size: 24px;
			z-index: 13;
			padding: .5rem 1rem;
			color: ${props => props.theme.colors.secondary};

		    @media ${media.lg} {
		    	bottom: auto;
		    	top: calc(50% - 40px);
				transform: translateY(-50%);
		    }

			&.prev {
				left: 0;
			    @media (min-width: 1350px) {
			    	left: -50px;
			    }
			}
			&.next {
				right: 15px;
			    @media ${media.sm} {
					right: 0;
			    }
			    @media (min-width: 1350px) {
			    	right: -50px;
			    }
			}

			svg {
				max-width: 12px;
				max-height: 24px;
			}


			&:hover {
				color: ${props => props.theme.colors.secondary};
			}
		}
		.slick-dots {
			height: 10px;
			line-height: 10px;
			bottom: 1.5rem;
			padding-right: 30px;

			@media ${media.sm} {
				padding-right: 0;
			}

			li {
				margin: 0 2.5px;
				width: auto;
				height: auto;
				vertical-align: middle;
				button {
					width: 10px;
					height: 10px;
					background: black;
					border-radius: 50%;
					&:before {
					  display: none;
					}
				}
				&.slick-active button {
					background: ${props => props.theme.colors.primary};

					${props => props.background === "colour" && css`
						background: ${props => props.theme.colors.white};
					`}
				}
			}
		}
	}
`

CarouselStyled.defaultProps = {
	type: "default"
}

export default CarouselStyled