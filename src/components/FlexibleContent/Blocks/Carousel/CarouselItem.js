
import React, { useState } from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import { media } from "utils/Media"
import CarouselItemBg from "components/shared/CarouselItemBg"
import UrgencyLabel from "components/shared/UrgencyLabel"
import Popup from "components/shared/Popup"
import WPLink from "components/shared/WPLink"
import CustomImage from "components/shared/CustomImage"

const CarouselButton = styled.button`
    padding: 0;
    border: 0;
`

const ArticleStyled = styled.article`
    margin-bottom: 0;		
    width: 100%;
    display: block;
    position: relative;

    ${props => props.type === "ColumnedImageWithText" && css`
        filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.15));
        display: flex;
        flex-direction: column;
    `}

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-image: ${props => props.theme.colors.gradient};

        ${props => props.type === "ColumnedImageWithText" && css`
            background-image: none;
        `}
    }

    > a {
        line-height: 0;
        display: block;
    }

    p.date {
        font-size: ${props => props.theme.font.size.base};
    }

    h2 {
        font-size: ${props => props.theme.font.size.base};
        font-family: ${props => props.theme.font.family.bold};
        text-transform: uppercase;
        color: ${props => props.theme.colors.tertiary}; 
        margin: 0;
        padding: 0;

        ${props => props.type === "WpRecipe" && css`
            color: ${props => props.theme.colors.black}; 
        `}

        ${props => props.type === "WpThingtodo" && css`
            color: ${props => props.theme.colors.purple}; 
        `}

        ${props => props.type === "ColumnedImageWithText" && css`
            color: ${props => props.theme.colors.primary};
        `}

        a {
            text-decoration: none;
            ${props => props.type === "WpRecipe" && css`
                color: ${props => props.theme.colors.black}; 
            `}

            ${props => props.type === "WpThingtodo" && css`
                color: ${props => props.theme.colors.purple}; 
            `}

            ${props => props.type === "ColumnedImageWithText" && css`
                color: ${props => props.theme.colors.primary};
            `}
        }
    }

    p.more {  
        font-size: ${props => props.theme.font.size.base};
    }


    .gatsby-image-wrapper {
        -webkit-transform: translate3d(0,0,0);
    }

    .news-content {
        position: absolute;
        padding: 1rem;
        bottom: 1rem;
        left: 1rem;
        width: calc(100% - 2rem);
        background-color: white;
        color: black;
        font-size: ${props => props.theme.font.size.sm};
        z-index: 10;
        -webkit-backface-visibility: hidden;
        -webkit-transform: translate3d(0,0,0);

        ${props => props.type === "ColumnedImageWithText" && css`
            position: relative;
            bottom: 0;
            left: 0;
            width: 100%;
            flex-grow: 1;
        `}

        p {
            &:last-child {
                margin: 0;
            }
        }
    }

    &:hover {
        ${props => props.borderOnHover === "yes" && css`
            border: 4px solid yellow;
        `}

        .hoverBg {
            opacity: 1;
        }
        .urgency-label {
            @media ${media.md} {
                display: none;
            }
        }
    }
` 

const CarouselContent = (props) => {
    return(
        <>
            <CustomImage
                image={props.image}
            /> 
            {props.label &&
                <UrgencyLabel title={props.label} /> 
            }
            {props.url && (props.pageType === "page" || props.pageType === "popup") &&
                <CarouselItemBg 
                    className="hoverBg" 
                    borderOnHover={props.borderOnHover}
                    type={props.type}
                >
                    <div>Read More</div>
                </CarouselItemBg>
            }
            <div className="news-content">
                {props.title && 
                    <h2>
                        {props.title}
                    </h2>
                }
                {props.excerpt && 
                    <div dangerouslySetInnerHTML={{ __html: props.excerpt }} className="pt-2" />
                }
                {props.link &&
                <div className="pt-5 pt-md-4">
                    <WPLink url={props.link.url} target={props.link.target} button color="black">
                        {props.link.title}
                    </WPLink>
                </div>
                }
            </div>
        </>
    )
}

const CarouselItem = (props) => {
    const [modal, setModal] = useState(false)

    const toggleModal = (e) => {
        // e && e.stopPropagation()
        // e && e.preventDefault()
        setModal(modal => !modal)
    }

    return(
        <ArticleStyled type={props.type}>
            {props.image &&
                <>
                    {props.pageType === "page" ? (
                        <Link to={props.url} className="position-relative">
                            <CarouselContent {...props} />
                        </Link>
                    ) : props.pageType === "popup" ? (
                        <>
                            <CarouselButton onClick={toggleModal}>
                                <CarouselContent {...props} />
                            </CarouselButton>
                            <Popup isOpen={modal} toggle={toggleModal} data={props.data} />
                        </>
                    ) : (
                        <CarouselContent {...props} />
                    )}
                </>
            }
        </ArticleStyled>
    )
}

export default CarouselItem