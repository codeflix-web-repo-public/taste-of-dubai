import React, { Component, useContext } from "react"
import styled from "styled-components"
import { Row, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import CustomImage from "components/shared/CustomImage"
import { StaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { media } from "utils/Media"
import ContainerWithGradient from "components/shared/ContainerWithGradient"
import FilterDropdown from "components/shared/FilterDropdown"
import BlockTitle from "components/shared/BlockTitle"
import WPLink from "components/shared/WPLink"
import { GenerateCPTPopupUrl } from "utils/GenerateCPTPopupUrl"
import { LanguageContext } from "utils/LanguageContext"

const ItemStyled = styled.div`
    flex: 0 0 50%;
    max-width: 50%;
    padding: 0 15px;
    margin-bottom: 15px;

    @media ${media.md} {
        flex: 0 0 33.3%;
        max-width: 33.3%;
    }

    @media ${media.lg} {
        flex: 0 0 25%;
        max-width: 25%;
    }

    @media ${media.xl} {
        flex: 0 0 20%;
        max-width: 20%;
    }

    img {
        width: 100%;
    }

    .wh-inner {
        background: white;
        padding: .5rem;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-direction: column;

        @media ${media.sm} {
            padding: 1rem;
        }

        p {
            font-size: ${props => props.theme.font.size.sm};
            font-family: ${props => props.theme.font.family.bold};
            text-transform: uppercase;
        }

        a {
            text-decoration: none;
            font-family: ${props => props.theme.font.family.bold};
        }
    }

    .wh-link {
        padding-top: .5rem;
        text-transform: uppercase;
        font-size: ${props => props.theme.font.size.sm};
        color: ${props => props.theme.colors.purple};
    }
`

class WhosHere extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeSection: 0,
            filterText: "Restaurants"
        }

    }

    setFilter(id, text) {
        this.setState({
            activeSection: id,
            filterText: text
        })
    }

    render() {
        const { activeSection } = this.state
        const { title, restaurants, chefs } = this.props.block
        // const data = activeSection === 0 ? restaurants : chefs
        const blockLink = activeSection === 0 ? this.props.options.restaurantLandingPage : this.props.options.chefLandingPage

        const Item = (props) => {
            const { node } = props
            const link = node.acfTastePageSettings.type === "page" ? node.uri : GenerateCPTPopupUrl(node.slug, node.nodeType, this.props.options)
            return(
                <ItemStyled>
                    <div className="wh-inner">
                        <div>
                            {node.acfRestaurantChef.squareFeaturedImage && 
                                <CustomImage
                                    image={node.acfRestaurantChef.squareFeaturedImage}
                                    className="mb-2" 
                                /> 
                            }
                            <p>{node.title}</p>
                        </div>
                        <WPLink url={link} className="wh-link">
                            Read more
                        </WPLink>
                    </div>
                </ItemStyled>
            )
        }

        const restaurantItems = restaurants.map((node, i) => {
            return(
                <Item key={i} node={node} />
            )
        })

        const chefItems = chefs.map((node, i) => {
            return(
                <Item key={i} node={node} />
            )
        })

        return(
            <ContainerWithGradient className="my-4">
                {title && 
                    <BlockTitle white outline>{title}</BlockTitle>
                }
                
                {restaurants && chefs &&
                    <FilterDropdown className="mb-3">
                        <DropdownToggle caret>
                            {this.state.filterText}
                            <FontAwesomeIcon icon={faAngleDown} />
                        </DropdownToggle>
                        
                        <DropdownMenu>
                            <DropdownItem  onClick={() => this.setFilter(0, "Restaurants")}>
                                Restaurants
                            </DropdownItem>
                            <DropdownItem onClick={() => this.setFilter(1, "Chefs")}>
                                Chefs
                            </DropdownItem>
                        </DropdownMenu>
                    </FilterDropdown>
                }

                <Row>
                    {activeSection === 0 && 
                        restaurantItems
                    }
                    {activeSection === 1 && 
                        chefItems
                    }
                </Row>

                <WPLink url={blockLink.url} button color="secondary">
                    See more
                </WPLink>
            </ContainerWithGradient>
        )
    }
}

const WhosHereExport = (props) => {
    const { currentLanguage } = useContext(LanguageContext)
    return(
        <StaticQuery
            query={graphql`
                query {
                    allWp {
                        edges {
                            node {
                                ...optionsFragment
                            }
                        }
                    }
                }
            `}
            render={data => {
                return (
                    <WhosHere options={data.allWp.edges[0].node[currentLanguage.code].acfOptions} {...props} />
                )
            }}
        />
    )
}

export default WhosHereExport