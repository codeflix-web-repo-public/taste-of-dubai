import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { decode } from "html-entities"
// import shareImage from "images/favicon.jpg"

function Seo(props) {
    const { title, metaDesc, metaKeywords } = props.seo
    const lang = props.language && props.language.slug
    const dir = props.language && props.language.code === "AR" ? "rtl" : "ltr"

    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        siteUrl
                    }
                }
            }
        `
    )

    const metaDescription = decode(metaDesc) || site.siteMetadata.description
    const metaTitle = decode(title) || site.siteMetadata.title
    const metaUrl = site.siteMetadata.siteUrl+props.path
    const metaImage = site.siteMetadata.siteUrl+"/taste-share-1200x630.jpg"
    const twitterImage = site.siteMetadata.siteUrl+"/taste-share-1080x1080.jpg"

    // Loop translations create hreflangs
    const hrefLangAlts = props.translations && props.translations.map((translation, i) => {
        return(
            <link 
                rel="alternate" 
                hreflang={translation.language.slug} 
                href={`${site.siteMetadata.siteUrl}${translation.uri}`} 
                key={i}
            />
        )
    })
    
    return (
        <Helmet
            htmlAttributes={{
                lang,
                dir
            }}
            title={metaTitle}
        >
            <script type="application/ld+json">{`
                {
                    "@context": "https://schema.org/",
                    "@type": "WebSite",
                    "name": "${site.siteMetadata.title}",
                    "url": "${process.env.GATSBY_FRONTEND_URL}"
                }
            `}
            </script>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={metaImage} />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:creator" content={site.siteMetadata.author} />
            <meta property="twitter:title" content={metaTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={twitterImage} />
            {hrefLangAlts}
        </Helmet>
    )
}

Seo.defaultProps = {
    language: {
        code: "EN",
        name: "English",
        slug: "en"
    },
    seo: {},
    path: ``
}

Seo.propTypes = {
    seo: PropTypes.object,
    path: PropTypes.string,
    language: PropTypes.object
}

export default Seo