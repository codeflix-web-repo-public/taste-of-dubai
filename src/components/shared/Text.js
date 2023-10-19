import styled, { css } from "styled-components"
import { media } from "utils/Media"

const Text = styled.p`
    font-family: ${props => props.theme.font.family.body};
    font-size: ${props => props.theme.font.size.base};

    &:focus, &:focus p {
        outline: 0 !important;
    }

    ${props => props.primary && css`
        color: ${props => props.theme.colors.primary};
    `}

    ${props => props.secondary && css`
        color: ${props => props.theme.colors.secondary};
    `}

    ${props => props.tertiary && css`
        color: ${props => props.theme.colors.tertiary};
    `}

    ${props => props.white && css`
        color: ${props => props.theme.colors.white};
    `}

    ${props => props.black && css`
        color: ${props => props.theme.colors.black};
    `}

    ${props => props.red && css`
        color: ${props => props.theme.colors.red};
    `}

    ${props => props.blackOff && css`
        color: ${props => props.theme.colors.blackOff};
    `}

    ${props => props.grey && css`
        color: ${props => props.theme.colors.grey};
    `}

    ${props => props.yellow && css`
        color: ${props => props.theme.colors.yellow};
    `}

    ${props => props.orangeDark && css`
        color: ${props => props.theme.colors.primary};
    `}

    ${props => props.orange && css`
        color: ${props => props.theme.colors.secondary};
    `}

    ${props => props.medium && css`
        font-family: ${props => props.theme.font.family.medium};
    `}

    ${props => props.bold && css`
        font-family: ${props => props.theme.font.family.bold};
    `}

    ${props => props.extrabold && css`
        font-family: ${props => props.theme.font.family.black};
    `}

    ${props => props.xl && css`
        font-size: ${props => props.theme.font.h4.size};

        @media ${media.md} {
            font-size: ${props => props.theme.font.h3.size};
        }
    `}

    ${props => props.lg && css`
        font-size: ${props => props.theme.font.size.lg};
    `}

    ${props => props.md && css`
        font-size: ${props => props.theme.font.size.md};
    `}

    ${props => props.sm && css`
        font-size: ${props => props.theme.font.size.sm};
    `}

    ${props => props.size && css`
        font-size: ${props.size}rem;
    `}

    ${props => props.italic && css`
        font-style: italic;
    `}
    
    ${props => props.uppercase && css`
        text-transform: uppercase;
    `}

    ${props => props.center && css`
        text-align: center;
    `}

    ${props => props.right && css`
        text-align: right;
    `}

    ${props => props.italic && css`
        font-family: ${props => props.theme.font.family.italic};
    `}
`

export default Text