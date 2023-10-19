import React, { Component, useContext } from "react"
import styled, { css } from "styled-components"
import { StaticQuery, graphql, navigate } from "gatsby"
import classNames from "classnames"
import { LanguageContext } from "utils/LanguageContext"
import { media } from "utils/Media"
import WPLink from "components/shared/WPLink"

const NavWrap = styled.nav`
    display: flex;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    right: 1rem;

    @media ${media.lg} {
        right: 80px;
    }

    ${props => props.navActive && css`
        display: none;
    `}

    .sub-menu {
        display: none;
        position: absolute;
        min-width: 150px;
        padding-top: 30px;
        background-color: ${props => props.theme.colors.white};

        a {
            text-transform: none;
            padding: 1rem;
        }
    }

    ul {
        padding: 0;
        margin: 0;
        display: none;
        list-style: none;

        @media ${media.xl} {
            display: block;
        }

        &.buttons {
            display: flex;
            align-items: center;
        }

        li {
            padding-left: 0;
            &:before {
                display: none;
            }
        }

        li:not(.book-tickets) {
            display: none;

            @media (min-width: 1300px) {
                display: inline-block;
            }

            a, span {
                cursor: pointer;
                display: block;
                color: ${props => props.theme.colors.white};
                padding: 1rem .25rem;
                text-transform: uppercase;
                font-size: ${props => props.theme.font.size.sm};
                font-family: ${props => props.theme.font.family.base};
                font-weight: ${props => props.theme.font.weight.regular};
                text-decoration: none;

                &.active {
                    position: relative;
                    &:after {
                        content: "";
                        height: 2px;
                        width: 100%;
                        background-color: ${props => props.theme.colors.secondary};
                        position: absolute;
                        bottom: .5rem;
                        left: 0;
                    }
                }
            }

            a > span {
                padding: 0;
            }

            li {
                display: block;
                border-bottom: 1px solid ${props => props.theme.colors.grey4};
            }

            &:hover {
                > a, > a span, > span {
                    text-decoration: none;
                    color: ${props => props.theme.colors.secondary};
                }

                .sub-menu {
                    display: block;
                }
            }
        }

        .book-tickets {
            @media ${media.xl} {
                margin: 0 .5rem; 
            }

            a {
                span {
                    padding: .5rem;
                    @media ${media.md} {
                        padding: 1rem;
                    }
                }
            }
        }
    }
`

class Nav extends Component {
    scrollToEmail(e) {
        e.preventDefault()
        const el = document.getElementById('newsletter-signup')
        if (!el) {
            navigate("/#newsletter-signup")
        }
    }

    checkLink(link) {
        let linkHtml

        if (link.url === "#") {
            linkHtml = <span dangerouslySetInnerHTML={{ __html: link.label }} />
        } else if (link.target !== null) {
            linkHtml = <a href={link.url} target={link.target} rel="noopener noreferrer" aria-label={link.label}><span dangerouslySetInnerHTML={{ __html: link.label }} /></a>
        } else {
            linkHtml = <WPLink url={link.url}><span dangerouslySetInnerHTML={{ __html: link.label }} className={classNames({
                active: this.props.path === link.url
            })}/></WPLink>
        }

        return linkHtml
    }

    render() {
        const bookTicketsUrl = this.props.bookTickets
        const { currentLanguage, defaultLanguage } = this.props.context

        // Filter out correct menu, PRIMARY and lang, default lang does not have appending lang code
        const menus = this.props.menus.filter(menu => {
            if (currentLanguage.code === defaultLanguage.code) {
                return menu.node.locations.includes("PRIMARY")
            } else {
                return menu.node.locations.includes(`PRIMARY___${currentLanguage.code}`)
            }
        }) 

        const mainMenu = menus[0] && menus[0].node.menuItems.nodes.map((node, i) => {
            if (node.parentDatabaseId === 0) {
                return (
                    <li key={i}>
                        {this.checkLink(node)}
                    </li>
                )
            } else return ""
        })

        return (
            <NavWrap ref={nav => this.nav = nav} navActive={this.props.navActive}>
                <ul>
                    {mainMenu}
                </ul>
                <ul className="buttons">
                    {/* <li className="book-tickets">
                        <Button as="a" href="/#newsletter-signup" onClick={this.scrollToEmail} color="transparentPrimary"><span className="d-none d-lg-inline">Email</span> Sign Up</Button>
                    </li> */}
                    {bookTicketsUrl && 
                        <li className="book-tickets">
                            <WPLink 
                                url={bookTicketsUrl.url} 
                                target={bookTicketsUrl.target} 
                                button 
                                color="secondary"
                            >
                                {bookTicketsUrl.title}
                            </WPLink>
                        </li>
                    }
                </ul>
            </NavWrap>
        )
    }
}

const NavExport = (props) => {
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
                if (data.allWpMenu.edges) {
                    return (
                        <Nav 
                            menus={data.allWpMenu.edges}
                            context={context}
                            bookTickets={data.allWp.edges[0].node[context.currentLanguage.code] && data.allWp.edges[0].node[context.currentLanguage.code].acfOptions.bookTicketsUrl} 
                            {...props}
                        />
                    )
                }
            }}
        />
    )
}

export default NavExport
