import { graphql } from "gatsby"

export const featuredTemplateQuery = graphql`
fragment featuredTemplateQuery on WpPage {
    acfFeatureArticle {
        slides {
            imageDesktop {
                altText
                sourceUrl
                mediaDetails {
                    height
                    width
                }
                srcSet
            }
            imageTablet {
                altText
                sourceUrl
                mediaDetails {
                    height
                    width
                }
                srcSet
            }
            imageMobile {
                altText
                sourceUrl
                mediaDetails {
                    height
                    width
                }
                srcSet
            }
            backgroundVideo
            subTitle
            title
            text
            link1 {
                url
                title
                target
            }
            link2 {
                url
                title
                target
            }
            linkVideo
        }
    }
    acfTwoColumnFlexibleContent {
        twoColumnBlocks {
            __typename
            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextBlock {
                text
            }
            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_VideoBlock {
                video
                caption
            }
            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageBlock {
                image {
                    caption
                    altText
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                    srcSet
                }
            }
            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock {
                faq {
                    question
                    answerContent {
                        __typename
                        ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock_faq_AnswerContent_TextAnswer {
                            text
                        }
                        ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock_faq_AnswerContent_VideoAnswer {
                            video
                        }
                        ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock_faq_AnswerContent_ImageAnswer {
                            image {
                                altText
                                sourceUrl
                                mediaDetails {
                                    height
                                    width
                                }
                                srcSet
                            }
                        }
                    }
                }
            }
            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactForm {
                nameHeading
                namePlaceholder
                telephoneHeading
                telephonePlaceholder
                enquiryHeading
                enquiryTypes {
                    name
                    email
                }
                emailHeading
                emailPlaceholder
                messageHeading
                messagePlaceholder
                submitText
                thankyouMessage
            }
            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_CompetitionForm {
                sendTo
                questionHeading
                questionPlaceholder
                nameHeading
                namePlaceholder
                emailHeading
                emailPlaceholder
                newsletterText
                newsletterHeading
                newsletterYesText
                newsletterNoText
                submitText
                thankyouMessage
            }
            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_GeneralTable {
                title
                tableWidth
                headingRow {
                    columnName
                    columnWidth
                }
                rows {
                    columns {
                        columnValue
                    }
                }
            }
            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageGrid {
                images {
                    image {
                        altText
                        sourceUrl
                        mediaDetails {
                            height
                            width
                        }
                        srcSet
                    }
                    url
                }
            }
            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ColumnedImageWithText {
                title
                blocks {
                    title
                    image {
                        altText
                        sourceUrl
                        mediaDetails {
                            height
                            width
                        }
                        srcSet
                    }
                    text
                    link {
                        target
                        title
                        url  
                    }
                }
                link {
                    target
                    title
                    url
                }
            }
            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_HorizontalImageWithText {
                title
                image {
                    altText
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                    srcSet
                }
                text
                link {
                    target
                    title
                    url  
                }
            }
            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryCarousel {
                title
                images {
                    caption
                    altText
                    sourceUrl
                    mediaDetails {
                        height
                        width
                        sizes {
                            name
                            width
                            sourceUrl
                        }
                    }
                    srcSet
                    # localFile {
                        #     publicURL
                        #     childImageSharp {
                            #         gatsbyImageData(width: 1600, quality: 90, placeholder: NONE, layout: CONSTRAINED)
                            #     }
                            #     resize: childImageSharp {
                                #         gatsbyImageData(width: 200, height: 200 quality: 90, placeholder: NONE, layout: CONSTRAINED)
                                #     }
                                # }
                            }
                        }
                        ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextWithPopupButton {
                            title
                            text
                            buttonText
                            popupTitle
                            popupText
                        }
                        ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryMasonry {
                            title
                            images {
                                caption
                                altText
                                sourceUrl
                                mediaDetails {
                                    height
                                    width
                                    sizes {
                                        name
                                        width
                                        sourceUrl
                                    }
                                }
                                srcSet
                                # localFile {
                                    #     publicURL
                                    #     childImageSharp {
                                        #         gatsbyImageData(width: 1600, quality: 90, placeholder: NONE, layout: CONSTRAINED)
                                        #     }
                                        #     resize: childImageSharp {
                                            #         gatsbyImageData(width: 472, quality: 90, placeholder: NONE, layout: CONSTRAINED)
                                            #     }
                                            # }
                                        }
                                    }
                                    ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_Menu {
                                        title
                                        menu {
                                            ... on WpTastemenu {
                                                title
                                                acfMenu {
                                                    items {
                                                        name
                                                        description
                                                        price
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder {
                                        sendTo
                                        googleSheetId
                                        emailSubject
                                        wpFields {
                                            __typename
                                            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Text {
                                                label
                                                name
                                                placeholder
                                                required
                                                size
                                            }
                                            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Dropdown {
                                                label
                                                name
                                                options {
                                                    label
                                                }
                                                placeholder
                                                required
                                            }
                                            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Checkboxes {
                                                label
                                                name
                                                options {
                                                    label
                                                }
                                                required
                                            }
                                            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_Radio {
                                                label
                                                name
                                                options {
                                                    label
                                                }
                                                required
                                            }
                                            ... on WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder_Fields_FileUpload {
                                                label
                                                name
                                                required
                                                requirements
                                            }
                                        }
                                        requiredFieldsText
                                        submitText
                                        thankYouMessage
                                    }
                                }	
                                sidebarCustomBlock {
                                    title
                                    text
                                    facebookLink
                                    twitterLink
                                    instagramLink
                                    websiteLink
                                    button {
                                        url
                                        title
                                        target
                                    }
                                } 
                                sidebar {
                                    ... on WpSidebarBlock {
                                        ...sidebarBlockFragment
                                    }
                                } 
                            }
                            acfFooterSettings {
                                hideNewsletterSignUp
                                hideSocialFollowUs
                            }
                        }
                        `;