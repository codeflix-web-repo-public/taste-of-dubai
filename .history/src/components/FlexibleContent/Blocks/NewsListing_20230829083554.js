import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"
import { Row, Col, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import { media } from "utils/Media"
import ContainerMax from "components/shared/ContainerMax"
import ContentMax from "components/shared/ContentMax"
import NewsPreview from "components/shared/NewsPreview"
import Button from "components/shared/Button"
import FilterDropdown from "components/shared/FilterDropdown"
import FilterBar from "components/shared/FilterBar"

const NewsListingWrap = styled.div`
	article {
		margin-bottom: 30px;

  		/* h2 {
  			font-size: ${props => props.theme.font.size.sm};
  			color: ${props => props.theme.colors.black};
			margin: 0;
            padding: 0;

            @media ${media.md} {
                font-size: ${props => props.theme.font.size.regular};
            }

			a {
				color: ${props => props.theme.colors.black};
			}

		  	a:hover {
				text-decoration: underline;
				color: ${props => props.theme.colors.primary};
		  	}
  		} */

  		p.date {
            font-size: ${props => props.theme.font.size.sm};
            color: ${props => props.theme.colors.black};
            margin: 0;
            display: none;

            @media ${media.md} {
                display: block;
            }
  		}

  		p.more {
  			text-transform: uppercase;
		    line-height: 1;
		    margin-top: 1rem;
            
		    a {
				font-family: ${props => props.theme.font.family.bold};
				font-size: ${props => props.theme.font.size.sm};
				color: ${props => props.theme.colors.primary};
				text-decoration: none;
		    }
  		}
	}
	.view-more {
	    text-align: center;
	    margin-top: 10px;
	    button {
	    	appearance: none;
	    	background: #fff;
	    	border: solid 1px #323741;
	    	height: 50px;
			line-height: 50px;
			padding: 0 40px;
			font-size: 0.875rem;/*14*/
		    font-family: ${props => props.theme.font.family.bold};
  			color: #323741;
  			text-transform: uppercase;
	    }
	}
`


const postsPerPage = 24;
class News extends Component {	

    constructor(props) {
        super(props);
        this.state = {
            paginationLimit: postsPerPage,
            filter: 0,
            filterText: "All"
        }
    }
  
    /**
     * Load the next page of articles
     */
    loadMore = (e) => {
        e.preventDefault()
        this.setState({
            paginationLimit: (this.state.paginationLimit+postsPerPage)
        })
    }
  
    /**
     * set the filter
     */
    setFilter = (databaseId, name) => {
        this.setState({
            filter: databaseId,
            filterText: name
        })
    }

    render() {
        return (
            <StaticQuery
                query={graphql`
                    {
                        allWpNewsArticle(
                            sort: {fields: date, order: DESC},
                            limit: 1000, filter: {status: {eq: "publish"}}
                        ) {
                            edges {
                                node {
                                    uri
                                    title
                                    date
                                    acfNews {
                                        hidePublishDate
                                        newsYoutube
                                        featuredImage45 {
                                            altText
                                            sourceUrl
                                            mediaDetails {
                                                height
                                                width
                                            }
                                            srcSet
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
                                    categories {
                                        nodes {
                                            name
                                            databaseId
                                        }
                                    }
                                }
                            }
                        }
                    }
                `}
                render={data => {
                    let posts = data.allWpNewsArticle.edges
                    var printedArticles = 0
                    let categories = []

                    //set categories for dropdown
                    posts && posts.forEach(({node}) => {
                        node.categories && node.categories.nodes.forEach(cat => {
                            categories[cat.databaseId] = cat
                        })
                    })

                    //filter posts by
                    if (this.state.filter !== 0) {
                        posts = posts && posts.filter(({node}) => {
                            const postCategories = node.categories && node.categories.nodes
                            return postCategories && postCategories.find(node => this.state.filter === node.databaseId)
                        })
                    }

                    return (
                        <ContainerMax className="py-4">
                            <ContentMax>
                                <NewsListingWrap>
                                    <FilterBar>
                                        <div className="filter-title">Filter by</div>
                                        <FilterDropdown>
                                            <DropdownToggle caret>
                                                {this.state.filterText}
                                                <FontAwesomeIcon icon={faAngleDown} />
                                            </DropdownToggle>
                                            
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => this.setFilter(0, "All")}>
                                                    All
                                                </DropdownItem>
                                                {categories && categories.map((cat, i) => {
                                                    return(
                                                        <DropdownItem key={i} onClick={() => this.setFilter(cat.databaseId, cat.name)}>
                                                            {cat.name}
                                                        </DropdownItem>
                                                    )
                                                })}
                                            </DropdownMenu>
                                        </FilterDropdown>
                                    </FilterBar>
                                
                                    <Row>
                                        {posts && posts.map((post, i) => {
                                            const articleType = post.node.acfNews.newsYoutube ? "video" : "news"
  
                                            if (this.state.paginationLimit > printedArticles) {
                                                printedArticles++;
                                                return (
                                                    <Col xs={12} sm={6} md={4} lg={3} key={i} className={`${articleType}`}>
                                                        <NewsPreview 
                                                            data={post} 
                                                            type="NewsListing"
                                                        />
                                                    </Col>
                                                )
                                            }
                                            return null;
                                        })}
                                    </Row>
                                
                                    <div className="view-more">
                                        {/*do we want to display the 'view more' button?*/}
                                        {this.state.paginationLimit < posts.length &&
                                            <Button href="#" onClick={(e) => this.loadMore(e)} color="black">
                                                <span>View More</span>
                                            </Button>
                                        }
                                    </div>
                                </NewsListingWrap>
                            </ContentMax>
                        </ContainerMax> 
                    )
                }}
            />
        )   
    }
}

export default News