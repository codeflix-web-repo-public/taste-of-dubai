import React from "react"
import styled, { css } from "styled-components"
import classNames from "classnames"
import { media } from "utils/Media"
import WPLink from "components/shared/WPLink"
import CustomImage from "components/shared/CustomImage"

const WPLinkStyled = styled(WPLink)`
    display: block;
    line-height: 0;
`

const SidebarBlockWrap = styled.div`
    position: relative;
	display: block;

    a {
        text-transform: uppercase;
        display: block;
    }

	&.image {
	    &:before {
	        content: "";
	        position: absolute;
	        z-index: 1;
	        top: 0;
	        left: 0;
	        width: 100%;
	        height: 100%;
            opacity: 0;
            transition: opacity .4s ease;
	    }
	}

	.content1 {
	    position: absolute;
	    z-index: 3;
	    left: 50%;
	    bottom: 1rem;
	    transform: translateX(-50%);
	    width: 85%;
        background-color: white;
        padding: 1rem;
        border: 3px solid white;

        ${props => props.type === "linkblock" && css`
            top: 50%;
            bottom: auto;
            transform: translate(-50%, -50%);
            width: 80%;

            @media ${media.xl} {
                width: 70%;
            }
        `}

        h3 {
            font-size: ${props => props.theme.font.size.base};
            font-family: ${props => props.theme.font.family.bold};
            line-height: 1.1;
  			color: black;
  			text-transform: uppercase;
            margin: 0;
        }

        p { 
            text-transform: uppercase;
            color: ${props => props.theme.colors.themeTitle};
            margin: 1rem 0 0 0;
            font-family: ${props => props.theme.font.family.bold};
            font-size: ${props => props.theme.font.size.sm};
            line-height: 1.1;
        }
	}

    &:hover {
        &:before {
            background-image: ${props => props.theme.colors.gradient};
            opacity: 0.8;
        }

        .content1 {
            ${props => props.type === "linkblock" && css`
                background: transparent;
                border-color: ${props => props.theme.colors.secondary};

                h3, p {
                    color: ${props => props.theme.colors.secondary};
                }
            `}
        }

        h3 {
            text-decoration: none;
        }
    }
`

/* Used on posts and featured page, warning also used in link blocks flexible content */
const SidebarBlock = (props) => {
    const block = props.data.acfSidebarBlocks.sidebarBlockType

    return block && block.map((item, i) => {
        return item.links && item.links.map((link, i) => {

            const image = props.type === "sidebarblock" ? item.image45 
            : item.image

            const imageAlt = props.type === "sidebarblock" ? item.image45.altText 
            : item.image.altText

            if (link.__typename === "WpSidebarBlock_Acfsidebarblocks_SidebarBlockType_ImageLink_Links_Link") {
                return (
                    <WPLinkStyled url={link.link.url} key={i}>
                        <SidebarBlockWrap
                            className={classNames({
                                image: true,
                                "mb-2": props.margin
                            })}
                            type={props.type}
                        >
                            <CustomImage
                                image={image}
                                className="w-100"
                            />   
                            <div className="content1">
                                <h3 dangerouslySetInnerHTML={{ __html: props.data.title }} />
                                {props.type === "sidebarblock" &&
                                    <p dangerouslySetInnerHTML={{ __html: link.link.title }} />
                                }
                            </div>
                        </SidebarBlockWrap>
                    </WPLinkStyled>
                );
            } else if (link.__typename === "WpSidebarBlock_Acfsidebarblocks_SidebarBlockType_ImageLink_Links_File") {
                return (
                    <WPLinkStyled
                        url={link.file.localFile.publicURL} 
                        target="_blank"
                        rel="noopener noreferrer" 
                        key={i}
                    >
                        <SidebarBlockWrap
                            className={classNames({
                                image: true,
                                "mb-2": props.margin
                            })}
                            type={props.type}
                        >
                            <CustomImage
                                image={image}
                            />  
                            <div className="content1">
                                <h3 dangerouslySetInnerHTML={{ __html: props.data.title }} />
                                {props.type === "sidebarblock" &&
                                    <p>{link.linkText}</p>
                                }
                            </div>
                        </SidebarBlockWrap>
                    </WPLinkStyled>
                );
            }
            return null;
        })
    })
}

SidebarBlock.defaultProps = {
    type: "sidebarblock"
}

export default SidebarBlock