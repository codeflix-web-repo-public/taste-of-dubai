import React from "react"
import styled, { css } from "styled-components"
import { Container } from "reactstrap"
import { media } from "utils/Media"

const ContainerMax = styled(({ noPadding, noPaddingSm, maxWidth, ...props }) => (
    <Container {...props}>{props.children}</Container>
))`
    max-width: 1300px;
    padding-right: ${props => props.theme.bootstrapGutterWidth};
    padding-left: ${props => props.theme.bootstrapGutterWidth};

    @media ${media.xxl} {
        max-width: ${props => props.theme.sizes.xxl}; 
        // padding-right: ${props => props.theme.bootstrapGutterWidth};
        // padding-left: ${props => props.theme.bootstrapGutterWidth};
    }

    ${props => props.maxWidth && css`
        max-width: ${props => props.maxWidth}px;

        @media ${media.xxl} {
            max-width: ${props => props.maxWidth}px; 
        }
    `}

    ${props => props.noPadding && css`
        padding-right: 0;
        padding-left: 0;
    `}

    ${props => props.noPaddingSm && css`
        padding-right: ${props => props.theme.bootstrapGutterWidth};
        padding-left: ${props => props.theme.bootstrapGutterWidth};
        @media ${media.sm} {
            padding-right: 0;
            padding-left: 0;
        }
        @media ${media.md} {
            padding-right: ${props => props.theme.bootstrapGutterWidth};
            padding-left: ${props => props.theme.bootstrapGutterWidth};
        }
    `}
`;

export default ContainerMax