import React from "react"
import { graphql } from "gatsby"
import Layout from "components/Layout/Layout"
import FeaturedLayout from "components/FeaturedLayout/FeaturedLayout"

const ChefTemplate = (props) =>  {
    const data = props.data.wpChef
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
            <FeaturedLayout data={data} googleAdsSidebar={googleAdsSidebar} />
        </Layout>
    )
}

export const chefQuery = graphql`
query($id: String!) {
    wpChef(id: {eq: $id}) {
        id
        title
        uri
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
        ...chefTemplateQuery
    }
}
`

export default ChefTemplate