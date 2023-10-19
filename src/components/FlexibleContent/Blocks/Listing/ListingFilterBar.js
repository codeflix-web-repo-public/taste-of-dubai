import React, { Component } from "react"
import FilterBar from "components/shared/FilterBar"
import ListingFilterDropdown from "./ListingFilterDropdown"
import Button from "components/shared/Button"

class ListingFilterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter1: [],
            filter2: [],
            filter1Text: "",
            filter2Text: "",
        }

        this.setFilter = this.setFilter.bind(this)
        this.resetFilters = this.resetFilters.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.filter1 && this.props.filter1.name !== prevProps.filter1.name) {
            this.setState({
                filter1Text: `All ${this.props.filter1.name}`
            })
        }
        if (this.props.filter2 && this.props.filter2.name !== prevProps.filter2.name) {
            this.setState({
                filter2Text: `All ${this.props.filter2.name}`
            })
        }
    }
    
    /**
     * set the filter
     */
    setFilter = (databaseId, name, filter) => {
        window.analytics.track("Filter click", {
            filter: filter === 1 ? this.props.filter1.name : this.props.filter2.name,
            filterName: name
        })

        // Add or remove filter from array
        const selectedFilters = filter === 1 ? this.props.selectedFilters1 : this.props.selectedFilters2
        const newSelectedFilters = selectedFilters.includes(databaseId)
            ? selectedFilters.filter(i => i !== databaseId) // remove item
            : [ ...selectedFilters, databaseId ]; // add item

        // Update parent component filters so results update
        this.props.setFilters(newSelectedFilters, filter)

        // Update dropdown filter text
        if (filter === 1) {
            this.setState({
                filter1Text: newSelectedFilters.length > 0 ? `${this.props.filter1.name}` : `All ${this.props.filter1.name}`
            })
        } else {
            this.setState({
                filter2Text: newSelectedFilters.length > 0 ? `${this.props.filter2.name}` : `All ${this.props.filter2.name}`
            })
        }
    }

    resetFilters() {
        this.props.resetFilters()
        this.setState({
            filter1Text: `All ${this.props.filter1.name}`,
            filter2Text: `All ${this.props.filter2.name}`,
        })
    }

    render() {
        const { filter1, filter2, filter1Label, filter2Label} = this.props
        if ((filter1 && filter1.length > 0) || (filter2 && filter2.length > 0)) {
            return(
                <FilterBar>
                    <div className="filter-title">Filter by</div>
    
                    {filter1 && filter1.length > 0 && 
                        <ListingFilterDropdown
                            filter={1}
                            filterLabel={filter1Label}
                            filterText={this.state.filter1Text}
                            filters={filter1}
                            setFilter={this.setFilter}
                            selectedFilters={this.props.selectedFilters1}
                        />
                    }
                    
                    {filter2 && filter2.length > 0 && 
                        <ListingFilterDropdown
                            filter={2}
                            filterLabel={filter2Label}
                            filterText={this.state.filter2Text}
                            filters={filter2}
                            setFilter={this.setFilter}
                            selectedFilters={this.props.selectedFilters2}
                        />
                    }
    
                    {(this.props.selectedFilters1.length > 0 || this.props.selectedFilters2.length > 0) &&
                        <Button as="button" onClick={this.resetFilters} color="black" className="filter-reset">
                            <span>Reset Filters</span>
                        </Button>
                    }
                </FilterBar>
            )
        } else {
            return ""
        }
    }
}

export default ListingFilterBar