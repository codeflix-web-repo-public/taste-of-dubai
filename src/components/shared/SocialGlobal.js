import React, { useContext } from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { LanguageContext } from "utils/LanguageContext"
import { media } from "utils/Media"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faInstagram, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons"

const SocialSidebar = styled.ul`
    position: fixed;
    right: 0;
    top: 50%;
    background-color: ${props => props.theme.colors.secondary};
    padding: .5rem 0;
    list-style: none;
    display: none;
    z-index: 500;
    max-width: 40px;
    overflow: hidden;
    
    @media ${media.md} {
        display: block;
    }

    li {
        padding-left: 0;
        &:before {
            display: none;
        }
    }

    a {
        color: black;
        padding: .25rem .5rem;
        display: block;
        font-size: 1.25rem;
        text-align: center;

        svg {
            max-height: 20px; 
            max-width: 20px; 
        }

        &:hover {
            color: ${props => props.theme.colors.primary};
        }
    }
`

const SocialGlobal = (props) => {
    return(
        <SocialSidebar>
            {props.data.socialFacebookGlobal &&
                <li>
                    <a href={props.data.socialFacebookGlobal} target="_blank" rel="noopener noreferrer">
                        <span className="sr-only">Facebook</span>
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                </li>
            }
            {props.data.socialTwitterGlobal &&
                <li>
                    <a href={props.data.socialTwitterGlobal} target="_blank" rel="noopener noreferrer">
                        <span className="sr-only">Twitter</span>
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </li>
            }
            {props.data.socialInstagramGlobal &&
                <li>
                    <a href={props.data.socialInstagramGlobal} target="_blank" rel="noopener noreferrer">
                        <span className="sr-only">Instagram</span>
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </li>
            }
            {props.data.socialYoutubeGlobal &&
                <li>
                    <a href={props.data.socialYoutubeGlobal} target="_blank" rel="noopener noreferrer">
                        <span className="sr-only">Youtube</span>
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                </li>
            }
            {props.data.socialTiktokGlobal &&
                <li>
                    <a href={props.data.socialTiktokGlobal} target="_blank" rel="noopener noreferrer">
                        <span className="sr-only">Tiktok</span>
                        <FontAwesomeIcon icon={faTiktok} />
                    </a>
                </li>
            }
        </SocialSidebar>
    )
}

const SocialGlobalExport = () => {
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
                    data.allWp.edges[0].node[currentLanguage.code]
                ) {
                    return (
                        <SocialGlobal data={data.allWp.edges[0].node[currentLanguage.code].acfOptions} />
                    ) 
                } else return ""
            }}
        />
    )
}

export default SocialGlobalExport