import React, { useState } from "react"
import styled from "styled-components"
import { Container, Row, Col, Modal, ModalBody } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { media } from "utils/Media"
import Button from "components/shared/Button"
import Text from "components/shared/Text"
import BlockTitle from "components/shared/BlockTitle"

const Close = styled.button`
	background: transparent;
	border: 0;
	position: absolute;
	z-index: 1;
	right: 0;
	top: 0;
	display: block;
	color: ${props => props.theme.colors.black};
    font-size: 1.5rem;

    @media ${media.md} {
        right: -.5rem;
	    top: -.75rem;
    }
    @media ${media.lg} {
        right: -1rem;
	    top: -1.5rem;
    }
`

const TextWithPopupButton = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const { block } = props
    return(
        <Container className="py-4" fluid>
            <Row>
                <Col xs={12}>
                    {block.title &&
                        <BlockTitle template="featured">{block.title}</BlockTitle>   
                    }
                    {block.text &&
                        <div dangerouslySetInnerHTML={{ __html: block.text }} />
                    }
                </Col>
                <Col xs={12} className="pt-3">
                    <Button as="button" color="black" onClick={toggle}>
                        <span>{block.buttonText}</span>
                    </Button>
                </Col>
            </Row>

            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalBody>
                    <Close onClick={toggle}>
                        <FontAwesomeIcon icon={faTimes} />
                        <span className="sr-only">Close</span>
                    </Close>
                    <Text bold lg primary uppercase>{block.popupTitle}</Text>
                    <div dangerouslySetInnerHTML={{ __html: block.popupText }} />
                </ModalBody>
            </Modal>
        </Container>
    )
}

export default TextWithPopupButton