import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"
import { media } from "utils/Media"
import ContainerMax from "components/shared/ContainerMax"
import ContentMax from "components/shared/ContentMax"

const ContainerMaxStyled = styled(ContainerMax)`
    position: relative;
`

const ContainerBg = styled.div`
    ${props => props.gradient === true && css`
        padding-top: 3rem;
        padding-bottom: 3rem;

        ${props => props.smallPadding && css`
            padding-top: 1.5rem;
            padding-bottom: .5rem;
        `}

        &:before {
            content: "";
            position: absolute;
            background: ${props => props.theme.colors.gradient};
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }
    `}

    ${props => props.bg && css`
        &:after {
            content: "";
            position: absolute;
            background: url("${props.bg}");
            background-repeat: no-repeat;
            background-position: -4px -4px;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
        }
    `}
`

const ContentMaxStyled = styled(ContentMax)`
    ${props => props.gradient === true && css`
        position: relative;
        z-index: 2;

        @media ${media.md} {
            padding-left: 2rem;
            padding-right: 2rem;
        }

        @media (min-width: 1600px) {
            padding-left: 0;
            padding-right: 0;
        }
    `}
`

const ContainerWithGradient = (props) => {
    return(
        <ContainerMaxStyled className={props.className}>
            <ContainerBg gradient={props.gradient} smallPadding={props.smallPadding} bg={props.bg}>
                <ContentMaxStyled gradient={props.gradient}>
                    {props.children}
                </ContentMaxStyled>
            </ContainerBg>
        </ContainerMaxStyled>
    )
}

ContainerWithGradient.defaultProps = {
    gradient: true,
    smallPadding: false,
    bg: false
}

ContainerWithGradient.propTypes = {
    gradient: PropTypes.bool
}

export default ContainerWithGradient