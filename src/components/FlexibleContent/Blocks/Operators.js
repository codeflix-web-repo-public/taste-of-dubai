import React from "react"
import { Container, Row, Col } from "reactstrap"
import CustomImage from "components/shared/CustomImage"
import { LinkSearchReplace } from "utils/LinkSearchReplace"
import Text from "components/shared/Text"

const Operators = (props) => {
    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                {props.block.operators.map((operator, i) => {
                    return(
                        <React.Fragment key={i}>
                            <Col xs={12} sm={6} md={4} lg={3} className="pb-4 text-center">
                                <div style={{ position: "relative" }}>
                                    {operator.url !== null ? (
                                        <a href={operator.url} target="_blank" rel="noopener noreferrer">
                                            <CustomImage 
                                                image={operator.image} 
                                                style={{ maxWidth: "300px", margin: "0 auto" }} 
                                            />
                                        </a>
                                    ) : (
                                        <CustomImage 
                                            image={operator.image} 
                                            style={{ maxWidth: "300px", margin: "0 auto" }}  
                                        />
                                    )}
                                </div>
                                {operator.text !== null &&
                                    <Text as="div" dangerouslySetInnerHTML={{ __html: LinkSearchReplace(operator.text) }} className="pt-3 text-center" />
                                }
                            </Col>
                            {operator.lineBreak === "yes" &&
                                <div className="w-100"></div>
                            }
                        </React.Fragment>
                    )
                })}
            </Row>
        </Container>
    )
}

export default Operators