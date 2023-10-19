import React, { Component, useContext } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container } from "reactstrap"
import styled from "styled-components"
import classNames from "classnames"
import Cookies from "js-cookie"
import { LanguageContext } from "utils/LanguageContext"
import { media } from "utils/Media"
import { LinkSearchReplace } from "utils/LinkSearchReplace"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const CookieWrap = styled(Container)`
    background: ${props => props.theme.colors.white};
    width: 100%;
    display: none;
    position: relative;
    padding-right: 3rem;
    overflow: hidden;
    color: ${props => props.theme.colors.black};
    font-size: ${props => props.theme.font.size.sm};

    @media ${media.md} {
        font-size: ${props => props.theme.font.size.base};
    }

    &.hide {
        height: 0;
    }

    a {
        color: ${props => props.theme.colors.primary};
        font-weight: ${props => props.theme.font.family.bold};
        text-decoration: underline;

        &:hover { 
            color: ${props => props.theme.colors.primary};
            text-decoration: underline;
        }
    }
`

const CookieContainer = styled(Container)`
    text-align: center;
    padding: .75rem 0;
`

const Close = styled.button`
    position: absolute;
    background: 0;
    right: 1rem;
    top: .5rem;
    border: 0;
    padding: 0;

    @media ${media.md} {
        top: 50%;
        transform: translateY(-50%);
    }

    svg {
        color: ${props => props.theme.colors.black};
        display: block;
        font-size: 1rem;
        line-height: .7;
    }
`

class HeaderAnnouncement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cookies: "d-none",
            hidden: false,
            lastScrollTop: 0
        }
        this.acceptCookies = this.acceptCookies.bind(this)
        this.hideShow = this.hideShow.bind(this)
        // this.bodyPadding = this.bodyPadding.bind(this)
    }

    componentDidMount() {
        // this.bodyPadding()
        if (Cookies.get('announcement') !== '1' || Cookies.get('announcement') === undefined) {
            this.setState({
                cookies: "d-block"
            })

            window.addEventListener("scroll", this.hideShow)
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.hideShow)
        // if (Cookies.get('announcement') !== '1' || Cookies.get('announcement') === undefined) {

        // }
    }

    // bodyPadding() {
    //     setTimeout(() => {
    //         const headerWrap = document.getElementsByClassName("headerWrap")[0]
    //         if (headerWrap !== undefined) {
    //             const headerHeight = headerWrap.clientHeight
    //             document.getElementsByClassName("siteWrap")[0].style.paddingTop = `${headerHeight}px`
    //         }
    //     }, 100)
    // }

    hideShow(bodyPadding = false) {
        let { lastScrollTop } = this.state
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollDirection = scrollTop > lastScrollTop ? "down" : "up"
        let hidden

        if (Math.abs(scrollTop - lastScrollTop) > 200) {
            if (scrollDirection === "up") {
                hidden = false
            } else {
                hidden = true
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

            this.setState({
                hidden,
                lastScrollTop
            })

            // if (bodyPadding) {
            //     this.bodyPadding()
            // }
        }
    }

    acceptCookies() {
        Cookies.set('announcement', '1', { expires: 365, path: '/' });
        this.setState({
            cookies: "d-none"
        })
        // this.bodyPadding(true)
    }

    render() {
        return (
            <CookieWrap fluid
                className={classNames({
                    hide: this.state.hidden,
                    [this.state.cookies]: true
                }
                )}>
                <CookieContainer dangerouslySetInnerHTML={{ __html: LinkSearchReplace(this.props.data.headerAnnouncementText) }} />
                <Close onClick={this.acceptCookies}>
                    <FontAwesomeIcon icon={faTimes} />
                </Close>
            </CookieWrap>
        )
    }
}

const HeaderAnnouncementExport = (props) => {
    const { currentLanguage } = useContext(LanguageContext)
    return (
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
                    data.allWp.edges[0].node[currentLanguage.code] &&
                    data.allWp.edges[0].node[currentLanguage.code].acfOptions.headerAnnouncementText
                ) {
                    return (
                        <HeaderAnnouncement data={data.allWp.edges[0].node[currentLanguage.code].acfOptions} {...props} />
                    )
                } else return ""
            }}
        />
    )
}

export default HeaderAnnouncementExport