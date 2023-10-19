import React, { Component } from "react"
// import LazyLoad from "react-lazyload"
import TextBlock from "./FeaturedBlocks/TextBlock"
import ImageBlock from "./FeaturedBlocks/ImageBlock"
import VideoBlock from "./FeaturedBlocks/VideoBlock"
import FaqBlock from "./FeaturedBlocks/FaqBlock"
import ContactForm from "./FeaturedBlocks/ContactForm"
import CompetitionForm from "./FeaturedBlocks/CompetitionForm"
import GeneralTable from "./FeaturedBlocks/GeneralTable"
import ImageGrid from "./FeaturedBlocks/ImageGrid"
import ColumnedImageWithText from "./Blocks/ColumnedImageWithText"
import HorizontalImageText from "./Blocks/HorizontalImageText"
import GalleryCarousel from "./FeaturedBlocks/GalleryCarousel"
import TextWithPopupButton from "./FeaturedBlocks/TextWithPopupButton"
import GalleryMasonry from "./FeaturedBlocks/GalleryMasonry"
import ContactFormBuilder from "./FeaturedBlocks/ContactFormBuilder/ContactFormBuilder"
import Menu from "./FeaturedBlocks/Menu"

class FlexibleContentFeatured extends Component  {

    render() {
        let blocks = ""
        // const lazyOffset = 400

        if (this.props.blocks) {
            blocks = this.props.blocks.map((block, i) => {
                // console.log(block.__typename)
                // Listing all post types as used on all, need to figure out how to merge into one graphql node
                switch (block.__typename) {
                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextBlock':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextBlock':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextBlock':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextBlock':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextBlock':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextBlock':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextBlock':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextBlock':
                        return <TextBlock data={block} key={i} />

                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageBlock':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageBlock':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageBlock':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageBlock':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageBlock':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageBlock':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageBlock':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageBlock':
                        return <ImageBlock data={block} key={i} />

                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_VideoBlock':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_VideoBlock':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_VideoBlock':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_VideoBlock':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_VideoBlock':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_VideoBlock':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_VideoBlock':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_VideoBlock':
                        return <VideoBlock data={block} key={i} />

                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_FaqBlock':
                        return <FaqBlock data={block} key={i} />

                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactForm':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactForm':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactForm':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactForm':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactForm':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactForm':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactForm':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactForm':
                        return <ContactForm data={block} key={i} />
  
                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_CompetitionForm':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_CompetitionForm':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_CompetitionForm':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_CompetitionForm':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_CompetitionForm':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_CompetitionForm':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_CompetitionForm':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_CompetitionForm':
                        return <CompetitionForm data={block} key={i} />
      
                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_GeneralTable':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_GeneralTable':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_GeneralTable':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_GeneralTable':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_GeneralTable':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_GeneralTable':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_GeneralTable':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_GeneralTable':
                        return <GeneralTable data={block} key={i} />
     
                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageGrid':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageGrid':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageGrid':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageGrid':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageGrid':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageGrid':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageGrid':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_ImageGrid':
                        return <ImageGrid data={block} key={i} />

                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ColumnedImageWithText':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_ColumnedImageWithText':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_ColumnedImageWithText':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_ColumnedImageWithText':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_ColumnedImageWithText':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_ColumnedImageWithText':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_ColumnedImageWithText':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_ColumnedImageWithText':
                        return <ColumnedImageWithText block={block} padding={false} template="featured" key={i} />

                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_HorizontalImageWithText':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_HorizontalImageWithText':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_HorizontalImageWithText':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_HorizontalImageWithText':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_HorizontalImageWithText':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_HorizontalImageWithText':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_HorizontalImageWithText':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_HorizontalImageWithText':
                        return <HorizontalImageText block={block} key={i} />
  
                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryCarousel':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryCarousel':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryCarousel':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryCarousel':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryCarousel':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryCarousel':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryCarousel':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryCarousel':
                        return <GalleryCarousel block={block} key={i} />
     
                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextWithPopupButton':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextWithPopupButton':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextWithPopupButton':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextWithPopupButton':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextWithPopupButton':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextWithPopupButton':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextWithPopupButton':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_TextWithPopupButton':
                        return <TextWithPopupButton block={block} key={i} />

                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryMasonry':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryMasonry':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryMasonry':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryMasonry':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryMasonry':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryMasonry':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryMasonry':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_GalleryMasonry':
                        return <GalleryMasonry block={block} key={i} />

                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_ContactFormBuilder':
                        return <ContactFormBuilder block={block} key={i} />
    

                    case 'WpPage_Acftwocolumnflexiblecontent_TwoColumnBlocks_Menu':
                    case 'WpRestaurant_Acftwocolumnflexiblecontent_TwoColumnBlocks_Menu':
                    case 'WpChef_Acftwocolumnflexiblecontent_TwoColumnBlocks_Menu':
                    case 'WpTastemenu_Acftwocolumnflexiblecontent_TwoColumnBlocks_Menu':
                    case 'WpRecipe_Acftwocolumnflexiblecontent_TwoColumnBlocks_Menu':
                    case 'WpArtisanProducers_Acftwocolumnflexiblecontent_TwoColumnBlocks_Menu':
                    case 'WpThingtodo_Acftwocolumnflexiblecontent_TwoColumnBlocks_Menu':
                    case 'WpNewsArticle_Acftwocolumnflexiblecontent_TwoColumnBlocks_Menu':
                        return <Menu block={block} key={i} />
                        
                    default:
                        return "";
                }
            })

        }

        return blocks
    }
} 

export default FlexibleContentFeatured