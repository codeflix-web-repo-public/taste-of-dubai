import React, { useContext } from "react"
import { StaticQuery, graphql } from "gatsby"
import styled, { css } from "styled-components"
import { media } from "utils/Media"
import Countdown from "react-countdown-now"
import { LanguageContext } from "utils/LanguageContext"
import Text from "components/shared/Text"

const CountdownStyled = styled.div`
    color: ${props => props.theme.colors.white};
    /* font-family: ${props => props.theme.font.family.bold}; */
    font-size: ${props => props.theme.font.size.sm};
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: none;
    padding-left: 15px;

    strong {
        color: ${props => props.theme.colors.white};
    }

    @media ${media.lg} {
        display: inline-block;
    }

    ${props => props.navActive && css`
        @media ${media.lg} {
            display: none;
        }
    `}
`

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return "";
    } else {
        // Render a countdown
        return(
            <>
                <strong>{days}</strong> DAYS &nbsp; <strong>{hours}</strong> HRS &nbsp; <strong>{minutes}</strong> MINS &nbsp; <strong>{seconds}</strong> SECS
            </>
        )
    }
};

const HeaderCountdown = (props) => {
    let date = props.data.headerCountdown && props.data.headerCountdown.split(',')

    if (date) {
        let year = date[0]
        let month = date[1] - 1
        let day = date[2]
        let minutes = date[3]
        let secs = date[4]
    
        date = new Date(year, month, day, minutes, secs)
    
        return (
            <CountdownStyled navActive={props.navActive}>
                {props.data.countdownText &&
                    <Text orangeDark bold uppercase className="mb-0"><strong>{props.data.countdownText}</strong></Text>
                }
                <Countdown
                    date={date}
                    renderer={renderer}
                />
            </CountdownStyled>
        )
    } else return ""
}

const HeaderCountdownExport = (props) => {
    const { currentLanguage } = useContext(LanguageContext)
    return(
        <StaticQuery
            query={graphql`
                query {
                    allWp {
                        edges {
                            node {
                                ...optionsFragment
                            }
                        }
                    }
                }
            `}
            render={data => {
                if (
                    data.allWp.edges[0].node[currentLanguage.code] &&
                    data.allWp.edges[0].node[currentLanguage.code].acfOptions.displayCountdown === "yes" && 
                    data.allWp.edges[0].node[currentLanguage.code].acfOptions.headerCountdown
                ) {
                    return (
                        <HeaderCountdown data={data.allWp.edges[0].node[currentLanguage.code].acfOptions} {...props} />
                    )
                } else {
                    return ""
                }
            }}
        />
    )
}

export default HeaderCountdownExport