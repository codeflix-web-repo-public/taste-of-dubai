import React, { Component } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import isTouchDevice from "is-touch-device"
import classNames from "classnames"
import scrollToElement from "scroll-to-element"
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"
import 'scss/main.scss'
import Seo from "utils/Seo"
import GlobalStyles from "utils/GlobalStyles"
import themeWinter from "utils/Theme"
import themeSummer from "utils/ThemeSummer"
import { LanguageContext } from "utils/LanguageContext"
import Header from "components/Header/Header"
import Footer from "components/Footer/Footer"
import SocialGlobal from "components/shared/SocialGlobal"

const SiteWrap = styled.div`
    /* padding-top: 146px; */
    &.noPadding {
        padding-top: 0;
    }
`

class Layout extends Component {
    constructor(props) {
        super(props)
        this.handleFirstTab = this.handleFirstTab.bind(this)
        this.newsletterSignupCheck = this.newsletterSignupCheck.bind(this)
    }

    componentDidMount() {
        // this.bodyPadding()
        this.detectAnchorLinks()
        this.attachTrackingToLinks()
        this.newsletterSignupCheck()
        window.addEventListener('keydown', this.handleFirstTab);
    }

    attachTrackingToLinks() {
        const links = document.querySelectorAll('a, button');

        // wait for page to load
        setTimeout(() => {
            links && Array.prototype.forEach.call(links, link => {
                const text = link.innerText ? link.innerText : "n/a"
                let href = link.href ? link.href : "n/a"
    
                // console.log(text + ' - ' + href)
                // add cross domain tracking to external links
                if (window.analytics && typeof window.analytics.user !== "undefined") {
                    // if (!href.includes(domain) && href.substring(0, 1) !== "/" && href.substring(0, 1) !== "#") {
                    if (href.includes("seetickets") && href.substring(0, 1) !== "/" && href.substring(0, 1) !== "#") {
                        const id = window.analytics.user().anonymousId()
                        link.href = `${href}?ajs_aid=${id}`
                    }
                }
    
                // Add event listener to each
                link.addEventListener("click", function (e) {
                    // e.preventDefault();
    
                    if (window.analytics) {
                        window.analytics.track("Button/Link click", {
                            text: text,
                            link: href
                        })
                    }
                })
            })
        }, 500);
    }

    handleFirstTab(e) {
        if (e.keyCode === 9) { // the "I am a keyboard user" key
            document.body.classList.add('user-is-tabbing');
            window.removeEventListener('keydown', this.handleFirstTab);
        }
    }

    newsletterSignupCheck() {
        if (typeof window !== "undefined") {
            const result = this.getParameterByName('result')
            const firstname = this.getParameterByName('firstname')
            const email = this.getParameterByName('email')
            const trackingname = this.getParameterByName('trackingname')

            if (result) {
                if (result === "success" && window.analytics) {
                    window.analytics.identify({
                        firstname: firstname,
                        email: email,
                    })
                    window.analytics.track(trackingname, {
                        firstname: firstname,
                        email: email,
                    })
                }
            }
        }
    }

    getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // bodyPadding() {
    //     const header = document.getElementsByClassName("headerWrap")[0];
    //     if (header !== undefined) {
    //         const headerHeight = header.clientHeight
    //         document.getElementsByClassName("siteWrap")[0].style.paddingTop = `${headerHeight}px`
    //     }
    // }

    detectAnchorLinks() {
        const header = document.getElementById('siteHeader')
        const hash = window.location.hash.substr(1)
        let headerHeight = 0
        if (header) {
            headerHeight = header.offsetHeight
        }

        // On load
        if (hash !== "") {
            const node = document.getElementById(hash)
            if (node) {
                setTimeout(() => {
                    scrollToElement(node, {
                        offset: - headerHeight,
                        duration: 500
                    });
                }, 1000);
            }
        }

        // On click
        // Grab all links with hash
        const links = document.querySelectorAll('a[href*="#"]');

        // Loop links
        links && Array.prototype.forEach.call(links, link => {
            const id = link.href && link.href.split('#')[1]
            const node = document.getElementById(id)

            if (node) {
                // Add event listener to each
                link.addEventListener("click", function (e) {
                    e.preventDefault();
                    scrollToElement(node, {
                        offset: - headerHeight,
                        duration: 500
                    });
                });
            } 
        })
    }

	render() {
        const contextValue = {
            currentLanguage: this.props.language,
            defaultLanguage: this.props.defaultLanguage
        }

        const theme = this.props.data.allWp.edges[0].node[this.props.language.code].acfOptions.theme === "summer" ? themeSummer : themeWinter

		return(
            <LanguageContext.Provider value={contextValue}>
                <ThemeProvider theme={theme}>
                    <>
                        <Seo 
                            seo={this.props.seo} 
                            path={this.props.path} 
                            language={this.props.language} 
                            translations={this.props.translations}
                        />
                        <GlobalStyles />
                        <SiteWrap className={classNames({ 
                            siteWrap: true,
                            touch: isTouchDevice(),
                            noPadding: !this.props.header 
                        })}>
                            {this.props.header && 
                                <Header 
                                    // translations={this.props.translations} 
                                    path={this.props.path}
                                />
                            }
                            {this.props.social && 
                                <SocialGlobal />
                            }
                            <main>{this.props.children}</main>
                            {this.props.footer && 
                                <Footer
                                    hideSignup={this.props.hideSignup}
                                    hideSocial={this.props.hideSocial}
                                />
                            }
                        </SiteWrap>
                    </>
                </ThemeProvider>
            </LanguageContext.Provider>
		)
	}
}

const LayoutExport = (props) => (
    <StaticQuery
        query={graphql`
            query {
                allWp {
                    edges {
                        node {
                            defaultLanguage {
                                slug
                                name
                                code
                            }
                            ...optionsFragment
                        }
                    }
                }
            }
        `}
        render={data => <Layout defaultLanguage={data.allWp.edges[0].node.defaultLanguage} data={data} {...props} />}
    />
)

Layout.defaultProps = {
    header: true,
    footer: true,
    social: true,
    hideSignup: "no",
    hideSocial: "no"
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default LayoutExport