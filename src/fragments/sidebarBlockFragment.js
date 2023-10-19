import { graphql } from "gatsby"

export const defaultTemplateQuery = graphql`fragment sidebarBlockFragment on WpSidebarBlock {
    title
    acfSidebarBlocks {
        sidebarBlockType {
            __typename
            ... on WpSidebarBlock_Acfsidebarblocks_SidebarBlockType_ImageLink {
                image {
                    altText
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                    srcSet
                }
                image45 {
                    altText
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                    srcSet
                }
                links {
                    __typename
                    ... on WpSidebarBlock_Acfsidebarblocks_SidebarBlockType_ImageLink_Links_Link {
                        link {
                            title
                            url
                            target
                        }
                    }
                    ... on WpSidebarBlock_Acfsidebarblocks_SidebarBlockType_ImageLink_Links_File {
                        linkText
                        file {
                            localFile {
                                publicURL
                            }
                        }
                    }
                }
            }
        }
    }
}`;