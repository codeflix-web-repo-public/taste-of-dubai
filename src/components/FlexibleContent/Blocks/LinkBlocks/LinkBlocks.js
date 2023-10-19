import React from "react"
import { Row, Col } from "reactstrap"
import ContainerMax from "components/shared/ContainerMax"
import SidebarBlock from "components/shared/SidebarBlock"
import Block5 from "./Block5"

const LinkBlocks = (props) => {
    const { block } = props
    return (
        <ContainerMax maxWidth="1920">
            <Row>
                <Col lg={{order: 2, size: 6}}>
                    <Block5 data={props.block.block5} />
                </Col>
                <Col lg={{order: 1, size: 6}}>
                    <Row>
                        <Col sm={6} className="pb-3 p-sm-0">
                            <SidebarBlock data={block.block1} type="linkblock" id={props.block.block1.databaseId} />
                        </Col>
                        <Col sm={6} className="pb-3 p-sm-0">
                            <SidebarBlock data={block.block2} type="linkblock" id={props.block.block2.databaseId} />
                        </Col>
                        <Col sm={6} className="pb-3 p-sm-0">
                            <SidebarBlock data={block.block3} type="linkblock" id={props.block.block3.databaseId} />
                        </Col>
                        <Col sm={6} className="pb-3 p-sm-0">
                            <SidebarBlock data={block.block4} type="linkblock" id={props.block.block4.databaseId} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ContainerMax>
    )
}


export default LinkBlocks