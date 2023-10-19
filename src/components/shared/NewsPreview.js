/**
 * Preview of a news article
 * Used on news index and homepage news carosuel
 */
import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import CustomImage from "components/shared/CustomImage"
import { media } from "utils/Media"
import VideoOverlay from "components/shared/VideoOverlay"
import DateFormat from "components/shared/DateFormat"
import CarouselItemBg from "components/shared/CarouselItemBg"
import UrgencyLabel from "components/shared/UrgencyLabel"
import Play from "images/black-triangle.svg"

const ArticleStyled = styled.article`
    margin-bottom: 0;		
    width: 100%;
    display: block;
    position: relative;

    > a {
        line-height: 0;
        display: block;
    }

    .news-video {
        line-height: 0;
        cursor: pointer;

        .news-play {
            width: 60px;
            height: 60px;
            background-color: ${props => props.theme.colors.secondary};
            border-radius: 50%;
            position: relative;

            img {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
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
        line-height: 1.1;
        z-index: 10;
        -webkit-backface-visibility: hidden;
        -webkit-transform: translate3d(0,0,0);

        h2 {
            font-size: ${props => props.theme.font.size.sm};
            font-family: ${props => props.theme.font.family.bold};
            color: black;
            text-transform: uppercase;
            margin: 0;

            @media ${media.md} {
                font-size: ${props => props.theme.font.size.base};
            }
        }

        .date {
            font-size: ${props => props.theme.font.size.sm};
            font-family: ${props => props.theme.font.family.regular};
            font-weight: ${props => props.theme.font.weight.regular};
            margin: 0;
            padding-top: .25rem;
        }

        .more {  
            font-size: ${props => props.theme.font.size.sm};
            color: ${props => props.theme.colors.primary};
            font-family: ${props => props.theme.font.family.bold};
            padding-top: .25rem;

            @media ${media.md} {
                font-size: ${props => props.theme.font.size.base};
            }
        }
    }

    &:hover {
        .hoverBg {
            opacity: 1;
            /* z-index: 11; */

            &.video {
                opacity: .8;
                background-image: ${props => props.theme.colors.gradient};
                background-color: transparent;
            }
        }
        .urgency-label {
            @media ${media.md} {
                display: none;
            }
        }
    }
`

const NewsPreview = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const { node } = props.data
    return(
        <ArticleStyled borderOnHover={props.borderOnHover}>
            {/*if we have a youtube video, we print that, otherwise just print the featured image, if there is one*/}
            {node.acfNews.newsYoutube ? (
                <>
                    <div className="news-video" onClick={toggle} onKeyDown={toggle} role="button" tabIndex={0}>
                        <CustomImage
                            image={node.acfNews.featuredImage45}
                        /> 
                        {node.acfUrgencyLabel && node.acfUrgencyLabel.label &&
                            <UrgencyLabel title={node.acfUrgencyLabel.label.acfUrgencyLabels.text} /> 
                        }
                        <CarouselItemBg 
                            className="hoverBg video" 
                            borderOnHover={props.borderOnHover}
                            video
                        >
                            <div className="news-play">
                                <img src={Play} alt="Play" />
                                <span className="sr-only">Play</span>
                            </div>
                        </CarouselItemBg>
                        <div className="news-content">
                            <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
                            <p className="date"><DateFormat date={node.date} /></p>
                            <p className="more text-uppercase">Watch Now</p>
                        </div>
                    </div>
                    <VideoOverlay 
                        url={node.acfNews.newsYoutube} 
                        active={modal} 
                        toggleVideoOverlay={toggle}
                    />
                </>
            ) : (
                <>
                    {node.acfNews.featuredImage45 &&
                        <Link to={node.uri} className="position-relative">
                            <CustomImage
                                image={node.acfNews.featuredImage45}
                            /> 
                            {node.acfUrgencyLabel && node.acfUrgencyLabel.label &&
                                <UrgencyLabel title={node.acfUrgencyLabel.label.acfUrgencyLabels.text} /> 
                            }
                            <CarouselItemBg 
                                className="hoverBg" 
                                borderOnHover={props.borderOnHover}
                                type="NewsListing"
                            >
                                <div>Read More</div>
                            </CarouselItemBg>
                            <div className="news-content">
                                <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
                                <p className="date"><DateFormat date={node.date} /></p>
                                <p className="more text-uppercase d-md-none">Read More</p>
                            </div>
                        </Link>
                    }
                </>
            )}
        </ArticleStyled>
    )
}

export default NewsPreview