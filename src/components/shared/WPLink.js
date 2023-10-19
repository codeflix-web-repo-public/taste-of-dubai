import React from "react"
// import { Link, useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { LinkDetect } from "utils/LinkDetect"
import Button from "components/shared/Button"

const WPLink = (props) => {
    const link = LinkDetect(props.url)
    const content = props.title || props.children
    const onClick = props.onClick ? props.onClick : () => {}

    // Check if internal link
    if (link.type === "internal") {

        if (props.button) {
            // styled button
            return (
                <Button as={Link} to={link.url} color={props.color} className={props.className} onClick={onClick}>
                    <span>{content}</span>
                </Button>
            )
        } else {
            // simple link
            return (
                <Link to={link.url} className={props.className} onClick={onClick}>
                    <span>{content}</span>
                </Link>
            )
        }

    } else {
        if (props.button) {
            // styled button with target
            return (
                <Button href={props.url} target="_blank" rel="noopener noreferrer" color={props.color} className={props.className} onClick={onClick}>
                    <span>{content}</span>
                </Button>
            )
        } else {
            // simple link with target
            return (
                <a href={props.url} target="_blank" rel="noopener noreferrer" className={props.className} onClick={onClick}>
                    <span>{content}</span>
                </a>
            )
        }
    }
}

WPLink.defaultProps = {
    button: false
}

export default WPLink