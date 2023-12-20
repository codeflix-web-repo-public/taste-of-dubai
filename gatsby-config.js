let activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "production";

console.log(`Using environment config: '${activeEnv}'`);

require("dotenv").config({
	path: `.env.${activeEnv}`,
});


module.exports = {
	siteMetadata: {
		title: `Taste of Dubai Festival`,
		description: `Dubai’s Ultimate Celebration of Food, Drink and Music returns! March 1 - 3 2024`,
		author: `Dewynters`,
		siteUrl: process.env.GATSBY_FRONTEND_URL
	},
	plugins: [
		`gatsby-plugin-netlify`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-resolve-src`,
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-catch-links`,
		`gatsby-plugin-gdpr-cookies`,
		`gatsby-plugin-google-gtag`,
		`gatsby-cookie-notice`,
{
		resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-WFH7PYNGJ6', // Google Analytics / GA
          "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Defaults to https://www.googletagmanager.com
          origin: "YOUR_SELF_HOSTED_ORIGIN",
          // Delays processing pageview events on route update (in milliseconds)
          delayOnRouteUpdate: 0,
        },
      },
	},
		{
			resolve: `gatsby-plugin-sass`,
			sassOptions: {
				precision: 8
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl: process.env.GATSBY_FRONTEND_URL
			},
		},
		{
			resolve: `gatsby-source-wordpress`,
			options: {
				url: process.env.WPGRAPHQL_URL,
				// verbose: true,
				// develop: {
				// 	hardCacheMediaFiles: true,
				// 	nodeUpdateInterval: 5000
				// },
				// debug: {
				// 	graphql: {
				// 		writeQueriesToDisk: true,
				// 	},
				// },
				// schema: {
				// 	perPage: process.env.PER_PAGE,
				// 	requestConcurrency: 10,
				// 	timeout: 90000,
				// },
				type: {
					MediaItem: {
						localFile: {
							// requestConcurrency: 1,
							maxFileSizeBytes: 40485760, // 40Mb
						},
					},
				},
				// auth: {
				// 	htaccess: {
				// 		username: process.env.CMS_HTTP_USERNAME,
				// 			password: process.env.CMS_HTTP_PASSWORD,
				// 	},
				// },
			},
		},
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Taste London`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#F4214F`,
				theme_color: `#000000`,
				display: `minimal-ui`,
				icon: `src/images/taste-favicon-512x512.png`, // This path is relative to the root of the site.
			},
		},
		{
			resolve: `gatsby-plugin-segment-js`,
			options: {
				// your segment write key for your production environment
				// when process.env.NODE_ENV === 'production'

				// required; non-empty string
				prodKey: process.env.SEGMENT_KEY,

				// if you have a development env for your segment account, paste that key here
				// when process.env.NODE_ENV === 'development'
				// optional; non-empty string
				devKey: `Mc6PymaG3bwCTBB89hLhUuLxaafz6dQp`,

				// boolean (defaults to false) on whether you want
				// to include analytics.page() automatically
				// if false, see below on how to track pageviews manually
				trackPage: true,

				// number (defaults to 50); time to wait after a route update before it should
				// track the page change, to implement this, make sure your `trackPage` property is set to `true`
				trackPageDelay: 50,

				// If you need to proxy events through a custom endpoint,
				// add a `host` property (defaults to https://cdn.segment.io)
				// Segment docs:
				//   - https://segment.com/docs/connections/sources/custom-domains
				//   - https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#proxy
				// host: `https://override-segment-endpoint`,

				// boolean (defaults to false); whether to delay load Segment
				// ADVANCED FEATURE: only use if you leverage client-side routing (ie, Gatsby <Link>)
				// This feature will force Segment to load _after_ either a page routing change
				// or user scroll, whichever comes first. This delay time is controlled by
				// `delayLoadTime` setting. This feature is used to help improve your website's
				// TTI (for SEO, UX, etc).  See links below for more info.
				// NOTE: But if you are using server-side routing and enable this feature,
				// Segment will never load (because although client-side routing does not do
				// a full page refresh, server-side routing does, thereby preventing Segment
				// from ever loading).
				// See here for more context:
				// GIF: https://github.com/benjaminhoffman/gatsby-plugin-segment-js/pull/19#issuecomment-559569483
				// TTI: https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md#performance
				// Problem/solution: https://marketingexamples.com/seo/performance
				delayLoad: false,

				// number (default to 1000); time to wait after scroll or route change
				// To be used when `delayLoad` is set to `true`
				delayLoadTime: 1000,

				// Whether to completely skip calling `analytics.load()`.
				// ADVANCED FEATURE: only use if you are calling `analytics.load()` manually
				// elsewhere in your code or are using a library
				// like: https://github.com/segmentio/consent-manager that will call it for you.
				// Useful for only loading the tracking script once a user has opted in to being tracked, for example.
				manualLoad: false
			}
		},
		
		{
			resolve: "gatsby-plugin-google-tagmanager",
			options: {
				id: "GTM-56RVBPGG",

				// Include GTM in development.
				// Defaults to false meaning GTM will only be loaded in production.
				includeInDevelopment: false,

				// datalayer to be set before GTM is loaded
				// should be an object or a function that is executed in the browser
				// Defaults to null
				defaultDataLayer: { platform: "gatsby" },
			},
		},
{
			resolve: 'gatsby-plugin-robots-txt',
			options: {
				host: process.env.GATSBY_FRONTEND_URL,
				sitemap: `${process.env.GATSBY_FRONTEND_URL}/sitemap/sitemap-index.xml`,
				env: {
					development: {
						policy: [{ userAgent: '*', disallow: ['/'] }]
					},
					staging: {
						policy: [{ userAgent: '*', disallow: ['/'] }]
					},
					production: {
						policy: [{ userAgent: '*', allow: '/' }]
					}
				}
			}
		},
		'gatsby-plugin-remove-serviceworker',
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
{
	resolve: `gatsby-plugin-gdpr-cookies`,
	options: {
	  googleAnalytics: {
		trackingId: 'G-WFH7PYNGJ6', // leave empty if you want to disable the tracker
		cookieName: 'gatsby-gdpr-google-analytics', // default
		anonymize: true, // default
		allowAdFeatures: false // default
	  },
	  googleTagManager: {
		trackingId: 'GTM-56RVBPGG', // leave empty if you want to disable the tracker
		cookieName: 'gatsby-gdpr-google-tagmanager', // default
		dataLayerName: 'dataLayer', // default
	  },
	  facebookPixel: {
		pixelId: 'YOUR_FACEBOOK_PIXEL_ID', // leave empty if you want to disable the tracker
		cookieName: 'gatsby-gdpr-facebook-pixel', // default
	  },
	  tikTokPixel: {
		pixelId: 'YOUR_TIKTOK_PIXEL_ID', // leave empty if you want to disable the tracker
		cookieName: 'gatsby-gdpr-tiktok-pixel', // default
	  },
	  hotjar: {
		hjid: 'YOUR_HOTJAR_ID',
		hjsv: 'YOUR_HOTJAR_SNIPPET_VERSION',
		cookieName: 'gatsby-gdpr-hotjar', // default
	  },
	  linkedin: {
		trackingId: 'YOUR_LINKEDIN_TRACKING_ID', // leave empty if you want to disable the tracker
		cookieName: 'gatsby-gdpr-linked-in', // default
	  },
	  // defines the environments where the tracking should be available  - default is ["production"]
	  environments: ['production', 'development']	
  },
},
	],
}