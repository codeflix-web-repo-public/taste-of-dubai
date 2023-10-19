import React from "react"
import styled from "styled-components"
import { media } from "utils/Media"
import NewsletterSignup from "components/FlexibleContent/Blocks/NewsletterSignup"
import SocialImages from "components/FlexibleContent/Blocks/SocialImages"
import FooterSponsers from "./FooterSponsers"
import FooterMenus from "./FooterMenus"
import FooterText from "./FooterText"

const FooterBg = styled.div`
    background-image: ${props => props.theme.colors.gradient};
    padding: 1rem 0;

    @media ${media.md} {
        padding: 1rem 2rem 2rem 2rem; 
    }

    @media ${media.lg} {
       padding: 1rem 4rem 4rem 4rem; 
    }
`

const Footer = (props) => {
    return(
        <footer>
            {(props.hideSignup === "no" || props.hideSignup === null) && 
                <NewsletterSignup />
            }
            {(props.hideSocial === "no" || props.hideSocial === null) && 
                <SocialImages />
            }
            <FooterBg>
                <FooterSponsers />
                <FooterMenus />
                <FooterText />
            </FooterBg>
        </footer>
    )
}

export default Footer