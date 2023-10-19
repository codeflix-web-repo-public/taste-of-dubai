import React from "react"
import styled from "styled-components"
import { media } from "utils/Media"
import WPLink from "components/shared/WPLink"

const Block5Wrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-top: 2rem;
    padding-bottom: 2rem;

    @media ${media.sm} {
        padding: 2rem;
    }

    @media ${media.md} {
        padding: 2rem 4rem;
        font-size: ${props => props.theme.font.size.base};
    }

    @media ${media.lg} {
        padding: 4rem;
        font-size: ${props => props.theme.font.size.lg};
    }

    p {
        @media ${media.md} {
            font-size: ${props => props.theme.font.size.base};
        }

        @media ${media.lg} {
            font-size: ${props => props.theme.font.size.lg};
        }
    }

    h1, h2, h3 {
        padding-bottom: 1rem;
        color: ${props => props.theme.colors.themeTitle} !important;

        span {
            color: ${props => props.theme.colors.themeTitle} !important;
        }
    }
`

const Block5 = (props) => {
    if (props.data !== undefined) {
        return(
            <Block5Wrap>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: props.data.text }} className="mb-5" />
                    <WPLink url={props.data.link.url} button color="black">
                        {props.data.link.title}
                    </WPLink>
                </div>
            </Block5Wrap>
        )
    } else {
        return ""
    }
}

export default Block5