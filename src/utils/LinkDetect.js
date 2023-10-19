import { useStaticQuery, graphql } from "gatsby"

// Helper function to return link type and url
const LinkDetect = (url) => {

    const data = useStaticQuery(
        graphql`
        query {
            allWp {
                edges {
                    node {
                        allSettings {
                            generalSettingsUrl
                        }
                    }
                }
            }
            allFile {
                edges {
                    node {
                        publicURL
                    }
                }
            }
        }
    `)

    const stripProtocol = (url) => {
        let urlStripped = url.replace("https://", "")
        urlStripped = urlStripped.replace("http://", "")
        urlStripped = urlStripped.replace("www.", "")
        urlStripped = urlStripped.replace("cms.", "")
        urlStripped = urlStripped.replace("cms-staging.", "")
        return urlStripped
    } 
    // https://help.london.tastefestivals.com
    const link = []
    const urlStripped = stripProtocol(url) // help.london.tastefestivals.com
    const wpUrlStripped = stripProtocol(data.allWp.edges[0].node.allSettings.generalSettingsUrl) // london.tastefestivals.com

    // check if internal link
    // && (urlStripped.indexOf(wpUrlStripped) > -1 )
    if (urlStripped.includes("wp-content/uploads")) {
        // convert cms media link into local gatsby file link
        const fileName = urlStripped.split("/").pop()

        const file = data.allFile?.edges.filter(f => {
            return f.node.publicURL.includes(fileName)
        })

        link.type = "internal"
        link.url = file[0] ? file[0].node.publicURL : urlStripped.replace(wpUrlStripped, '')
    } else {
        if (
            url.indexOf("cms.") > -1 || // coming from cms
            url.indexOf("cms-staging.") > -1 || // coming from cms
            url.substring(0, 1) === "#" || // hash url
            url.substring(0, 1) === "/" // WP uri or hardcoded url
        ) {
            link.type = "internal"
            link.url = urlStripped.replace(wpUrlStripped, '')
        } else {
            link.type = "external"
            link.url = url
        }
    }

    return link
}

export { LinkDetect }