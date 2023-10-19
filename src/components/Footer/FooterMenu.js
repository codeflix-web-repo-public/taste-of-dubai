import React from "react"
import styled from "styled-components"
import { StaticQuery, graphql } from "gatsby"
import WPLink from "components/shared/WPLink"

const FooterNavWrap = styled.div`
    h5 {
        color: ${props => props.theme.colors.secondary};
        font-family: ${props => props.theme.font.family.bold};
        text-transform: uppercase;
        font-size: ${props => props.theme.font.size.sm};
        margin-bottom: .25rem;
    }

    ul {
        list-style: none;
        padding: 0;
        li {
            padding-left: 0;
            &:before {
                display: none;
            }
        }
        a {
            font-size: ${props => props.theme.font.size.sm};
            font-family: ${props => props.theme.font.family.base};
            color: black;
            text-decoration: none;

            /* &:hover {
                color: ${props => props.theme.colors.grey1};
            } */
        }
    }
`

const FooterMenu = (props) => {
    const node = props.data[0].node
    if (node.menuItems.nodes.length) {
        return(
            <FooterNavWrap>
                <h5 dangerouslySetInnerHTML={{ __html: node.name}} />
                <nav>
                    <ul>
                        {
                            node.menuItems.nodes.map((node, i) => {
                                if (node.target !== null) {
                                    return (
                                        <li key={i}>
                                            <a href={node.url} target={node.target} rel="noopener noreferrer">{node.label}</a>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li key={i}>
                                            <WPLink url={node.url}>{node.label}</WPLink>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </nav>
            </FooterNavWrap>
        )
    } else return ""
}

export const menuFragment = graphql`
    fragment menuFragment on WpMenu {
        name
        menuItems {
            nodes {
                url
                target
                label
            }
        }
    }
`

const FooterMenuExport = (props) => {
    const query = graphql`
        query {
            footer1: allWpMenu(filter: {locations: {eq: FOOTER1}}) {
                edges {
                    node {
                        ...menuFragment
                    }
                }
            }
            footer2: allWpMenu(filter: {locations: {eq: FOOTER2}}) {
                edges {
                    node {
                        ...menuFragment
                    }
                }
            }
            footer3: allWpMenu(filter: {locations: {eq: FOOTER3}}) {
                edges {
                    node {
                        ...menuFragment
                    }
                }
            }
            footer4: allWpMenu(filter: {locations: {eq: FOOTER4}}) {
                edges {
                    node {
                        ...menuFragment
                    }
                }
            }
        }
    `

    return (
        <StaticQuery
            query={query}
            render={data => {

                let menu

                switch (props.menu) {
                    case 1:
                        menu = data.footer1.edges
                        break;
                    case 2:
                        menu = data.footer2.edges
                        break;
                    case 3:
                        menu = data.footer3.edges
                        break;
                    case 4:
                        menu = data.footer4.edges
                        break;
                
                    default:
                        break;
                }

                if (menu && menu.length > 0) {
                    return (
                        <FooterMenu data={menu} {...props} />
                    )
                } else return ""
            }}
        />
    )
}

export default FooterMenuExport