import React, { useContext } from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { LanguageContext } from "utils/LanguageContext"
import ContainerMax from "components/shared/ContainerMax"
import Text from "components/shared/Text"
import { LinkSearchReplace } from "utils/LinkSearchReplace"
import logo from "images/logo.svg"
import menalogo from "images/menalogo.svg"
const ContainerMaxStyled = styled(ContainerMax)`
    text-align: center;
    a {
        color: ${props => props.theme.colors.white};
        font-family: ${props => props.theme.font.family.base};
        font-weight: ${props => props.theme.font.weight.regular};
        text-decoration: none;

        &:hover {
            color: ${props => props.theme.colors.white};
        }
    }

    img {
        max-width: 53.5%;
    }
`

const FooterText = (props) => {
    return (
        <ContainerMaxStyled>
            <img src={logo} alt={props.title} className="pt-4 pb-4" width="150" height="115" />
            {props.text && 
                <Text center white sm as="div" dangerouslySetInnerHTML={{ __html: LinkSearchReplace(props.text) }} />
            }
            <img src={menalogo} alt={props.title} className="pt-4 pb-4" width="150" height="115" />
        </ContainerMaxStyled>
    )
}

const FooterTextExport = () => {
    const { currentLanguage } = useContext(LanguageContext)
    return(
        <StaticQuery
            query={graphql`
                query {
                    site {
                        siteMetadata {
                            title
                        }
                    }
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
                const options = data.allWp.edges[0].node[currentLanguage.code].acfOptions

                // Check we have some results
                if (options && options.footerText) {
                    return (
                        <FooterText text={options.footerText} title={data.site.siteMetadata.title} />
                    )
                }
            }}
        />
    )
}

export default FooterTextExport