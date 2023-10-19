import React from "react"
import { Container } from "reactstrap"
import ReactPlayer from "react-player"

const VideoBlock = (props) => {
    if (props.data.video !== null) {
        return (
            <Container className="pb-4" fluid>
                <ReactPlayer 
                    url={props.data.video} 
                    controls={true} 
                    className="embed-responsive embed-responsive-16by9" 
                    width="100%" 
                    height="auto" 
                />
                {props.data.caption &&
                    <figcaption><p dangerouslySetInnerHTML={{ __html: props.data.caption }} /></figcaption>
                }
            </Container>
        )
    }
    return ""
}

export default VideoBlock