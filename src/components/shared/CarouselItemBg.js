import styled, { css } from "styled-components"
import { media } from "utils/Media"

const CarouselItemBg = styled.div`
    /* background-image: ${props => props.theme.colors.gradient}; */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity .4s ease;
    z-index: 1;

    .touch & {
        display: none;
    }

    display: none;

    @media ${media.md} {
        display: block;
    }

    ${props => props.video && css`
        opacity: 0.6;
        border: 0;

        &:hover {
            ${props => (props.borderOnHover === "yes") && css`
                border: 5px solid ${props => props.theme.colors.secondary};
            `}
        }
    `}

    &:after {
        content: "";
        background-image: ${props => props.theme.colors.gradient};
        opacity: 0.8;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        ${props => (props.borderOnHover === "yes") && css`
            border: 5px solid ${props => props.theme.colors.secondary};
        `}

        ${props => props.video && css`
            background-image: none;
            background-color: black;
            opacity: 1;
            border: 0;

            &:hover {
                ${props => (props.borderOnHover === "yes") && css`
                    border: 5px solid ${props => props.theme.colors.secondary};
                `}
            }
        `}
    }

    div {
        position: absolute;
        display: block;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        color: ${props => props.theme.colors.secondary};
        border: 4px solid ${props => props.theme.colors.secondary};
        line-height: 1;
        padding: .5rem 1rem;
        white-space: nowrap;
        text-transform: uppercase;
        font-size: ${props => props.theme.font.size.sm};
        font-family: ${props => props.theme.font.family.bold};

        /* || props.type === "NewsListing" */
        ${props => (props.type === "ColumnedImageWithText" || props.type === "gallery" || props.type === "menu") && css`
            top: 50%;
        `}
    }
`

export default CarouselItemBg