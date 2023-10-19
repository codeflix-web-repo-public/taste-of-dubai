import React, { Component } from "react"
import styled, { css } from "styled-components"
import Slider from "react-slick"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons"
import ReactPlayer from "react-player"
import { Row, Col } from "reactstrap"
import { media } from "utils/Media"
import WPLink from "components/shared/WPLink"
import VideoOverlay from "components/shared/VideoOverlay"
import ContainerMax from "components/shared/ContainerMax"
import Button from "components/shared/Button"
import CustomImage from "../../../shared/CustomImage"

const SliderStyled = styled(Slider)`
    position: relative;

    .slick-slide {
        > div {
            display: flex;
        }
    }

    .slider-arrow {
        position: absolute;
        background: transparent;
        appearance: none;
        border: none;
        font-size: 30px;
        z-index: 13;
        padding: .25rem;
        color: ${props => props.theme.colors.secondary};
        display: none !important;
        z-index: 10;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 30px;

        @media ${media.md} {
            display: flex !important;
            bottom: auto;
            top: calc(50% + 50px);
            transform: translateY(-50%);
        }

        &.prev {
            left: 1rem;
        }
        &.next {
            right: 1rem;
        }

        svg {
            max-width: 12px;
            max-height: 24px;
        }


        &:hover {
            color: ${props => props.theme.colors.secondary};
        }
    }

    .slick-dots {
        /* calc height of image responsively */
        /* top: calc((((324 / 576) * 100vw)) - 2.5rem); 
        bottom: auto; */
/* 
        @media ${media.sm} {
            top: calc((((775 / 992) * 100vw)) - 2.5rem); 
        } */

        @media ${media.md} {
            top: auto;
            bottom: 1.5rem;
        }
    }
`

const Slide = styled.div`
    display: block;
    position: relative;
    overflow: hidden;
    line-height: 0;
    width: 100%;

    &:after {
        content: "";
        position: absolute;
        z-index: 2;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-image: linear-gradient(358.57deg, #000000 9.6%, rgba(0, 0, 0, 0) 58.87%);
        /* display:none; */
        opacity: 0.6;
        
        /* @media ${media.md} {
            display: block;
        } */
    }
`

const SlideContainerMax = styled(ContainerMax)`
    position: absolute;
    z-index: 10;
    width: 100%;
    bottom: 1.5rem;
    padding-right: 1.5rem;
    /* padding-left: calc(15px + 2rem); */

    ${props => props.centered && css`
        bottom: auto;
        top: 50%;
    `}

    @media ${media.md} {
        bottom: auto;
        top: calc(50% + 50px);
        left: 50%;
        transform: translate(-50%, -50%);
        padding-left: 30px;
    }

    .slide-button {
        width: 100%;
        text-align: center;
        margin-bottom: .5rem;

        span {
            padding: 1rem;
            font-size: .7rem;
        }

        @media ${media.sm} {
            width: auto;
        }

        @media ${media.md} {
            span {
                font-size: ${props => props.theme.font.size.sm};
                padding: 1rem 2rem;
            }
        }
    }
`

const SliderTitle = styled.div`
    color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.font.family.black};
    font-size: 2.5rem;
    line-height: .9;
    text-transform: uppercase;

    @media ${media.sm} {
        font-size: 3rem;
    }

    @media ${media.md} {
        font-size: 4rem;
    }

    @media ${media.lg} {
        font-size: 3.5rem;
    }

    @media ${media.xl} {
        font-size: 80px;
    }

    @media ${media.xxl} {
        font-size: 100px;
    }

    h1 {
        color: ${props => props.theme.colors.white};
        text-transform: uppercase;
        font-family: ${props => props.theme.font.family.black};
        font-size: 2.5rem;
        line-height: .9;
        
        margin: 0;

        @media ${media.sm} {
            font-size: 3rem;
        }

        @media ${media.md} {
            font-size: 4rem;
        }

        @media ${media.lg} {
            font-size: 3.5rem;
        }

        @media ${media.xl} {
            font-size: 80px;
        }

        @media ${media.xxl} {
            font-size: 100px;

            ${props => props.type === "Featured" && css`
                font-size: 80px;
            `}
        }
    }

    h2, h3, h4, h5, p {
        color: ${props => props.theme.colors.white};
    }

    ${props => props.outline && css`
        color: transparent;
        -webkit-text-stroke: 2px white;
        letter-spacing: 1px;

        @media ${media.md} {
            -webkit-text-stroke: 3px white;
            letter-spacing: 0;
        }

        h1 {
            color: transparent;
        }
    `}
`

const TextBlock = styled.div`
    color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.font.family.bold};
    padding: 1rem 0;
    line-height: 1;

    @media ${media.xl} {
        padding: 1.5rem 0;
    }
`

const VideoWrap = styled.div`
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140%;
    height: 140%;
    display: none;

    @media ${media.lg} {
        width: 120%;
        height: 120%;
    }

    .embed-responsive-item {
        width: 100% !important;
        height: 100% !important;
    }

    iframe {
        pointer-events: none;
    }

    @media ${media.md} {
        display: block;
    }
`

class Carousel extends Component {

    constructor(props) {
        super(props)

        this.state = {
            players: [],
            videoOverlays: false,
            isBackgroundVideoPlaying: false
        }

        this.setVideoStates = this.setVideoStates.bind(this)
        this.toggleVideoOverlay = this.toggleVideoOverlay.bind(this)
    }

    componentDidMount() {
        this.setVideoStates()
    }

    setVideoStates() {
        let videos = []
        let videoOverlays = []
        let first = 0
        this.props.slides.forEach((slide, i) => {
            if (slide.backgroundVideo) {
                videoOverlays[i] = false
                first === 0 && window.innerWidth > 767 ? videos[i] = true : videos[i] = false
                first++
            }
        })

        this.setState({
            isBackgroundVideoPlaying: videos,
            videoOverlays: videoOverlays
        })
    }

    onSlide(current, next) {
        let videos = this.state.isBackgroundVideoPlaying

        if (videos[current] !== undefined) {
            videos[current] = false
        }
        if (videos[next] !== undefined) {
            videos[next] = window.innerWidth > 767 ? true : false
        }

        this.setState({
            isBackgroundVideoPlaying: videos
        })
    }

    toggleVideoOverlay(e, i) {
        e.preventDefault()
        let videoOverlays = this.state.videoOverlays
        videoOverlays[i] = !this.state.videoOverlays[i]

        this.setState({
            videoOverlay: videoOverlays
        })
    }

    render() {
        function PrevButton({ onClick }) {
            return(
                <button onClick={onClick} className="slider-arrow prev" aria-label="Previous">
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
            ) 
        }

        function NextButton({ onClick }) {
            return (
                <button onClick={onClick} className="slider-arrow next" aria-label="Next">
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            )
        }

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: false,
            fade: true,
            autoplay: 0,
            adaptiveHeight: true,
            lazyload: true,
            prevArrow: <PrevButton/>,
            nextArrow: <NextButton/>,
            beforeChange: (current, next) => this.onSlide(current, next)
        }

        if (this.props.slides) {
            return (
                <SliderStyled {...settings}>
                    {this.props.slides.map((slide, i) => {
                        return (
                            <React.Fragment key={i}>
                                <Slide>
                                    <CustomImage 
                                        image={slide.imageMobile} 
                                        className="d-md-none w-100"
                                    />    
                                    <CustomImage 
                                        image={slide.imageTablet} 
                                        className="d-none d-md-block d-lg-none w-100"
                                    />    
                                    <CustomImage 
                                        image={slide.imageDesktop} 
                                        className="d-none d-lg-block w-100"
                                    />    
                                    
                                    {slide.backgroundVideo &&
                                        <VideoWrap className="embed-responsive embed-responsive-16by9 d-none d-md-block">
                                            <ReactPlayer
                                                url={slide.backgroundVideo}
                                                playing={this.state.isBackgroundVideoPlaying[i]}
                                                volume={0}
                                                muted={true}
                                                controls={false}
                                                loop={true}
                                                className="embed-responsive-item"
                                            />
                                        </VideoWrap>
                                    }
                                    <SlideContainerMax maxWidth="1600" centered={slide.title ? false : true}>
                                        <Row>
                                            <Col md={10}>
                                                {slide.title &&
                                                    <SliderTitle outline dangerouslySetInnerHTML={{ __html: slide.title }} type={this.props.type} />
                                                }

                                                {slide.subTitle &&
                                                    <SliderTitle dangerouslySetInnerHTML={{ __html: slide.subTitle }} type={this.props.type} />
                                                }

                                                {slide.text !== null &&
                                                    <TextBlock dangerouslySetInnerHTML={{ __html: slide.text }} />
                                                }

                                                <Row>
                                                    {slide.link1 && slide.link1.url !== "" &&
                                                        <Col xs={6} sm="auto">
                                                            <WPLink 
                                                                url={slide.link1.url} 
                                                                target={slide.link1.target} 
                                                                button 
                                                                color="secondary" 
                                                                className="slide-button"
                                                            >
                                                                {slide.link1.title}
                                                            </WPLink>
                                                        </Col>
                                                    }
                                                    {slide.link2 && slide.link2.url !== "" &&
                                                        <Col xs={6} sm="auto">
                                                            <WPLink 
                                                                url={slide.link2.url} 
                                                                target={slide.link2.target} 
                                                                button
                                                                className="slide-button"
                                                            >
                                                                {slide.link2.title}
                                                            </WPLink>
                                                        </Col>
                                                    }

                                                    {/*do we have a link to a youtube video?*/}
                                                    {slide.linkVideo &&
                                                        <Col xs={6} sm="auto">
                                                            <Button 
                                                                href="#"
                                                                color="secondary" 
                                                                onClick={(e) => this.toggleVideoOverlay(e, i)}
                                                                className="slide-button"
                                                            >
                                                                <span>Watch</span>
                                                            </Button>
                                                            {/* <YoutubeVideoOverlay oembed={slide.linkVideo}>
                                                                <Button color="primary" as="button">Watch</Button>
                                                            </YoutubeVideoOverlay> */}
                                                        </Col>
                                                    }
                                                </Row>
                                            </Col>
                                        </Row>
                                    </SlideContainerMax>
                                </Slide>
                                {slide.linkVideo && 
                                    <VideoOverlay 
                                        url={slide.linkVideo} 
                                        active={this.state.videoOverlays[i]} 
                                        toggleVideoOverlay={(e) => this.toggleVideoOverlay(e, i)}
                                    />
                                }
                            </React.Fragment>
                        )
                    })}
                </SliderStyled>
            )
        } else {
            return ""
        }
    }
}

export default Carousel