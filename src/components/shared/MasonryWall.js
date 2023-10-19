import React from "react"
import Masonry from "react-masonry-css"
import styled from "styled-components"

const MasonryStyled = styled(Masonry)`
    display: flex;
    margin-left: -20px; /* gutter size offset */
    width: auto;
    
    .my-masonry-grid_column {
        padding-left: 20px; /* gutter size */
        background-clip: padding-box;
    }

    /* Style your items */
    .my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
        margin-bottom: 20px;
    }
`

const MasonryWall = (props) => {
    return(
        <MasonryStyled
            breakpointCols={props.breakpoints}
            columnClassName="my-masonry-grid_column"
        >
            {props.children}
        </MasonryStyled>
    )
}

MasonryWall.defaultProps = {
    breakpoints: {
        default: 4,
        1200: 3,
        768: 2,
        576: 1
    }
}

export default MasonryWall