import React, { useContext } from "react"
import { StaticQuery, graphql } from "gatsby"
import { LanguageContext } from "utils/LanguageContext"
import SocialList from "components/shared/SocialList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faInstagram, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons"

const Social = (props) => {
    return(
        <SocialList>
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
        </SocialList>
    )
}

const SocialExport = () => {
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
                        <Social data={data.allWp.edges[0].node[currentLanguage.code].acfOptions} />
                    )
                } else return ""
            }}
        />
    )
}

export default SocialExport