import React from "react"
import { graphql } from "gatsby"
import Layout from "components/Layout/Layout"
import FeaturedLayout from "components/FeaturedLayout/FeaturedLayout"

const FeaturedTemplate = (props) =>  {
    const data = props.data.wpPage
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
            <FeaturedLayout data={data} googleAdsSidebar={googleAdsSidebar} breadcrumbs={false} />
        </Layout>
    )
}

export const featuredPageQuery = graphql`
query($id: String!) {
    wpPage(id: {eq: $id}) {
        id
        title
        uri
        seo {
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
        acfGoogleAds {
            bellybandName
        }
        acfGoogleAdsSidebar {
            sidebarMpus {
                type
                name
            }
        }
        ...featuredTemplateQuery
    }
}
`

export default FeaturedTemplate