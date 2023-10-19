import { createGlobalStyle, withTheme } from "styled-components"
import { media } from "utils/Media"
import fontFiles from "./Fonts";

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'AvertaRegular';
        src: url("${fontFiles.AvertaRegularWOFF2}") format('woff2'),
            url("${fontFiles.AvertaRegularWOFF}") format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'AvertaBold';
        src: url("${fontFiles.AvertaBoldWOFF2}") format('woff2'),
            url("${fontFiles.AvertaBoldWOFF}") format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'AvertaBlack';
        src: url("${fontFiles.AvertaBlackWOFF2}") format('woff2'),
            url("${fontFiles.AvertaBlackWOFF}") format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    html {
        &.nav-active, &.nav-active body {
            overflow: hidden;
            height: 100%;
            position: relative;
        }
    }

    body {
        font-family: ${props => props.theme.font.family.body};
        font-size: ${props => props.theme.font.size.md};
        line-height: ${props => props.theme.font.lineHeight.base};
        color: ${props => props.theme.colors.black};
        background-color: ${props => props.theme.colors.white};
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
        /* transition: ${props => props.theme.transitionBase}; */

        &.dropdown-filter-active {
            overflow: hidden;

            @media ${media.md} {
                overflow: visible;
            }

            main {
                position: relative;
                z-index: 1100;

                @media ${media.md} {
                    z-index: 1;
                }
            }
        }
    }

    body:not(.user-is-tabbing) button:focus,
    body:not(.user-is-tabbing) input:focus,
    body:not(.user-is-tabbing) select:focus,
    body:not(.user-is-tabbing) textarea:focus,
    body:not(.user-is-tabbing) div[role="button"]:focus {
        outline: none;
    }
    
    h1,
    h2,
    h3,
    h4,
    h5 {
        color: ${props => props.theme.colors.black};
        font-family: ${props => props.theme.font.family.black};
        line-height: ${props => props.theme.font.lineHeight.headings};
        margin-bottom: 1rem;
    }

    h6 {
        font-family: ${props => props.theme.font.family.bold};
    }

    h1, h2, h3 {
        font-family: ${props => props.theme.font.family.atp}; 
    }

    h1 {
        font-size: ${props => props.theme.font.h3.size};
        @media ${media.sm} {
            font-size: ${props => props.theme.font.h2.size};
        }
        @media ${media.md} {
            font-size: ${props => props.theme.font.h1.size};
        }
    }
    

    h2 {
        font-size: ${props => props.theme.font.h4.size};
        @media ${media.sm} {
            font-size: ${props => props.theme.font.h3.size};
        }
        @media ${media.md} {
            font-size: ${props => props.theme.font.h2.size};
        }
    }

    h3 {
        font-size: ${props => props.theme.font.h4.size};
        @media ${media.md} {
            font-size: ${props => props.theme.font.h3.size};
        }
    }

    h4 {
        font-size: ${props => props.theme.font.h4.size};
    }

    h5 {
        font-size: ${props => props.theme.font.h5.size};
    }

    h6 {
        font-size: ${props => props.theme.font.h6.size};
    }

    p {
        &:last-child {
            margin: 0;
        }
    }

    a {
        color: ${props => props.theme.colors.black};
        transition: color .4s ease;
        text-decoration: underline;
        text-decoration-color: ${props => props.theme.colors.primary};
        -webkit-text-decoration-color: ${props => props.theme.colors.primary};
        text-decoration-thickness: 2px;

        &:hover {
            color: ${props => props.theme.colors.primary}; 
            text-decoration: underline;
            text-decoration-color: ${props => props.theme.colors.primary};
            -webkit-text-decoration-color: ${props => props.theme.colors.primary};
            text-decoration-thickness: 2px;
        }
    }

    strong {
        font-weight: ${props => props.theme.font.weight.bold};
    }

    ul {
        padding-left: 20px;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    hr {
        border-color: ${props => props.theme.colors.quaternary};
        border-style: solid;
        margin: 1.5rem 0;
    }

    .modal-backdrop.show {
        opacity: 0.9;
        /* background-color: ${props => props.theme.colors.primary}; */
    }

    .modal-content {
        border-radius: 0;

        @media ${media.md} {
            padding: 1rem;
        }
        @media ${media.lg} {
            padding: 2rem;
        }
    }

    .d-xxl-block {
        @media ${media.xxl} {
            display: block !important;
        }
    }

    .d-xxl-none {
        @media ${media.xxl} {
            display: none !important;
        }
    }

    .LazyLoad, .lazyload-wrapper {
        width: 100%;
    }


    /* light gallery */
    .lg-backdrop {
        background-color: ${props => props.theme.colors.primary};
        
        &.in {
            opacity: .9;
        }
    }

    .lg-toolbar {
        background-color: rgba(0, 0, 0, 1);
    }

    .lg-outer {
        direction: ltr; /* rtl for AR break it */
    }
`;

export default withTheme(GlobalStyles);