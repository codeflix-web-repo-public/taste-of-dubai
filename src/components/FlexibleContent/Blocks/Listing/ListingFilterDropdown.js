import React, { Component } from "react"
import styled from "styled-components"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { media } from "utils/Media"
import Button from "components/shared/Button"

const DropdownWrap = styled.div`
    min-width: 140px;
    width: 100%;
    text-transform: uppercase;

    &.active {
        position: fixed;
        z-index: 1200;
        top: 0;
        left: 0;
        padding: 1rem;
        bottom: 0;
        height: 100%;
        width: 100%;
        background-color: white;
        overflow-y: auto;

        @media ${media.md} {
            position: relative;
            padding: 0;
            background-color: transparent;
            height: auto;
            width: auto;
            overflow-y: visible;
        }
    }

    @media ${media.md} {
        min-width: 250px;
        width: auto;
    }
`

const DropdownStyled = styled.div`
    position: relative;
    z-index: 10;
    min-width: 140px;
    font-size: ${props => props.theme.font.size.sm};
    border: 3px solid ${props => props.theme.colors.pink};
    margin-bottom: 1rem;

    @media ${media.md} {
        margin-right: 1rem;
        margin-bottom: 0;
        min-width: 250px;
        border: 0;
    }
`

const DropdownToggle = styled.button`
    position: relative;
    z-index: 2;
    width: 100%;
    border: 0;
    padding: .75rem 1.25rem .75rem .75rem;
    text-align: left;
    height: 100%;
    background-color: white;
    color: ${props => props.theme.colors.black};
    font-weight: ${props => props.theme.font.weight.bold};
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;

    .icon {
        max-width: 24px;
        position: relative;
    }

    .filter-count {
        background-color: rgba(244, 53, 129, .2);
        padding: .25rem .5rem;
        line-height: 1;
        color: black;
        margin-right: 1rem;
    }

    &.active {
        color: ${props => props.theme.colors.black};
        background-color: ${props => props.theme.colors.white};

        .icon {
            transform: rotate(180deg);
        }
    }
`

const DropdownMenu = styled.ul`
    z-index: 1;
    padding: 0;
    margin: 0;
    padding-top: 1rem;
    background-color: white;
    width: 100%;
    list-style: none;
    display: none;

    @media ${media.md} {
        position: absolute;
        top: calc(100% - 8px);
        filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.15));
        padding-bottom: 1rem;
    }

    .filter-label {
        text-transform: none;
        padding: 0 .75rem .5rem;
    }

    .filter-apply {
        margin-top: 1rem;
        padding: 0 .75rem .5rem;
        @media ${media.md} {
            display: none;
        }
    }

    &.active {
        display: block;
    }
`

const DropdownItem = styled.li`
    position: relative;
    padding: .3rem .75rem .3rem 2.25rem;
    cursor: pointer;

    @media ${media.md} {
        text-transform: none;
    }

    button {
        background-color: transparent;
        border: 0;
        padding: 0;
    }

    .checkbox {
        width: 14px;
        height: 14px;
        display: inline-block;
        position: absolute;
        left: .75rem;
        top: 50%;
        transform: translateY(-50%);
        border: 1px solid ${props => props.theme.colors.tertiary};
        cursor: pointer;

        &:before {
            content: "";
            width: 10px;
            height: 10px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .date {
        color: ${props => props.theme.colors.purple};
    }

    &:hover {
        background-color: black;
        color: ${props => props.theme.colors.secondary};

        .checkbox {
            border-color: ${props => props.theme.colors.secondary};
        }
    }

    &.active {
        span {
            &:before {
                background-color: ${props => props.theme.colors.tertiary};
            }
        }
    }
`

class ListingFilterDropdown extends Component  {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
        }

        this.toggle = this.toggle.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside, false)
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside, false)
    }

    handleClickOutside(e) {
        if (typeof window !== "undefined" && window.outerWidth > 767) {
            if (this.node && !this.node.contains(e.target)) {
                this.setState({
                    isOpen: false
                })
                document.body.classList.remove('dropdown-filter-active')
            }
        }
    }

    toggle(e) {
        e.stopPropagation()
        this.setState({
            isOpen: !this.state.isOpen
        })
        document.body.classList.toggle('dropdown-filter-active')
    }

    render() {
        let filterActiveCount = 0
        this.props.filters.forEach(filter => {
            // Check not "name" item in array
            if (filter.databaseId) {
                // if in selected items increase amount
                if (this.props.selectedFilters.includes(filter.databaseId)) filterActiveCount++
            }
        })

        return(
            <DropdownWrap className={classNames({ active: this.state.isOpen })} ref={node => this.node = node}>
                <DropdownStyled>
                    <DropdownToggle
                        onClick={this.toggle}
                        className={classNames({ active: this.state.isOpen })}
                    >
                        {this.props.filterText} 
                        <div>
                            {filterActiveCount > 0 &&
                                <span className="filter-count">{filterActiveCount}</span>
                            }
                            <FontAwesomeIcon className="icon" icon={faAngleDown} />
                        </div>
                    </DropdownToggle>
                    
                    <DropdownMenu className={classNames({ active: this.state.isOpen })}>
                        {this.props.filterLabel && 
                            <li className="filter-label">{this.props.filterLabel}</li>
                        }
                        {this.props.filters && this.props.filters.map(filter => {
                            if (filter.databaseId) {
                                return(
                                    <DropdownItem  
                                        key={filter.databaseId} 
                                        className={classNames({
                                            active: this.props.selectedFilters.includes(filter.databaseId) 
                                        })}
                                        onClick={() => this.props.setFilter(filter.databaseId, filter.name, this.props.filter)}
                                    >
                                        <span className="checkbox"></span>
                                        <span>{filter.name}</span>
                                    </DropdownItem>
                                )
                            } return ""
                        })}
                        <li className="filter-apply">
                            <Button as="button" onClick={(e) => this.toggle(e)} color="black">
                                <span>Apply Filters</span>
                            </Button>
                        </li>
                    </DropdownMenu>
                </DropdownStyled>
            </DropdownWrap>
        )
    }
}

export default ListingFilterDropdown