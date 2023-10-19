import React, {Component} from "react"
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import MasonryWall from "components/shared/MasonryWall"
import GalleryGridItem from "./GalleryGridItem"
import Button from "components/shared/Button"
import styled from "styled-components"

const Wrapper = styled.div`
`

class GalleryGrid extends Component {

    constructor(props) {
        super(props)

        this.state = {
            paginationLimit: 12,
            filter: 'reload',
            postCount: 0,
            postsHtml: "",
            filterActive: false,
            activeImage: 0,
            images: this.props.images,
            lightboxImages: [],
            photoIndex: -1,
        }

        this.instance = null
        this.postsPerPage = 12

        if (this.props.columns !== 4) {
            this.sizes = {
                default: 2
            }
        } else {
            this.sizes = {
                default: 4,
                992: 3,
                768: 2
            }
        }

        this.setImages = this.setImages.bind(this)
        this.viewMoreImages = this.viewMoreImages.bind(this)
    }

    componentDidMount() {
        this.setImages(this.props.images)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.images !== this.props.images) {
            this.setState({
                images: this.props.images
            })
            this.setImages(this.props.images)
        }
    }

    viewMoreImages() {
        this.setState((state) => {
            return {paginationLimit: (state.paginationLimit + this.postsPerPage)}
        }, this.setImages)
    }

    openOnKeyDown = (e, index) => {
        if (e.keyCode === 13) {
            this.setState({photoIndex: index})
        }
    }

    setImages(images = null) {
        let {paginationLimit} = this.state
        let postCount = 0
        let postsHtml
        let currentImages = images
        let lightboxImages = []

        if (currentImages === null) currentImages = this.state.images

        if (currentImages.length > 0) {
            postsHtml = currentImages.map((image, i) => {
                if (postCount < paginationLimit) {
                    postCount++
                    if (image) {
                        lightboxImages.push({ 
                            src: image.sourceUrl,
                            width: image.mediaDetails.width,
                            height: image.mediaDetails.height,
                        })
                        return (
                            <div
                                role="button" aria-pressed="false"
                                key={i}
                                tabIndex={i}
                                onClick={() => this.setState({photoIndex: i })}
                                onKeyDown={(e) => this.openOnKeyDown(e, i)}
                            >
                                <GalleryGridItem
                                    key={i}
                                    thumbnail={image}
                                    largeImage={image.sourceUrl}
                                    altText={image.altText}
                                    borderOnHover={this.props.borderOnHover}
                                />
                            </div>
                        )
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            })

            this.setState({
                postsHtml,
                lightboxImages
            })
        }
    }

    render() {
        const {photoIndex, lightboxImages} = this.state;

        return (
            <Wrapper>
                <MasonryWall breakpoints={this.sizes}>
                    {this.state.postsHtml}
                </MasonryWall>
                {this.state.paginationLimit < this.props.images.length &&
                <div className="pt-3">
                    <Button as="button" onClick={this.viewMoreImages} color="black">
                        <span>View more images</span>
                    </Button>
                </div>
                }

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

GalleryGrid.defaultProps = {
    columns: 4,
    borderOnHover: false
}

export default GalleryGrid