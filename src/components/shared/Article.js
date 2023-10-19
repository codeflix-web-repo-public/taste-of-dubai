import React from "react"
import styled from "styled-components"
import { media } from "utils/Media"
import quote from "images/quote.svg"

const ArticleStyled = styled.article`
    /* overflow:hidden; not sure why hidden */
    
    @media ${media.md} {
        padding: 0 15px;
    }

    @media (min-width: 1600px) {
        padding: 0;
    }

    header {
        h1 {
            font-size: 1.5rem;/*24*/
            line-height: 1;
            color: #323741;
            margin: 16px 0 23px;
            text-transform: uppercase;
            @media ${media.md} {
                font-size: 2.25rem;/*36*/
                line-height: 1.11;
                margin: 29px 0 36px;
            }  

            button {
                color: ${props => props.theme.colors.secondary};
            }
        }
    }
    .sidebar {
        aside {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 15px;

            a {
                display: block;
                width: 100%;
            }

            @media ${media.lg} {
                padding: 0;
            }
        } 
    }
    .hero-image {
        margin-bottom: 22px;
        @media ${media.md} {
            margin-bottom: 30px;
        }  
        .gatsby-image-wrapper {
            height: 179px;
            margin: 0 -15px;
            @media ${media.md} {
                height: 399px;
                margin: 0;
            }  
            @media ${media.lg} {
                height: 444px;
            }
        }
    }
    figcaption {
        /* margin: 5px 0 0;
        font-size: 0.875rem;
        line-height: 1.5; */
        font-size: ${props => props.theme.font.size.sm};
    }
    .date-share {
        overflow: hidden;

        p.date {
            font-family: ${props => props.theme.font.family.bold};
            font-size: 1rem;
            padding: 0 15px;

            @media ${media.md} {
                padding: 0;
            }  
        }

        div.share {
            font-size: 17px;
            text-align: right;
            color: ${props => props.theme.colors.primary};
            /* padding: 0 15px; */

            @media ${media.md} {
                padding: 0;
                text-align: left;
            }  

            .share-button {
                display: inline;
                margin-right: 25px;
                cursor: pointer;

                @media ${media.md} {
                    margin: 0 25px 0 0;
                }  
            }

            span {
                font-family: ${props => props.theme.font.family.bold};
                color: ${props => props.theme.colors.black};
                margin-right: 1rem;
                font-size: ${props => props.theme.font.size.sm};
            }

            svg {
                max-width: 25px;
                max-height: 25px;
                color: black;
            }
        }
    }
    p {
        margin-bottom: 1em;
        /* line-height: 1.5; */
    }
    /* h2,h3,h4,h5,h6 {
        font-family: ${props => props.theme.font.family.bold};
        font-size:
        /* margin: 
        margin: 0 0 1.5rem 0;
    } */
    .wp-block-embed-youtube {
        position: relative;
        height: 0;
        &.wp-embed-aspect-16-9 {
            padding-bottom: 56.25%;
        }
        &.wp-embed-aspect-4-3 {
            padding-bottom: 75%;
        }
        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    blockquote {
        padding-left: 100px;
        position: relative;
        background-image: url("${quote}");
        background-repeat: no-repeat;
        background-position: left 5px;
        p {
            font-family: ${props => props.theme.font.family.black};
            font-size: ${props => props.theme.font.size.xl};
            line-height: 1.5;
            em {
                text-transform: uppercase;
                font-size: 1rem;/*16*/
            }
        }
    }
    ul {
        margin-bottom: 2em;
        li {
            position: relative;
            line-height: 1.5;
        }
    }
    ol {
        li {
            padding-bottom: 1rem;
        }
    }
    iframe {
        width: 100% !important;
    }
`

const Article = (props) => {
    return(
        <ArticleStyled>
            {props.children}
        </ArticleStyled>
    )
}

export default Article