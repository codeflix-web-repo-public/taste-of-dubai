import { UncontrolledDropdown } from "reactstrap"
import styled, { css } from "styled-components"
import { media } from "utils/Media"

const FilterDropdown = styled(UncontrolledDropdown)`
    margin-bottom: .5rem;
    position: relative;
    display: inline-block;
    z-index: 1;
    width: 100%;

    @media ${media.md} {
        margin-bottom: 0;
        width: auto;
    }
    
    button {
        min-width: 280px;
        border: 0;
        width: 100%;

        @media ${media.md} {
            width: auto;
        }
    }

    &.fullWidth {
        width: 100%;
        margin: 1rem 0 .5rem 0;

        button {
            width: 100%;
            min-width: 100%;
        }

        @media ${media.md} {
            width: 100%;
            margin: 1rem 0 .5rem 0;
        }
    }

    .dropdown-toggle {
        /* border: 1px solid black; */
        background-color: white;
        padding: .75rem;
        border-radius: 0;
        color: black;
        font-family: ${props => props.theme.font.family.bold};
        text-transform: uppercase;
        font-size: ${props => props.theme.font.size.sm};
        position: relative;
        text-align: left;
        padding-left: 1rem;
        border: 1px solid ${props => props.theme.colors.purple};

        &:after {
            display: none;
        }

        svg {
            position: absolute;
            right: 1rem;
            font-size: 1rem;
        }
    }

    .dropdown-menu {
        margin: 0;
        padding: 0;
        width: 100%;
        border: 1px solid ${props => props.theme.colors.purple} !important;
        border-top: 0 !important;
        top: -1px !important;
        overflow: hidden;

        button {
            color: black;
            text-transform: uppercase;
            font-family: ${props => props.theme.font.family.regular};
            font-size: ${props => props.theme.font.size.sm};
            padding: .5rem 1rem;
            border: 0;

            &:hover {
                color: ${props => props.theme.colors.secondary};
                background-color: black;
            }
        }
    }
    
    .dropdown-item {
        white-space: unset;
    }

    &.show {
        z-index: 10;
        .dropdown-toggle {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;

            .icon {
                &:before {
                    transform: rotate(180deg);
                    display: block;
                }
            }
        }

        .dropdown-menu {
            border: 0;
            border-top: 0;
            border-radius: 0;
        }
    }
`

export default FilterDropdown