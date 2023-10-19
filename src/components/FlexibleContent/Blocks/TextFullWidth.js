import React from "react"
import { Container, Row, Col } from "reactstrap"
import classNames from "classnames"
import styled from "styled-components"
import { LinkSearchReplace } from "utils/LinkSearchReplace"
import TextBlockStyles from "components/shared/TextBlockStyles"

const Text = styled.div`
    p {
        font-size: ${props => props.theme.font.size.base};
    }
`

const TextBlockFullWidth = (props) => {
    let text = props.block.text

    if (text) {
        // Wrap iframes with responsive div
        text = text.replace('<iframe', '<div class="embed-responsive embed-responsive-16by9"><iframe')
        text = text.replace('</iframe>', '</iframe></div>')

        return (
            <Container>
                <Row className={classNames({
                    "justify-content-center": true,
                    "py-4 py-md-5" : props.block.padding === "yes"
                })}>
                    <Col
                        xs={12}
                        md={props.block.width === "narrow" ? 10 : 12}
                    >
                        <TextBlockStyles>
                            <Text dangerouslySetInnerHTML={{ __html: LinkSearchReplace(text) }} />
                        </TextBlockStyles>
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return ""
    }
}

export default TextBlockFullWidth