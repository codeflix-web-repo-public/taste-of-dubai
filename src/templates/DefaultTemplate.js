import React from "react"
import { graphql } from "gatsby"
import Layout from "components/Layout/Layout"
import FlexibleContent from "components/FlexibleContent/FlexibleContent"

const DefaultTemplate = (props) =>  {
    const data = props.data.wpPage
    const acfBlocks = data.acfFlexibleContent.blocks

    return (
        <Layout 
            path={data.uri} 
            seo={data.seo} 
            language={data.language} 
            translations={data.translations}
            hideSignup={data.acfFooterSettings.hideNewsletterSignUp}
            hideSocial={data.acfFooterSettings.hideSocialFollowUs}
        >
            <FlexibleContent blocks={acfBlocks} />
        </Layout>
    )
}

export const pageQuery = graphql`
query($id: String!) {
    wpPage(id: {eq: $id}) {
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
        ...defaultTemplateQuery
    }
}
`

export default DefaultTemplate