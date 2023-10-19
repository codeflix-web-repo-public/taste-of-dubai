import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import logo from "images/logo.svg"

const Logo = () => {
    const data = useStaticQuery(graphql`
        query HeaderQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)
    
    return(
        <div style={{ display: "inline-block" }}>
            <img src={logo} alt={data.site.siteMetadata.title} />
        </div>
    )
}

export default Logo
