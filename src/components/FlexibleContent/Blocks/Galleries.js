import React, { Component } from "react"
import { DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import ContainerWithGradient from "components/shared/ContainerWithGradient"
import GalleryGrid from "components/shared/GalleryGrid"
import BlockTitle from "components/shared/BlockTitle"
import FilterBar from "components/shared/FilterBar"
import FilterDropdown from "components/shared/FilterDropdown"

class Galleries extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedGallery: "",
            filterText: "SELECT (ALL)",
            images: []
        }
    }

    componentDidMount() {
        this.setImages("SELECT (ALL)")
    }

    setImages(id) {
        let images = []

        if (id === "SELECT (ALL)") {
            this.props.block.galleries.forEach(gallery => {
                images.push(gallery.acfGalleries.images)
            })
        } else {
            images = this.props.block.galleries[id].acfGalleries.images
        }

        images = images.flat()

        this.setState({
            images
        })
    }

    setFilter(id, text) {
        this.setState({
            filter: id,
            filterText: text
        })

        const filter = id !== "" ? id : text

        this.setImages(filter)
    }

    render() {
        const { block } = this.props
        const  { galleries } = block

        const DropDown = (props) => {
            return(
                <FilterDropdown {...props}>
                    <DropdownToggle caret>
                        {this.state.filterText}
                        <FontAwesomeIcon icon={faAngleDown} />
                    </DropdownToggle>
                    
                    <DropdownMenu>
                        {this.state.filterText !== "SELECT (ALL)" && 
                            <DropdownItem 
                                onClick={() => this.setFilter("", "SELECT (ALL)")}
                            >
                                SELECT (ALL)
                            </DropdownItem>
                        }
                        {galleries && galleries.map((gallery, i) => {
                            if (this.state.filterText !== gallery.title) {
                                return (
                                    <DropdownItem 
                                        key={i}
                                        onClick={() => this.setFilter(i, gallery.title)}
                                    >
                                        {gallery.title}
                                    </DropdownItem>
                                )
                            } else return ""
                        })}
                    </DropdownMenu>
                </FilterDropdown>
            )
        }

        return(
            <ContainerWithGradient gradient={block.background === "colour" ? true : false} className="my-4">
                {block.title && 
                    <BlockTitle 
                        white={block.background === "colour" ? true : false} 
                        outline={block.background === "colour" ? true : false} 
                    >  
                        {block.title}
                    </BlockTitle>
                }
                {galleries.length > 1 &&
                    <>
                        {block.background === "white" ? (
                            <FilterBar>
                                <div className="filter-title">Filter by</div>
                                <DropDown />
                            </FilterBar>
                        ) : (
                            <DropDown className="pb-4" />
                        )}
                    </>
                }
                <GalleryGrid images={this.state.images} displayMore={true} />
            </ContainerWithGradient>
        )
    }
}

export default Galleries