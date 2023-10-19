import styled, { css } from "styled-components"
import { media } from "utils/Media"

const BlockTitle = styled.h3`
    font-family: ${props => props.theme.font.family.black};
    color: ${props => props.theme.colors.themeTitle};
    line-height: 1.44;
    margin: 0;
    font-weight: 400;		
    text-transform: uppercase;
    padding-bottom: 1rem;
    font-size: 1.9rem;

    @media ${media.xl} {
        font-size: ${props => props.theme.font.h2.size};
    }

    ${props => props.template === "featured" && css`
        font-size: ${props => props.theme.font.size.xl};
        @media ${media.xl} {
            font-size: ${props => props.theme.font.size.xxl};
        }
    `}

    ${props => props.white && css`
        color: ${props => props.theme.colors.white};
    `}

    ${props => props.outline && css`
        -webkit-text-stroke: 2px white;
        color: ${props => props.theme.colors.white};
		color: transparent;
        letter-spacing: 1px;

        @media ${media.md} {
            -webkit-text-stroke: 3px white;
            letter-spacing: 0;
        }
    `}
`

export default BlockTitle