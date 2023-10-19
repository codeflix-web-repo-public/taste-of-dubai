import React, { Component } from "react"
import { graphql, StaticQuery } from "gatsby"
import { Row, Col } from "reactstrap"
import { LanguageContext } from "utils/LanguageContext"
import ContainerMax from "components/shared/ContainerMax"
import ContentMax from "components/shared/ContentMax"
import ListingItem from "./ListingItem"
import MenuListingItem from "./MenuListingItem"
import ListingFilterBar from "./ListingFilterBar"
import ListingMenus from "./ListingMenus"

class Listing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listingData: [],
            filters1: [],
            filter1Arr: [],
            filters2: [],
            filter2Arr: []
        }

        this.setFilters = this.setFilters.bind(this)
        this.resetFilters = this.resetFilters.bind(this)
    }

    componentDidMount() {
        const { 
            listing, 
            filter1, 
            filter2, 
            filter1Name,
            filter2Name 
        } = this.props.block

        let listingData = this.props.data[listing]
        let filter1Arr = []
        let filter2Arr = []
        let filterTemp1 = []
        let filterTemp2 = []
        filterTemp1["name"] = filter1Name ? filter1Name : filter1
        filterTemp2["name"] = filter2Name ? filter2Name : filter2

        // Filter data by polylang language (we only want to see data for current lang)
        listingData = listingData && listingData.edges.filter(({node}) => node.language.code === this.context.currentLanguage.code)

        // create unique array of filters that have been tagged for the filter bar
        // its unique as the key is the databaseId so any dubs would get overwritten
        // also prevents any unused tags from being displayed
        listingData.forEach(({node}) => {
            if (filter1) node[filter1] && node[filter1].nodes && node[filter1].nodes.forEach(node => { filter1Arr[node.databaseId] = node })
            if (filter2) node[filter2] && node[filter2].nodes && node[filter2].nodes.forEach(node => { filter2Arr[node.databaseId] = node })
        })


        // Get correct order of categories
        this.props.data[filter1] && this.props.data[filter1].edges.forEach(({node}) => {
            if (filter1Arr[node.databaseId]) filterTemp1.push(filter1Arr[node.databaseId])
        })

        this.props.data[filter2] && this.props.data[filter2].edges.forEach(({node}) => {
            if (filter2Arr[node.databaseId]) filterTemp2.push(filter2Arr[node.databaseId])
        })

        filter1Arr = filterTemp1
        filter2Arr = filterTemp2
     
        // listingData array in state wont change going forwards
        this.setState({
            listingData,
            filter1Arr,
            filter2Arr
        })
    }

    setFilters(selectedFilters, filter) {
        if (filter === 1) {
            this.setState({
                filters1: selectedFilters
            })
        } else {
            this.setState({
                filters2: selectedFilters
            })
        }
    }

    resetFilters() {
        this.setState({
            filters1: [],
            filters2: []
        })
    }

    render() {
        const { 
            filter1, 
            filter2,
            filter1Label,
            filter2Label
        } = this.props.block
        
        let { 
            listingData, 
            filters1, 
            filters2, 
            filter1Arr, 
            filter2Arr 
        } = this.state

        //TODO: Filter listingData here
        // Dont forget all queries below!

         // filters1 filter
         if (filters1.length > 0) {
            listingData = listingData && listingData.filter(({node}) => {
                const nodeTags = node[filter1] && node[filter1].nodes
                return nodeTags && nodeTags.find(node => filters1.includes(node.databaseId))
            })
        }

         // filters2 filter
        if (filters2.length > 0) {
            listingData = listingData && listingData.filter(({node}) => {
                const nodeTags = node[filter2] && node[filter2].nodes
                return nodeTags && nodeTags.find(node => filters2.includes(node.databaseId))
            })
        }

        const items = listingData && listingData.map(({node}, i) => {
            return(
                <Col key={i} xs={6} md={4} lg={3} className="mb-3">
                    <ListingItem 
                        data={node}
                    />
                </Col>
            )
        })

        // console.log(this.state.filter1Arr)

        return(  
            <ContainerMax className="py-4">
                <ContentMax>
                    <ListingFilterBar 
                        filter1={filter1 && filter1Arr}
                        filter2={filter2 && filter2Arr} 
                        filter1Label={filter1Label}
                        filter2Label={filter2Label} 
                        selectedFilters1={filters1} 
                        selectedFilters2={filters2}
                        setFilters={this.setFilters} 
                        resetFilters={this.resetFilters} 
                    />
                    {this.props.block.listing === "menus" ? (
                        <ListingMenus items={listingData} />
                    ) : (
                        <Row>
                            {items}
                        </Row>
                    )}
                </ContentMax>
            </ContainerMax>
        )
    }
}

Listing.contextType = LanguageContext

const ListingExport = (props) => (
    <StaticQuery
        query={graphql`
            query {
                restaurants: allWpRestaurant(limit: 1000, filter: {status: {eq: "publish"}}) {
                    edges {
                        node {
                            title
                            uri
                            slug
                            language {
                                code
                            }
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
                            acfQuickFacts {
                                quickFactsTitle
                                quickFactsText
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
                            restaurantCuisines {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                            restaurantDays {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                        }
                    }
                }
                chefs: allWpChef(limit: 1000, filter: {status: {eq: "publish"}}) {
                    edges {
                        node {
                            title
                            uri
                            slug
                            language {
                                code
                            }
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
                            acfQuickFacts {
                                quickFactsTitle
                                quickFactsText
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
                            chefDays {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                            chefRestaurants {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                        }
                    }
                }
                menus: allWpTastemenu(limit: 1000, filter: {status: {eq: "publish"}}) {
                    edges {
                        node {
                            title
                            uri
                            slug
                            language {
                                code
                            }
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
                            acfMenu {
                                image {
                                    altText
                                    sourceUrl
                                    mediaDetails {
                                        height
                                        width
                                    }
                                    srcSet
                                }
                                items {
                                    title
                                    name
                                    description
                                    price
                                }
                            }
                            menuDays {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                            menuCuisines {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                        }
                    }
                }
                recipes: allWpRecipe(limit: 1000, filter: {status: {eq: "publish"}}) {
                    edges {
                        node {
                            title
                            uri
                            slug
                            language {
                                code
                            }
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
                            acfQuickFacts {
                                quickFactsTitle
                                quickFactsText
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
                            recipeOccasions {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                            recipeCuisines {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                        }
                    }
                }
                thingstodo: allWpThingtodo(limit: 1000, filter: {status: {eq: "publish"}}) {
                    edges {
                        node {
                            title
                            uri
                            slug
                            language {
                                code
                            }
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
                            acfQuickFacts {
                                quickFactsTitle
                                quickFactsText
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
                            thingToDoActivities {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                            thingToDoDays {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                        }
                    }
                }
                artisanproducers: allWpArtisanproducer(limit: 1000, filter: {status: {eq: "publish"}}) {
                    edges {
                        node {
                            title
                            uri
                            slug
                            language {
                                code
                            }
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
                            acfQuickFacts {
                                quickFactsTitle
                                quickFactsText
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
                            producerActivities {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                            producerTypes {
                                nodes {
                                    databaseId
                                    name
                                }
                            }
                        }
                    }
                }
                restaurantCuisines: allWpRestaurantCuisine {
                    edges {
                        node {
                            databaseId
                            name
                        }
                    }
                }
                restaurantDays: allWpRestaurantDay {
                    edges {
                        node {
                            databaseId
                            name
                        }
                    }
                }
                chefDays: allWpChefDay {
                    edges {
                        node {
                            databaseId
                            name
                        }
                    }
                }
                chefRestaurants: allWpChefRestaurant {
                    edges {
                        node {
                            databaseId
                            name
                        }
                    }
                }
                menuDays: allWpMenuDay {
                    edges {
                        node {
                            name
                            databaseId
                        }
                    }
                }
                menuCuisines: allWpMenuCuisine {
                    edges {
                        node {
                            databaseId
                            name
                        }
                    }
                }
                recipeOccasions: allWpRecipeOccasion {
                    edges {
                        node {
                            databaseId
                            name
                        }
                    }
                }
                recipeCuisines: allWpRecipeCuisine {
                    edges {
                        node {
                            name
                            databaseId
                        }
                    }
                }
                thingToDoActivities: allWpThingToDoActivity {
                    edges {
                        node {
                            databaseId
                            name
                        }
                    }
                }
                thingToDoDays: allWpThingToDoDay {
                    edges {
                        node {
                            databaseId
                            name
                        }
                    }
                }
                producerActivities: allWpProducerActivity {
                    edges {
                        node {
                            databaseId
                            name
                        }
                    }
                }
                producerTypes: allWpProducerType {
                    edges {
                        node {
                            databaseId
                            name
                        }
                    }
                }
            }
        `}
        render={data => {
            return (
                <Listing 
                    block={props.block}
                    data={data} 
                />
            )
        }}
    />
)

export default ListingExport