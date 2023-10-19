import React from "react"
import { Container } from "reactstrap"
import { LinkSearchReplace } from "utils/LinkSearchReplace"
import TextBlockStyles from "components/shared/TextBlockStyles"

const TextBlock = (props) => {
    let text = props.data.text

    if (text) {
        // Wrap iframes with responsive div
        text = text.replace('<iframe', '<div class="embed-responsive embed-responsive-16by9"><iframe')
        text = text.replace('</iframe>', '</iframe></div>')

        return (
            <Container fluid className="pb-4">
                <TextBlockStyles dangerouslySetInnerHTML={{ __html: LinkSearchReplace(text) }} />
            </Container>
        )
    } else {
        return ""
    }
}

export default TextBlock