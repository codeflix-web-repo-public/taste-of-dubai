import React from "react"
import { Container } from "reactstrap"
import ReactPlayer from "react-player"
import BlockTitle from "components/shared/BlockTitle"

const VideoBlock = (props) => {
    const { title, video } = props.block
    if (video !== null) {
        return (
            <Container className="py-4">
                {title && 
                    <BlockTitle>
                        {title}
                    </BlockTitle>
                }
                <ReactPlayer 
                    url={video} 
                    controls={true} 
                    className="embed-responsive embed-responsive-16by9" 
                    width="100%" 
                    height="auto" 
                />
                {/* {props.data.caption &&
                    <figcaption><p dangerouslySetInnerHTML={{ __html: props.data.caption }} /></figcaption>
                } */}
            </Container>
        )
    }
    return ""
}

export default VideoBlock