// import React, { Component } from "react"
// import { StaticQuery, graphql } from "gatsby"
// import { Container } from "reactstrap"
// import styled from 'styled-components'
// import Cookies from "js-cookie"
// import { media } from "utils/Media"
// import Button from "components/shared/Button"

// const CookieWrap = styled(Container)`
//     background-color: ${props => props.theme.colors.black};
//     width: 100%;
//     display: none;
//     position: fixed;
//     bottom: 0;
//     z-index: 101;
//     left: 0;
//     padding-right: 3rem;
// `

// const CookieContainer = styled(Container)`
//     text-align: center;
//     padding: .5rem 0;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-wrap: wrap;
//     position: relative;
//     font-size: .88rem;

//     @media ${media.md} {
//         text-align: left;
//         flex-wrap: nowrap;
//     }
// `

// const Close = styled.button`
//     position: absolute;
//     background: 0;
//     right: 1rem;
//     top: .5rem;
//     border: 0;
//     padding: 0;

//     @media ${media.md} {
//         top: 50%;
//         transform: translateY(-50%);
//     }

//     .icon {
//         color: ${props => props.theme.colors.white};
//         display: block;
//         font-size: 1.5rem;
//         line-height: .7;
//     }
// `

// const Content = styled.div`
//     color: white;
//     a {
//         color: ${props => props.theme.colors.white};
//         font-family: ${props => props.theme.font.family.bold};
//         text-decoration: underline;
//     }
// `

// class HeaderCookieConsent extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             cookies: "d-none"
//         }
//         this.acceptCookies = this.acceptCookies.bind(this)
//     }

//     componentDidMount() {
//         if (Cookies.get('cookies') !== '1' || Cookies.get('cookies') === undefined) {
//             this.setState({
//                 cookies: "d-block"
//             })
//         }
//     }

//     acceptCookies() {
//         Cookies.set('cookies', '1', { expires: 365, path: '/' });
//         this.setState({
//             cookies: "d-none"
//         })
//     }

//     render() {
//         return (
//             <CookieWrap fluid className={this.state.cookies}>
//                 <CookieContainer>
//                     <Content dangerouslySetInnerHTML={{ __html: this.props.message }} />
//                     <div className="mt-2 mt-md-0 ml-md-3">
//                         <Button href="#" onClick={this.acceptCookies} color="white" small>Accept all cookies</Button>
//                     </div>
//                 </CookieContainer>
//                 <Close onClick={this.acceptCookies}>
//                     <span className="icon icon-close"></span>
//                 </Close>
//             </CookieWrap>
//         )
//     }
// }

// export default () => (
//     <StaticQuery
//         query={graphql`
//             query {
//                 allWp {
//                     edges {
//                         node {
//                             options {
//                                 acfOptions {
//                                     headerCookieConsentText
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         `}
//         render={data => {
//             if (data.allWp.edges[0].node.options.acfOptions.headerCookieConsentText) {
//                 return (
//                     <HeaderCookieConsent message={data.allWp.edges[0].node.options.acfOptions.headerCookieConsentText} />
//                 )
//             } else return ""
//         }}
//     />
// )