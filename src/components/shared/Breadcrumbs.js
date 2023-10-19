import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { media } from "utils/Media"

const BreadcrumbWrap = styled.div`
    display: flex;
    color:  ${props => props.theme.colors.themeTitle};
    padding-top: 1rem;

    @media ${media.md} {
        padding-top: 2rem;
    }

    @media ${media.lg} {
        padding-left: 15px;
    }

    @media (min-width: 1600px) {
        /* margin-left: -3.5rem; */
    }

    div {
        display: flex;
        align-items: center;

        a {
            text-transform: capitalize;
            padding: 0 .5rem;
            color:  ${props => props.theme.colors.purple};
            text-decoration: none;
            font-size: ${props => props.theme.font.size.base};
        }

        svg {
            font-size: 1.5rem;
        }

        &:last-child {
            a {
                font-family: ${props => props.theme.font.family.bold};
            }
        }
    }
`

const Breadcrumbs = (props) => {
    const links = props.breadcrumbs && props.breadcrumbs.map((part, i) => {
        let url = part.url
        if (url.indexOf("http") >= 0) {
            url = new URL(part.url).pathname
        }

        return(
            <div key={i}>
                <Link to={url}>
                    <span dangerouslySetInnerHTML={{ __html: part.text }} />
                </Link>
                {i+1 !== props.breadcrumbs.length && 
                    <>|</>
                }
            </div>
        )
    })

    return(
        <BreadcrumbWrap>
            <div>
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            {links}
        </BreadcrumbWrap>
    )
}

export default Breadcrumbs