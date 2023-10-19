import React from "react"
import MasonryWall from "components/shared/MasonryWall"
import MenuListingItem from "./MenuListingItem"

const ListingMenus = (props) => {
    return(  
        <MasonryWall>
            {props.items.map(({node}, i) => {
                return(
                    <MenuListingItem data={node} key={i}/>
                )
            })}
        </MasonryWall>
    )
}

export default ListingMenus