import { graphql } from "gatsby"

export const defaultTemplateQuery = graphql`
fragment defaultTemplateQuery on WpPage {
  acfFlexibleContent {
    blocks {
      __typename
      ... on WpPage_Acfflexiblecontent_Blocks_HeroCarousel {
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
      ... on WpPage_Acfflexiblecontent_Blocks_TextFullWidth {
        text
        width
        padding
      }
      ... on WpPage_Acfflexiblecontent_Blocks_ImageWithText {
        anchorId
        imagePosition
        padding
        image {
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
        text
        links {
          __typename
          ... on WpPage_Acfflexiblecontent_Blocks_ImageWithText_Links_Link {
            link {
              title
              url
              target
            }
          }
          ... on WpPage_Acfflexiblecontent_Blocks_ImageWithText_Links_File {
            linkText
            file {
              mediaItemUrl
            }
          }
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_LinkBlocks {
        block1 {
          ... on WpSidebarBlock {
            ...sidebarBlockFragment
          }
        }
        block2 {
          ... on WpSidebarBlock {
            ...sidebarBlockFragment
          }
        }
        block3 {
          ... on WpSidebarBlock {
            ...sidebarBlockFragment
          }
        }
        block4 {
          ... on WpSidebarBlock {
            ...sidebarBlockFragment
          }
        }
        block5 {
          text
          link {
            title
            url
            target
          }
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_NewsCarousel {
        title
        background
        borderOnHover
        button {
          url
          title
          target
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_WhosHere {
        title
        restaurants {
          ... on WpRestaurant {
            nodeType
            databaseId
            title
            uri
            slug
            acfTastePageSettings {
              type
            }
            acfRestaurantChef {
              squareFeaturedImage {
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
        chefs {
          ... on WpChef {
            nodeType
            databaseId
            title
            uri
            slug
            acfTastePageSettings {
              type
            }
            acfRestaurantChef {
              squareFeaturedImage {
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
      ... on WpPage_Acfflexiblecontent_Blocks_Carousel {
        title
        background
        borderOnHover
        columns
        items {
          __typename
          ... on WpRestaurant {
            title
            uri
            slug
            acfTastePageSettings {
              type
              featuredImage45 {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
                srcSet
              }
              excerpt
              popupTitle
              popupText
              popupCtaLink {
                url
                title
                target
              }
              popupFacebook
              popupTwitter
              popupInstagram
              popupWebsiteLink
              popupGallery {
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
            acfUrgencyLabel {
              label {
                ... on WpUrgencyLabel {
                  acfUrgencyLabels {
                    text
                  }
                }
              }
            }
          }
          ... on WpTastemenu {
            title
            uri
            slug
            acfTastePageSettings {
              type
              featuredImage45 {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
                srcSet
              }
              excerpt
              popupTitle
              popupText
              popupCtaLink {
                url
                title
                target
              }
              popupFacebook
              popupTwitter
              popupInstagram
              popupWebsiteLink
              popupGallery {
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
          ... on WpChef {
            title
            uri
            slug
            acfTastePageSettings {
              type
              featuredImage45 {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
                srcSet
              }
              excerpt
              popupTitle
              popupText
              popupCtaLink {
                url
                title
                target
              }
              popupFacebook
              popupTwitter
              popupInstagram
              popupWebsiteLink
              popupGallery {
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
            acfUrgencyLabel {
              label {
                ... on WpUrgencyLabel {
                  title
                }
              }
            }
          }
          ... on WpRecipe {
            title
            uri
            slug
            acfTastePageSettings {
              type
              featuredImage45 {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
                srcSet
              }
              excerpt
              popupTitle
              popupText
              popupCtaLink {
                url
                title
                target
              }
              popupFacebook
              popupTwitter
              popupInstagram
              popupWebsiteLink
              popupGallery {
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
            acfUrgencyLabel {
              label {
                ... on WpUrgencyLabel {
                  acfUrgencyLabels {
                    text
                  }
                }
              }
            }
          }
          ... on WpThingtodo {
            title
            uri
            slug
            acfTastePageSettings {
              type
              featuredImage45 {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
                srcSet
              }
              excerpt
              popupTitle
              popupText
              popupCtaLink {
                url
                title
                target
              }
              popupFacebook
              popupTwitter
              popupInstagram
              popupWebsiteLink
              popupGallery {
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
            }
            acfUrgencyLabel {
              label {
                ... on WpUrgencyLabel {
                  acfUrgencyLabels {
                    text
                  }
                }
              }
            }
          }
          ... on WpArtisanproducer {
            title
            uri
            slug
            acfTastePageSettings {
              type
              featuredImage45 {
                altText
                sourceUrl
                mediaDetails {
                  height
                  width
                }
                srcSet
              }
              excerpt
              popupTitle
              popupText
              popupCtaLink {
                url
                title
                target
              }
              popupFacebook
              popupTwitter
              popupInstagram
              popupWebsiteLink
              popupGallery {
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
            acfUrgencyLabel {
              label {
                ... on WpUrgencyLabel {
                  acfUrgencyLabels {
                    text
                  }
                }
              }
            }
          }
        }
        link {
          url
          title
          target
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_HorizontalImageWithText {
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
      ... on WpPage_Acfflexiblecontent_Blocks_CtaWithBackgroundImage {
        text
        title
        imageDesktop {
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
        link {
          target
          title
          url
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_Faqs {
        section {
          title
          faqs {
              question
              answer
          }
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_ColumnedImageWithText {
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
            url
            title
          }
        }
        link {
          target
          title
          url
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_Listing {
        listing
        filter1
        filter1Name
        filter1Label
        filter2
        filter2Name
        filter2Label
      }
      ... on WpPage_Acfflexiblecontent_Blocks_Partners {
        sections {
          title
          logos {
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
            lineBreak
          }
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_Operators {
        operators {
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
          lineBreak
          text
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_Testimonials {
        overrideDefaults
        title
        subtitle
        testimonials {
          testimonial
          logo {
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
      ... on WpPage_Acfflexiblecontent_Blocks_GalleryMasonry {
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
          #   publicURL
          #   childImageSharp {
          #     gatsbyImageData(width: 1600, quality: 90, placeholder: NONE, layout: CONSTRAINED)
          #   }
          #   resize: childImageSharp {
          #     gatsbyImageData(width: 345, quality: 90, placeholder: NONE, layout: CONSTRAINED)
          #   }
          # }
        }
        link {
          target
          title
          url  
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_Galleries {
        title
        background
        galleries {
          ... on WpGallery {
            id
            title
            acfGalleries {
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
                #   publicURL
                #   childImageSharp {
                #     gatsbyImageData(width: 1600, quality: 90, placeholder: NONE, layout: CONSTRAINED)
                #   }
                #   resize: childImageSharp {
                #     gatsbyImageData(width: 345, quality: 90, placeholder: NONE, layout: CONSTRAINED)
                #   }
                # }
              }
            }
          }
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_TheresMore {
        block {
          ... on WpTheresMoreItem {
            id
            acfTheresMore {
              title
              items {
                image {
                  altText
                  sourceUrl
                  mediaDetails {
                    height
                    width
                  }
                  srcSet
                }
                title
                link {
                  title
                  url
                  target
                }
              }
            }
          }
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_Tickets {
        displayIncludes
        displayBackground
        bottomLink {
          url
          target
          title
        }
        tickets {
          ... on WpTicket {
            title
            acfTickets {
              description
              prices {
                session
                price
                subtitle
                link {
                  url
                  title
                  target
                }
              }
              highlight
              links {
                __typename
                ... on WpTicket_Acftickets_Links_UrlLink {
                  link {
                    url
                    title
                    target
                  }
                }
                ... on WpTicket_Acftickets_Links_PdfDownload {
                  buttonText
                  file {
                    localFile {
                      publicURL
                    }
                  }
                }
              }  
              packageDetailsTitle
              accordion {
                text
                tooltip
              }
            }
          }
        }
      }
      ... on WpPage_Acfflexiblecontent_Blocks_VideoBlock {
        title
        video
      }
      ... on WpPage_Acfflexiblecontent_Blocks_Schedule {
        weeks {
          ... on WpSchedule {
            title
            acfSchedule {
              day {
                date
                dayShortName
                eventGroup {
                  title
                  events {
                    name
                    description
                    timingsTitle
                    timings {
                      time
                      title
                    }
                    eventLink {
                      url
                      title
                      target
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  acfFooterSettings {
    hideNewsletterSignUp
    hideSocialFollowUs
  }
}
`;