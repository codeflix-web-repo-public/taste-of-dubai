import React from "react"
import { Modal, ModalBody } from "reactstrap"
import ReactPlayer from "react-player"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { media } from "utils/Media"

const ModalSyled = styled(Modal)`
    @media ${media.md} {
        max-width: 80%;
    }

	.modal-content {
		border-radius: 0;
		border: 0;
        background-color: transparent;
	}

	.modal-body {
		padding: 0;
	}
`
const Close = styled.button`
	background: transparent;
	border: 0;
	position: absolute;
	z-index: 1;
	right: 0;
	top: -3rem;
	display: block;
	color: ${props => props.theme.colors.white};
    font-size: 2rem;
`

const VideoOverlay = (props) => {
    return(
        <ModalSyled isOpen={props.active} toggle={props.toggleVideoOverlay} centered={true}>
            <ModalBody>
                <Close onClick={props.toggleVideoOverlay}>
                    <FontAwesomeIcon icon={faTimes} />
                    <span className="sr-only">Close</span>
                </Close>
                <div className="embed-responsive embed-responsive-16by9">
                    <ReactPlayer
                        url={props.url}
                        playing={true}
                        muted={false}
                        controls={true}
                        loop={false}
                        width="100%"
                        height="100%"
                        className="embed-responsive-item"
                    />
                </div>
            </ModalBody>
        </ModalSyled>
    )
}

export default VideoOverlay