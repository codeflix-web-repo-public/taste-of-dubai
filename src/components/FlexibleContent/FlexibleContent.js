import React, { Component } from "react"
// import LazyLoad from "react-lazyload"
import HeroCarousel from "./Blocks/HeroCarousel/HeroCarousel"
import TextFullWidth from "./Blocks/TextFullWidth"
import ImageText from "./Blocks/ImageText"
import LinkBlocks from "./Blocks/LinkBlocks/LinkBlocks"
import NewsCarousel from "./Blocks/NewsCarousel"
import WhosHere from "./Blocks/WhosHere"
// import SocialImages from "./Blocks/SocialImages"
import Carousel from "./Blocks/Carousel/Carousel"
import HorizontalImageText from "./Blocks/HorizontalImageText"
import CtaWithBackgroundImage from "./Blocks/CtaWithBackgroundImage"
import FAQs from "./Blocks/FAQs"
import ColumnedImageWithText from "./Blocks/ColumnedImageWithText"
import NewsListing from "./Blocks/NewsListing"
import Listing from "./Blocks/Listing/Listing"
import Partners from "./Blocks/Partners"
import Operators from "./Blocks/Operators"
import Testimonials from "./Blocks/Testimonials"
import GalleryMasonry from "./Blocks/GalleryMasonry"
import Galleries from "./Blocks/Galleries"
import NewsletterSignup from "./Blocks/NewsletterSignup"
import TheresMore from "./Blocks/TheresMore"
import Schedule from "./Blocks/Schedule"
import Tickets from "./Blocks/Tickets"
import VideoBlock from "./Blocks/VideoBlock"

class FlexibleContent extends Component {

    componentDidMount() {
        let count = 0
        const acfBlocks = this.props.blocks
        if (acfBlocks !== null) {
            acfBlocks.forEach((acf) => {
                // If first block is not a hero add padding so content sits beneath fixed header
                if (count === 0) {
                    if (
                        acf.__typename !== "WpPage_Acfflexiblecontent_Blocks_HeroCarousel"
                    ) {
                        this.addPaddingToPage()
                        window.addEventListener("resize", this.addPaddingToPage)
                    }
                }
                count++
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.addPaddingToPage)
    }

    addPaddingToPage() {
        setTimeout(() => {
            const header = document.getElementsByClassName("headerWrap")[0];
            if (header !== undefined) {
                const headerHeight = header.clientHeight
                document.getElementsByClassName("siteWrap")[0].style.paddingTop = `${headerHeight + 20}px` // 30 = extra padding
            }
        }, 200);
    }

    render() {
        const acfBlocks = this.props.blocks
        let blocks = ""
        // const lazyOffset = 400
        
        if (acfBlocks !== null) {
            blocks = acfBlocks.map((acf, i) => {
                // console.log(acf.__typename)

                switch (acf.__typename) {
                    case 'WpPage_Acfflexiblecontent_Blocks_HeroCarousel':
                        return <HeroCarousel key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_TextFullWidth':
                        return <TextFullWidth key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_ImageWithText':
                        return <ImageText key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_LinkBlocks':
                        return <LinkBlocks key={i} block={acf} />
     
                    case 'WpPage_Acfflexiblecontent_Blocks_NewsCarousel':
                        return <NewsCarousel key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_WhosHere':
                        return <WhosHere key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_Carousel':
                        return <Carousel key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_HorizontalImageWithText':
                        return <HorizontalImageText key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_CtaWithBackgroundImage':
                        return <CtaWithBackgroundImage key={i} block={acf} />
                        
                    case 'WpPage_Acfflexiblecontent_Blocks_Faqs':
                        return <FAQs key={i} block={acf} />
                        
                    case 'WpPage_Acfflexiblecontent_Blocks_ColumnedImageWithText':
                        return <ColumnedImageWithText key={i} block={acf} />
                        
                    case 'WpPage_Acfflexiblecontent_Blocks_NewsListing':
                        return <NewsListing key={i} />
                    
                    case 'WpPage_Acfflexiblecontent_Blocks_Listing':
                        return <Listing key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_Partners':
                        return <Partners key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_Operators':
                        return <Operators key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_Testimonials':
                        return <Testimonials key={i} block={acf} />
                        
                    case 'WpPage_Acfflexiblecontent_Blocks_GalleryMasonry':
                        return <GalleryMasonry key={i} block={acf} />
                        
                    case 'WpPage_Acfflexiblecontent_Blocks_Galleries':
                        return <Galleries key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_TheresMore':
                        return  <TheresMore key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_Schedule':
                        return <Schedule key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_Tickets':
                        return <Tickets key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_VideoBlock':
                        return <VideoBlock key={i} block={acf} />

                    case 'WpPage_Acfflexiblecontent_Blocks_NewsletterSignup':
                        return <NewsletterSignup key={i} />
                        
                    default:
                        return "";
                }
            })
        }

        return blocks
    }
}

export default FlexibleContent