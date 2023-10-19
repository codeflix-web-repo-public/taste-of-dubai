import React from "react"
import styled, { css } from "styled-components"
import { media } from "utils/Media"

const Label = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: .5rem;
    background-color: ${props => props.theme.colors.secondary};
    font-family: ${props => props.theme.font.family.bold};
    font-size: 0.7rem;
    line-height: 1;
    z-index: 11;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media ${media.sm} {
        font-size: ${props => props.theme.font.size.sm};
    }

    @media ${media.md} {
        font-size: ${props => props.theme.font.size.base}; 
    }

    ${props => props.hidden && css`
        display: none;
    `}
`


const UrgencyLabel = (props) => {
    return(
        <Label hidden={props.hidden} className="urgency-label">
            {props.title}
        </Label>
    )
}

export default UrgencyLabel

UrgencyLabel.defaultProps = {
    hidden: false
}