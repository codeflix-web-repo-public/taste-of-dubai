import React, {Component} from "react"
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Slider from "react-slick"
import styled from "styled-components"
// import GalleryLightbox from "./GalleryLightbox"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons"

const Wrapper = styled.div`
`

const SliderStyled = styled(Slider)`
    padding: 0 0rem;

    .slider-arrow {
        left: 0;

        &.next {
            left: auto;
            right: 0;
        }

        svg {
            height: 24px;
            width: 24px;
        }
    }
`

class GallerySlider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            activeImage: 0,
            lightboxImages: [],
            photoIndex: -1,
        }

        this.toggleModal = this.toggleModal.bind(this)
    }

    componentDidMount() {
        this.setSliderImages(this.props.images)
    }

    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    openOnKeyDown = (e, index) => {
        if (e.keyCode === 13) {
            this.setState({photoIndex: index, isOpen: true})
        }
    }

    setSliderImages = (images) => {
        let lightboxImages = []
        images.map((image) => {
            if (image) {
                lightboxImages.push({ 
                    src: image.sourceUrl,
                    width: image.mediaDetails.width,
                    height: image.mediaDetails.height,
                })
            }
        })

        this.setState({
            lightboxImages
        })
    }

    getSliderImages = (images) => {
        let postHtml = images.map((image, i) => {
            if (image) {
                const thumb = image.mediaDetails?.sizes.filter(size => size.name === "imagesize_sm")
                return (
                    <div
                        key={i}
                        className="px-1"
                        role="button" aria-pressed="false"
                        tabIndex={i}
                        onClick={() => this.setState({photoIndex: i})}
                        onKeyDown={(e) => this.openOnKeyDown(e, i)}
                    >
                        <img
                            src={thumb.sourceUrl}
                            alt={thumb.altText}
                        />
                    </div>
                )
            } else return null
        })

        return postHtml
    }

    render() {
        const {images} = this.props
        const {photoIndex, lightboxImages} = this.state;

        function PrevButton({onClick}) {
            return (
                <button onClick={onClick} className="slider-arrow prev" aria-label="Previous">
                    <FontAwesomeIcon icon={faAngleLeft}/>
                </button>
            )
        }

        function NextButton({onClick}) {
            return (
                <button onClick={onClick} className="slider-arrow next" aria-label="Next">
                    <FontAwesomeIcon icon={faAngleRight}/>
                </button>
            )
        }

        //slider settings
        const settings = {
            dots: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            lazyload: true,
            prevArrow: <PrevButton/>,
            nextArrow: <NextButton/>,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
            ]
        }

        return (
            <Wrapper>
                <SliderStyled {...settings}>
                    {this.getSliderImages(images)}
                </SliderStyled>

                <Lightbox
                    open={photoIndex >= 0}
                    close={() => this.setState({ photoIndex: -1 })}
                    index={photoIndex}
                    slides={lightboxImages}
                    plugins={[Fullscreen, Thumbnails]}
                />
            </Wrapper>


        )
    }
}

export default GallerySlider