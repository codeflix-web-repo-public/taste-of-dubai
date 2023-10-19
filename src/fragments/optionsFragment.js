import { graphql } from "gatsby"

export const optionsFragment = graphql`fragment optionsFragment on Wp {
  EN: optionsEn {
    acfOptions {
      theme
      googleAdsAccountId
      globalSidebarMpus { 
          type
          name
      }
      restaurantLandingPage {
        url
      }
      chefLandingPage {
        url
      }
      page404 {
        ...on WpPage {
          uri
          seo {
              metaKeywords
              metaDesc
              title
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
      countdownText
      headerCountdown
      displayCountdown
      bookTicketsUrl {
        url
        title
        target
      }
      headerAnnouncementText
      footerSponserTitle
      footerSponserLogos {
        url
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
      socialFacebookGlobal
      socialTwitterGlobal
      socialInstagramGlobal
      socialYoutubeGlobal
      socialTiktokGlobal
      footerText
      blockTestimonials {
        defaultSubtitle
        defaultTitle
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
      blockSocialImages {
        title
        image1 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        image2 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        image3 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        image4 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        image5 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        image6 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        image7 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        image8 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        image9 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        image10 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        image11 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        image12 {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
      }
      blockNewsletterSignup {
        title
        text
        termsText
        buttonText
        successText
        backgroundImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        backgroundImageMobile {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
          srcSet
        }
        segmentTrackingName
      }
    }
  }
}
`;