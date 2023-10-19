const path = require(`path`)

// exports.sourceNodes = ({ actions }) => {
//     const { createTypes } = actions

//     const typeDefs = `
//         interface WpFeaturedTemplate implements Node {
//             id: ID!
//             title: String
//             uri: String!
//             acfTwoColumnFlexibleContent: [WpPage_Acftwocolumnflexiblecontent!]!
//         }

//         type WpPage implements Node & WpFeaturedTemplate {
//             id: ID!
//             title: String
//             uri: String!
//             acfTwoColumnFlexibleContent: [WpPage_Acftwocolumnflexiblecontent!]!
//         }

//         type WpRestaurant implements Node & WpFeaturedTemplate {
//             id: ID!
//             title: String
//             uri: String!
//             acfTwoColumnFlexibleContent: [WpPage_Acftwocolumnflexiblecontent!]!
//         }
//     `
//     createTypes(typeDefs)
// }

exports.createPages = async gatsbyUtilities => {
    // Query our posts from the GraphQL server
    const posts = await getNodes(gatsbyUtilities)
  
    // If there are no posts in WordPress, don't do anything
    if (!posts.length) {
      return
    }
  
    // If there are posts and pages, create Gatsby pages for them
    await createSinglePages({ posts, gatsbyUtilities })
  
    // And a paginated archive
    // await createBlogPostArchive({ posts, gatsbyUtilities })
}

const createSinglePages = async ({ posts, gatsbyUtilities }) => {
    const createAllPages = Promise.all(
            posts.map(({ post }) => {
            // createPage is an action passed to createPages
            // See https://www.gatsbyjs.com/docs/actions#createPage for more info

                switch (post.__typename) {
                    case "WpPage":
                        switch (post.template.templateName) {
                            case "Feature Article":
                                gatsbyUtilities.actions.createPage({
                                    path: decodeURIComponent(post.uri),
                                    component: path.resolve(`./src/templates/FeaturedTemplate.js`),
                                    context: {
                                        id: post.id,
                                    },
                                })
                                break;
                            default:
                                gatsbyUtilities.actions.createPage({
                                    path: decodeURIComponent(post.uri),
                                    component: path.resolve(`./src/templates/DefaultTemplate.js`),
                                    context: {
                                        id: post.id,
                                    },
                                })
                                break;
                        }

                        break;
                    default:
                        switch (post.__typename) {
                            case "WpRestaurant":
                                // Is this set to a page? if not skip
                                if (post.acfTastePageSettings.type === "page") {
                                    gatsbyUtilities.actions.createPage({
                                        path: decodeURIComponent(post.uri),
                                        component: path.resolve(`./src/templates/RestaurantTemplate.js`),
                                        context: {
                                            id: post.id,
                                        },
                                    })
                                }
                                break;
                            case "WpChef":
                                // Is this set to a page? if not skip
                                if (post.acfTastePageSettings.type === "page") {
                                    gatsbyUtilities.actions.createPage({
                                        path: decodeURIComponent(post.uri),
                                        component: path.resolve(`./src/templates/ChefTemplate.js`),
                                        context: {
                                            id: post.id,
                                        },
                                    })
                                }
                                break;
                            case "WpTastemenu":
                                // Is this set to a page? if not skip
                                if (post.acfTastePageSettings.type === "page") {
                                    gatsbyUtilities.actions.createPage({
                                        path: decodeURIComponent(post.uri),
                                        component: path.resolve(`./src/templates/MenuTemplate.js`),
                                        context: {
                                            id: post.id,
                                        },
                                    })
                                }
                                break;
                            case "WpRecipe":
                                // Is this set to a page? if not skip
                                if (post.acfTastePageSettings.type === "page") {
                                    gatsbyUtilities.actions.createPage({
                                        path: decodeURIComponent(post.uri),
                                        component: path.resolve(`./src/templates/RecipeTemplate.js`),
                                        context: {
                                            id: post.id,
                                        },
                                    })
                                }
                                break;
                            case "WpArtisanproducer":
                                // Is this set to a page? if not skip
                                if (post.acfTastePageSettings.type === "page") {
                                    gatsbyUtilities.actions.createPage({
                                        path: decodeURIComponent(post.uri),
                                        component: path.resolve(`./src/templates/ArtisanProducerTemplate.js`),
                                        context: {
                                            id: post.id,
                                        },
                                    })
                                }
                                break;
                            case "WpThingtodo":
                                // Is this set to a page? if not skip
                                if (post.acfTastePageSettings.type === "page") {
                                    gatsbyUtilities.actions.createPage({
                                        path: decodeURIComponent(post.uri),
                                        component: path.resolve(`./src/templates/ThingToDoTemplate.js`),
                                        context: {
                                            id: post.id,
                                        },
                                    })
                                }
                                break;
                            case "WpNewsArticle":
                                gatsbyUtilities.actions.createPage({
                                    path: decodeURIComponent(post.uri),
                                    component: path.resolve(`./src/templates/NewsTemplate.js`),
                                    context: {
                                        id: post.id,
                                    },
                                })
                                break;
                            default:
                                break;
                        }

                        break;
                }
            }
        )
    )

    if (createAllPages.errors) {
        gatsbyUtilities.reporter.panicOnBuild(
            `There was an error creating pages`,
            createAllPages.errors
        )
    }
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getNodes({ graphql, reporter }) {
    const graphqlResult = await graphql(/* GraphQL */ `
        query WpPages {
            # Query all WordPress blog posts sorted by date
            allWpPage(sort: { fields: [date], order: DESC }) {
                edges {
                    # note: this is a GraphQL alias. It renames "node" to "post" for this query
                    # We're doing this because this "node" is a post! It makes our code more readable further down the line.
                    post: node {
                        __typename
                        id
                        uri
                        template {
                            ... on WpDefaultTemplate {
                                templateName
                            }
                            ... on WpTemplate_FeatureArticle {
                                templateName
                            }
                        }
                    }
                }
            }
            allWpNewsArticle(sort: { fields: [date], order: DESC }) {
                edges {
                    # note: this is a GraphQL alias. It renames "node" to "post" for this query
                    # We're doing this because this "node" is a post! It makes our code more readable further down the line.
                    post: node {
                        __typename
                        id
                        uri
                    }
                }
            }
            allWpRestaurant(sort: { fields: [date], order: DESC }) {
                edges {
                    # note: this is a GraphQL alias. It renames "node" to "post" for this query
                    # We're doing this because this "node" is a post! It makes our code more readable further down the line.
                    post: node {
                        __typename
                        id
                        uri
                        acfTastePageSettings {
                            type
                        }
                    }
                }
            }
            allWpChef(sort: { fields: [date], order: DESC }) {
                edges {
                    # note: this is a GraphQL alias. It renames "node" to "post" for this query
                    # We're doing this because this "node" is a post! It makes our code more readable further down the line.
                    post: node {
                        __typename
                        id
                        uri
                        acfTastePageSettings {
                            type
                        }
                    }
                }
            }
            allWpTastemenu(sort: { fields: [date], order: DESC }) {
                edges {
                    # note: this is a GraphQL alias. It renames "node" to "post" for this query
                    # We're doing this because this "node" is a post! It makes our code more readable further down the line.
                    post: node {
                        __typename
                        id
                        uri
                        acfTastePageSettings {
                            type
                        }
                    }
                }
            }
            allWpRecipe(sort: { fields: [date], order: DESC }) {
                edges {
                    # note: this is a GraphQL alias. It renames "node" to "post" for this query
                    # We're doing this because this "node" is a post! It makes our code more readable further down the line.
                    post: node {
                        __typename
                        id
                        uri
                        acfTastePageSettings {
                            type
                        }
                    }
                }
            }
            allWpArtisanproducer(sort: { fields: [date], order: DESC }) {
                edges {
                    # note: this is a GraphQL alias. It renames "node" to "post" for this query
                    # We're doing this because this "node" is a post! It makes our code more readable further down the line.
                    post: node {
                        __typename
                        id
                        uri
                        acfTastePageSettings {
                            type
                        }
                    }
                }
            }
            allWpThingtodo(sort: { fields: [date], order: DESC }) {
                edges {
                    # note: this is a GraphQL alias. It renames "node" to "post" for this query
                    # We're doing this because this "node" is a post! It makes our code more readable further down the line.
                    post: node {
                        __typename
                        id
                        uri
                        acfTastePageSettings {
                            type
                        }
                    }
                }
            }
        }
    `)
  
    if (graphqlResult.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            graphqlResult.errors
        )
        return
    }
  
    return [
        ...graphqlResult.data.allWpPage.edges,
        ...graphqlResult.data.allWpNewsArticle.edges,
        ...graphqlResult.data.allWpRestaurant.edges,
        ...graphqlResult.data.allWpChef.edges,
        ...graphqlResult.data.allWpRecipe.edges,
        ...graphqlResult.data.allWpTastemenu.edges,
        ...graphqlResult.data.allWpArtisanproducer.edges,
        ...graphqlResult.data.allWpThingtodo.edges,
    ]
}