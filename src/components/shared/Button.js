import React from "react"
import styled, { css } from "styled-components"

// Remove color from props to stop invalid html
const Button = styled(({ color, small, ...props }) => (
    <a {...props}>
        {props.children}
    </a>
))`
    border: 0;
    padding: 0;
    display: inline-block;
    text-transform: uppercase;
    text-decoration: none !important;
    white-space: nowrap;
    font-size: ${props => props.theme.font.size.sm};
    font-family: ${props => props.theme.font.family.bold};
    // font-weight: normal;
    background-color: transparent;
    // border: 2px solid ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.secondary};
    border-radius: 0;
    line-height: 1;
    position: relative;

    span {
        padding: .9rem 1.15rem;
        position: relative;
        z-index: 2;
        display: block;

        ${props => props.small && css`
            padding: .5rem 1rem;
        `}
    }

    &:before {
        content: "";
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border: 2px solid ${props => props.theme.colors.secondary};
        position: absolute;
        z-index: 1;
    }

    &:hover {
        background: transparent;
        // border-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.secondary};
        cursor: pointer;
        text-decoration: none;

        &:before {
            border-width: 4px;
        }
    }

    ${props => props.color === "primary" && css`
        background:${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};

        &:hover {
            background: ${props => props.theme.colors.primary};
            color: ${props => props.theme.colors.white};
        }
    `}

    ${props => props.color === "secondary" && css`
        span {
            background-color: ${props => props.theme.colors.secondary};
            color: ${props => props.theme.colors.black};
        }
        
        &:before {
            content: "";
            position: absolute;
            top: .25rem;
            left: .25rem;
            opacity: 0;
            transition: opacity .4s ease;
            border: none;
            background-color: black;
            height: 100%;
            width: 100%;
        }

        &:hover {
            background-color: ${props => props.theme.colors.secondary};
            &:before {
                opacity: 1;
            }
        }

        &:active {
            span {
                background-color: black;
                color: ${props => props.theme.colors.secondary};
            }
            
            &:before {
                display: none;
            }
        }
    `}

    ${props => props.color === "black" && css`
        span {
            background-color: black;
            color: ${props => props.theme.colors.secondary};
        }
        
        &:before {
            content: "";
            position: absolute;
            top: .25rem;
            left: .25rem;
            opacity: 0;
            transition: opacity .4s ease;
            border: none;
            background-color: ${props => props.theme.colors.primary};
            height: 100%;
            width: 100%;
        }

        &:hover {
            background-color: black;
            &:before {
                opacity: 1;
            }
        }

        &:active {
            span {
                background-color: ${props => props.theme.colors.primary};
                color: ${props => props.theme.colors.secondary};
            }
            
            &:before {
                display: none;
            }
        }
    `}

    &:disabled {
        pointer-events: none;
    }

    &:active {
        background-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.grey1};
    }
`;

export default Button