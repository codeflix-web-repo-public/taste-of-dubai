import React from "react"
import styled from "styled-components"
import { Row, Col } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import WPLink from "components/shared/WPLink"
import Text from "components/shared/Text"

const SidebarCustomBlockWrap = styled.div`
    a {    
        display: inline-block !important;
        width: auto !important;
    }
`

const ColStyled = styled(Col)`
    display: flex;
    a {
        font-size: 1.5rem;
        padding-right: 1.5rem;
    }
`

const SidebarCustomBlock = (props) => {
    const { data } = props

    return(
        <SidebarCustomBlockWrap className="pb-4"> 
            {data.title &&
                <Text tertiary uppercase size="1.5" extrabold dangerouslySetInnerHTML={{ __html: data.title }} />
            }
            {data.text &&
                <div dangerouslySetInnerHTML={{ __html: data.text }} className="pb-3" />
            }
            <Row>
                <ColStyled>
                    {data.facebookLink && 
                        <a href={data.facebookLink} target="_blank" rel="noopener noreferrer">
                            <span className="sr-only">Facebook</span>
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                    }
                    {data.twitterLink &&
                        <a href={data.twitterLink} target="_blank" rel="noopener noreferrer">
                            <span className="sr-only">Twitter</span>
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    }
                    {data.instagramLink && 
                        <a href={data.instagramLink} target="_blank" rel="noopener noreferrer">
                            <span className="sr-only">Instagram</span>
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    }
                    {data.websiteLink && 
                        <WPLink url={data.websiteLink} target="_blank" rel="noopener noreferrer">
                            <span className="sr-only">Website</span>
                            <FontAwesomeIcon icon={faGlobe} />
                        </WPLink>
                    }
                </ColStyled>
            </Row>
            {data.button &&
                <WPLink 
                    url={data.button.url} 
                    target={data.button.target} 
                    rel="noopener noreferrer" 
                    button 
                    color="black"
                    className="mt-3"
                >
                    {data.button.title}
                </WPLink>
            }
        </SidebarCustomBlockWrap>
    )
}

export default SidebarCustomBlock