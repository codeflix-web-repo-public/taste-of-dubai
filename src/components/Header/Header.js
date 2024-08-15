import React, { Component } from "react"
import styled, { css } from "styled-components"
import { media } from "utils/Media"
import { LanguageContext } from "utils/LanguageContext"
import HeaderAnnouncement from "./HeaderAnnouncement"
import NavBar from "./NavBar"
import NavFull from "./NavFull"
import CookieConsent from "../CookieConsent"

const HeaderWrap = styled.header`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;

    ${props => props.navActive && css`
        height: 100%;

        @media ${media.md} {
            height: auto;
        }
    `}
    

    &:before {
        content: "";
        position: absolute;
        opacity: 0.8;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${props => props.theme.colors.gradient};

        ${props => props.navActive && css`
            opacity: 1;
        `}
    }
`

class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            navActive: false
        }

        this.toggleNav = this.toggleNav.bind(this)
        this.setNavTop = this.setNavTop.bind(this)
        this.fullNavRef = React.createRef(null);
    }

    componentDidMount() {
        // if (typeof window !== "undefined" && window.innerWidth > 768) {
        //     window.addEventListener("resize", this.setNavTop, true)
        // }
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        // window.removeEventListener("resize", this.setNavTop, true)
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = event => {
        if (this.fullNavRef.current && 
            !this.fullNavRef.current.contains(event.target) && 
            this.state.navActive) {
            // document.documentElement.classList.remove('nav-active')
            this.toggleNav()
        }
    }

    toggleNav(e) {
        e && e.preventDefault()

        this.setNavTop()

        this.setState({
            navActive: !this.state.navActive,
        })

        // document.documentElement.classList.toggle('nav-active')
    }

    setNavTop() {
        let navTop
        const header = document.getElementsByClassName("headerWrap")[0];
        if (header !== undefined) {
            const headerHeight = header.clientHeight
            navTop = `${headerHeight}px`
        }

        this.setState({
            navTop
        })
    }

    render() {
        const { currentLanguage, defaultLanguage } = this.context
        const rootUrl = currentLanguage.code === defaultLanguage.code ? "/" : `/${currentLanguage.slug}/`

        return (
            <>
                <HeaderWrap className="headerWrap" id="siteHeader" navActive={this.state.navActive} ref={this.fullNavRef}>
                    <HeaderAnnouncement />
                    <NavBar 
                        rootUrl={rootUrl}
                        toggleNav={(e) => this.toggleNav(e)} 
                        path={this.props.path}
                        navActive={this.state.navActive}
                    />
                    <NavFull 
                        active={this.state.navActive} 
                        toggleNav={(e) => this.toggleNav(e)} 
                        navTop={this.state.navTop} 
                    />
                </HeaderWrap>
                <CookieConsent />
                {/* <HeaderCookieConsent /> */}
            </>
        )
    }
}

Header.contextType = LanguageContext

export default Header