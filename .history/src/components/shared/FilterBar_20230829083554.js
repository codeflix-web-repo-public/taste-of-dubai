import styled, { css } from "styled-components"
import { media } from "utils/Media"

const FilterBar = styled.div`
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    z-index: 20;
    position: relative;

    @media ${media.md} {
        background-color: ${props => props.theme.colors.pink};
        padding: .75rem 1rem;
    }

    .filter-title {
        font-family: ${props => props.theme.font.family.bold};
        font-size: ${props => props.theme.font.size.base};
        padding-right: 1rem;
        display: none;
        text-transform: uppercase;

        @media ${media.lg} {
            display: block;
        }
    }

    .filter-reset {
        width: 100%;

        @media ${media.md} {
            width: auto;
        }
    }
`

export default FilterBar