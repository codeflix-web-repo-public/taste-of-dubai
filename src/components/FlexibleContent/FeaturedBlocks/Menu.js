import React from "react"
import { Container } from "reactstrap"
import BlockTitle from "components/shared/BlockTitle"
import MenuTable from "components/shared/MenuTable"
import Text from "components/shared/Text"

const Menu = (props) => {
    const { title, menu } = props.block
    console.log(menu)
    return(
        <Container fluid>
            {title && 
                <BlockTitle template="featured">{title}</BlockTitle> 
            }
            {menu && menu.map((menu, i) => {
                return(
                    <div key={i} className="pb-3">
                        <Text uppercase tertiary bold className="mb-1" md>{menu.title}</Text>
                        <MenuTable items={menu.acfMenu.items} />
                    </div>
                )
            })}
        </Container>
    )
}

export default Menu