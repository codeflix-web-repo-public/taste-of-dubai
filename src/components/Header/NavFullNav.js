import React, { Component, useContext } from "react"
import { StaticQuery, graphql } from "gatsby"
import styled, { css } from "styled-components"
import { media } from "utils/Media"
import { LanguageContext } from "utils/LanguageContext"
import { Container, Row, Col } from "reactstrap"
import WPLink from "components/shared/WPLink"

const MenuList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;

    @media ${media.md} {
        border-right: 1px solid black;
        padding-right: 4rem;
    }

    li {
        padding-left: 0;
        &:before {
            display: none;
        }
        
        a, span {
            display: block;
            color: ${props => props.theme.colors.white};
            font-size: ${props => props.theme.font.size.lg};
            font-family: ${props => props.theme.font.family.black};
            text-transform: uppercase;
            text-align: center;
            padding-bottom: .5rem;
            text-decoration: none;

            @media ${media.md} {
                text-align: left;
                font-size: ${props => props.theme.font.size.xl};
                padding-bottom: 0;
            }

            &.item-wrapper--double {
                padding-bottom: 1.5rem; 

                @media ${media.md} {
                    padding-bottom: 0;
                }
            }

            &:hover, &.active {
                color: ${props => props.theme.colors.secondary};
                text-decoration: none;
            }
        }
    }

    ${props => props.sub && css`
        padding-top: 1.5rem;

        @media ${media.md} {
            border: none;
            padding-top: 0;
            padding-left: calc(4rem - 30px);
        }

        li {
            a, span {
                font-family: ${props => props.theme.font.family.base};

                @media ${media.md} {
                    font-family: ${props => props.theme.font.family.bold};
                }
            }
        }

        &:after {
            content: "";
            position: absolute;
            top: 0;
            width: 50%;
            height: 1px;
            background-color: rgba(255, 255, 255, .5);
            left: 50%;
            transform: translateX(-50%);

            @media ${media.md} {
                display: none;
            }
        }
    `}
`

class NavFullNav extends Component {

    toggleFullNav() {
        // document.documentElement.classList.toggle('nav-active')
    }

    checkLink(link) {
        let linkHtml
        if (link.target !== null || link.url.substring(0, 1) !== "/") {
            linkHtml = <a className="item-wrapper" href={link.url} target={link.target} rel="noopener noreferrer" aria-label={link.label}><span dangerouslySetInnerHTML={{ __html: link.label }} /></a> //onClick={() => this.toggleFullNav()}
        } else {
            if (typeof window !== "undefined" && link.url.indexOf(window.location.pathname) >= 0 && window.location.pathname !== "/") {
                linkHtml = <span className="item-wrapper item-wrapper--double active" dangerouslySetInnerHTML={{ __html: link.label }} />
            } else {
                linkHtml = <WPLink className="item-wrapper" url={link.url} onClick={() => this.toggleFullNav(link.url)}><span dangerouslySetInnerHTML={{ __html: link.label }} /></WPLink>
            }
        }

        return linkHtml
    }

    render() {
        const { currentLanguage, defaultLanguage } = this.props.context
        
        // Filter out correct menu, PRIMARY and lang, default lang does not have appending lang code
        const menus1 = this.props.menus.filter(menu => {
            if (currentLanguage.code === defaultLanguage.code) {
                return menu.node.locations.includes("PRIMARY_FULL")
            } else {
                return menu.node.locations.includes(`PRIMARY_FULL___${currentLanguage.code}`)
            }
        }) 

        const menus2 = this.props.menus.filter(menu => {
            if (currentLanguage.code === defaultLanguage.code) {
                return menu.node.locations.includes("PRIMARY_FULL_SUB")
            } else {
                return menu.node.locations.includes(`PRIMARY_FULL_SUB___${currentLanguage.code}`)
            } 
        }) 

        const mainMenu = menus1[0] && menus1[0].node.menuItems.nodes.map((node, i) => {
            if (node.parentDatabaseId === 0) {
                return (
                    <li key={i}>
                        {this.checkLink(node)}
                    </li>
                )
            } else return ""
        })

        const mainMenu2 = menus2[0] && menus2[0].node.menuItems.nodes.map((node, i) => {
            if (node.parentDatabaseId === 0) {
                return (
                    <li key={i}>
                        {this.checkLink(node)}
                    </li>
                )
            } else return ""
        })

        return(
            <Container className="py-4">
                <Row className="justify-content-center justify-content-md-start">
                    {mainMenu &&
                        <Col xs={10} md={6} className="pb-2">
                            <MenuList>
                                {mainMenu}
                            </MenuList>
                        </Col>
                    }
                    {mainMenu2 && 
                        <Col xs={10} md={6} className="pb-3">
                            <MenuList sub>
                                {mainMenu2}
                            </MenuList>
                        </Col>
                    }
                </Row>
            </Container>
        )
    }
}

const NavFullNavExport = (props) => {
    const context = useContext(LanguageContext)

    return(
        <StaticQuery
            query={graphql`
                query {
                    allWpMenu {
                        edges {
                            node {
                                locations
                                menuItems {
                                    nodes {
                                        url
                                        target
                                        label
                                        parentDatabaseId
                                    }
                                }
                            }
                        }
                    }
                }
            `}
            render={data => {
                if (data.allWpMenu && data.allWpMenu.edges.length > 0) {
                    return (
                        <NavFullNav 
                            context={context}
                            menus={data.allWpMenu.edges} 
                            {...props} 
                        />
                    )
                }
            }}
        />
    )
}

export default NavFullNavExport