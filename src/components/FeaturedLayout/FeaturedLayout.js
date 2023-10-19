import React, { Component } from "react"
import { Row, Col } from "reactstrap"
import styled from "styled-components"
import { media } from "utils/Media"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FacebookShareButton, TwitterShareButton } from "react-share"
import FlexibleContentFeatured from "components/FlexibleContent/FlexibleContentFeatured"
import Carousel from "components/FlexibleContent/Blocks/HeroCarousel/Carousel"
import Article from "components/shared/Article"
import ContentMax from "components/shared/ContentMax"
import SidebarBlock from "components/shared/SidebarBlock"
import SidebarCustomBlock from "components/shared/SidebarCustomBlock"
import ContainerMax from "components/shared/ContainerMax"
import SidebarGoogleAds from "components/shared/SidebarGoogleAds"
import Breadcrumbs from "components/shared/Breadcrumbs"

const ContentMaxStyled = styled(ContentMax)`
    padding-right: 0;
    padding-left: 0;

    @media ${media.md} {
        /* padding-right: 15px; */
    }
`

const ContentWrap = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media ${media.lg} {
        flex-wrap: nowrap;
    }

    .content {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;

        @media ${media.lg} {
            padding-left: 0;
            width: 1008px; // 948 + 60 of padding
            max-width: calc(100% - 330px);
        }
    }

    .sidebar {
        width: 100%;

        @media ${media.lg} {
            width: 330px;
        }
    }
`

class FeaturedLayout extends Component {
    componentDidMount() {
        if (!this.props.data.acfFeatureArticle.slides) {
            this.addPaddingToPage()
            window.addEventListener('resize', this.addPaddingToPage)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.addPaddingToPage)
    }

    addPaddingToPage() {
        setTimeout(() => {
            const header = document.getElementsByClassName("headerWrap")[0];
            if (header !== undefined) {
                const headerHeight = header.clientHeight
                document.getElementsByClassName("siteWrap")[0].style.paddingTop = `${headerHeight + 20}px` // 20 = extra padding
            }
        }, 200);
    }

    render() {
        const { data } = this.props
        let date, shareUrl
        if (this.props.type === "News") {
            date = data.acfNews && data.acfNews.hidePublishDate === "no" ? true : false
            shareUrl = `${process.env.GATSBY_FRONTEND_URL}${this.props.uri}`
        }

        return(
            <>
                {data.acfFeatureArticle && data.acfFeatureArticle.slides &&
                    <ContainerMax maxWidth="1920" noPadding>
                        <Carousel slides={data.acfFeatureArticle.slides} type="Featured" />
                    </ContainerMax>
                }
                {this.props.breadcrumbs &&
                    <ContainerMax maxWidth="1600">
                        <Breadcrumbs breadcrumbs={data.seo.breadcrumbs} />
                    </ContainerMax>
                }
                <ContentMaxStyled className="py-4 py-md-5">
                    <Article>
                        <ContentWrap className="justify-content-lg-between">
                            <div className="content">
                                <Row>
                                    {date &&
                                        <Col xs={12} md={3} xl={2} className="date-share mb-3">
                                            <Row>
                                                <Col xs={6} md={12}>
                                                    <p className="date">{data.date}</p>
                                                </Col>
                                                <Col xs={6} md={12}>
                                                    <div className="share">
                                                        <span className="d-md-none">SHARE</span>
                                                        <FacebookShareButton className="share-button d-inline-block mr-4" url={shareUrl}>
                                                            <FontAwesomeIcon icon={faFacebookF} />
                                                        </FacebookShareButton>
                                                        <TwitterShareButton className="share-button d-inline-block" url={shareUrl}>
                                                            <FontAwesomeIcon icon={faTwitter} />
                                                        </TwitterShareButton>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    }
                                    <Col xs={12} md={date ? 9 : 12} xl={date ? 10 : 12} className="d-flex flex-wrap">
                                        {data.acfTwoColumnFlexibleContent && 
                                            <FlexibleContentFeatured blocks={data.acfTwoColumnFlexibleContent.twoColumnBlocks} />
                                        }
                                    </Col>
                                </Row>
                            </div>
                            <div className="sidebar">
                                <aside>
                                    <Row className="justify-content-center w-100">
                                        {data.acfTwoColumnFlexibleContent.sidebarCustomBlock && 
                                        data.acfTwoColumnFlexibleContent.sidebarCustomBlock.map((node, i) => {
                                            return(
                                                <Col xs={12} className="pb-3 pb-md-0 px-lg-0" key={i}>
                                                    <SidebarCustomBlock data={node} />
                                                </Col>
                                            )
                                        })}
                                        <Col 
                                            xs={{ size: 12, order: 3 }} md={{ order: 2 }} 
                                            className="pb-3 pb-md-0 px-1 px-lg-0 d-flex justify-content-center flex-wrap"
                                        >
                                            <SidebarGoogleAds googleAdsSidebar={this.props.googleAdsSidebar} />
                                        </Col>
                                        <Col xs={{ size: "auto", order: 2}} md={{ order: 3 }} className="pb-3">
                                            <Row className="justify-content-center">
                                                {data.acfTwoColumnFlexibleContent.sidebar && 
                                                data.acfTwoColumnFlexibleContent.sidebar.map((node, i) => {
                                                    return(
                                                        <Col xs={12} sm={6} lg={12} className="pb-3 pb-md-0 px-lg-0" key={i}>
                                                            <SidebarBlock data={node} margin={true} />
                                                        </Col>
                                                    )
                                                })}
                                            </Row>
                                        </Col>
                                    </Row>
                                </aside>
                            </div>
                        </ContentWrap>
                    </Article>
                </ContentMaxStyled>
            </>
        )
    }
}

FeaturedLayout.defaultProps = {
    breadcrumbs: true
}

export default FeaturedLayout