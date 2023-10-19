import React from "react"
import { graphql } from "gatsby"
import Layout from "components/Layout/Layout"
import FeaturedLayout from "components/FeaturedLayout/FeaturedLayout"

const NewsArticleTemplate = (props) =>  {
    const data = props.data.wpNewsArticle
    const googleAds = data.acfGoogleAds
    const googleAdsSidebar = data.acfGoogleAdsSidebar
    return (
        <Layout 
            path={data.uri} 
            seo={data.seo} 
            language={data.language} 
            translations={data.translations}
            googleAds={googleAds}
            hideSignup={data.acfFooterSettings.hideNewsletterSignUp}
            hideSocial={data.acfFooterSettings.hideSocialFollowUs}
        >
            <FeaturedLayout data={data} googleAdsSidebar={googleAdsSidebar} type="News" uri={data.uri} />
        </Layout>
    )
}

export const newsArticleQuery = graphql`
query($id: String!) {
    wpNewsArticle(id: {eq: $id}) {
        id
        title
        uri
        date(formatString: "MMMM DD, Y")
        seo {
            metaKeywords
            metaDesc
            title
            breadcrumbs {
                text
                url
            }
        }
        language {
            code
            name
            slug
        }
        translations {
            uri
            language {
                code
                name
                slug
            }
        }
        ...newsArticleTemplateQuery
    }
}
`

export default NewsArticleTemplate