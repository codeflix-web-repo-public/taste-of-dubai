import React, { Component } from "react"
import styled, { css } from "styled-components"
import moment from "moment"
import { Row, Col, UncontrolledCollapse } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp, faClock } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"
import { media } from "utils/Media"
import ContainerMax from "components/shared/ContainerMax"
import ContentMax from "components/shared/ContentMax"
import FilterBar from "components/shared/FilterBar"
import WPLink from "components/shared/WPLink"

const FilterBarStyled = styled(FilterBar)`
    background-color: ${props => props.theme.colors.purple};
    padding: .75rem 1rem;

    .filter-title {
        display: block;
        width: 100%;
        text-align: center;
        padding: .5rem;

        @media ${media.md} {
            width: auto;
            text-align: left;
            padding: 0;
            padding-right: 1rem;
        }
    }
`

const WeekButton = styled.button`
    padding: .5rem 1rem;
    background: black;
    color: white;
    border: 0;
    text-transform: uppercase;
    font-size: ${props => props.theme.font.size.sm};
    font-family: ${props => props.theme.font.family.bold};
    width: 100%;
    margin-bottom: 1rem;

    &:last-child {
        margin-bottom: 0;
    }
    
    @media ${media.md} {
        margin-right: 1rem;
        margin-bottom: 0;
        width: auto;
    }

    ${props => props.active && css`
        background: white;
        color: black;
    `}
`

const WeekDays = styled.div`
    /* padding: 1rem; */
    display: flex;
    justify-content: space-between;

    .day {
        width: 100%;
        border: 0;
        display: block;
        padding: 0;
        background: 0;
        
        .day-name {
            display: block;
            background: black;
            padding: .5rem 1rem;
            color: white;
            text-align: center;
            text-transform: uppercase;
            font-family: ${props => props.theme.font.family.bold};
        }

        .day-date {
            display: flex;
            justify-content: center;
            text-align: center;
            padding: .5rem;
            position: relative;

            span {
                z-index: 2;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-family: ${props => props.theme.font.family.bold};
            }
        }

        &.active {
            .day-date {
                span {
                    background-color: ${props => props.theme.colors.secondary};
                }
            }
        }
    }
`

const WeekTab = styled.div`
    display: none;

    ${props => props.active && css`
        display: block;
    `}
`

const Day = styled.div`
    display: none;

    ${props => props.active && css`
        display: block;
    `}
`

const EventGroup = styled.div`
    display: none;

    @media ${media.md} {
        display: block;
    }

    &.active {
        display: block;
    }

    .title {
        background-color: ${props => props.theme.colors.primary};
        text-align: center;
        text-transform: uppercase;
        font-family: ${props => props.theme.font.family.bold};
        font-size: ${props => props.theme.font.size.base};
        color: white;
        padding: .5rem;
        /* display: none; */

        @media ${media.md} {
            display: block;
        }
    }

    .events {
        margin-top: 2rem;
        border-top: 1px solid ${props => props.theme.colors.primary};

        .event {
            padding: 1rem;
            border-bottom: 1px solid ${props => props.theme.colors.primary};
            font-size: ${props => props.theme.font.size.base};

            h4 {
                text-transform: uppercase;
                font-size: ${props => props.theme.font.size.base};
                margin-bottom: .5rem;
            }

            .event-link {
                text-transform: uppercase;
                color: ${props => props.theme.colors.tertiary};
                font-size: ${props => props.theme.font.size.sm};
                text-decoration: none;
                font-family: ${props => props.theme.font.family.bold};
                margin-top: .5rem;
                display: inline-block;
            }

            .event-timings {
                padding: 1rem 0 .5rem 0;
            }

            .event-timing {
                display: flex;
                font-family: ${props => props.theme.font.family.bold};
                /* font-size: ${props => props.theme.font.size.sm}; */
                padding-top: .5rem;
            }
        }
    }
`

const EventsButton = styled.button`
    width: 100%;
    display: block;
    text-align: left;
    border: 0;
    padding: .75rem;
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.font.family.bold};
    font-size: ${props => props.theme.font.size.sm};
    text-transform: uppercase;
    position: relative;
    background-color: rgb(239, 239, 239);

    .angle {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%) rotate(0);
        color: black;
        font-size: 1.25rem;
    }

    &.active {
        .angle {
            transform: translateY(-50%) rotate(-180deg);
        }
    }
`

const SelectSession = styled.div`
    padding: .5rem;
    margin-top: .5rem;
    margin-bottom: 1rem;
    border: 3px solid ${props => props.theme.colors.purple};
    font-size: ${props => props.theme.font.size.sm};

    @media ${media.md} {
        display: none;
    }

    .sessions-title {
        width: 100%;
        text-align: left;
        background-color: transparent;
        border: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-transform: uppercase;
        font-family: ${props => props.theme.font.family.bold};

        svg {
            font-size: 1.5rem;
        }
    }

    .sessions {
        display: none;

        button {
            display: block;
            background-color: transparent;
            border: 0;
            padding: .75rem 0 0 0;
            text-transform: uppercase;
        }
    }

    &.active {
        .sessions {
            display: block;
        }
    }
`

class Schedule extends Component {

    constructor(props) {
        super(props)

        this.state = {
            activeWeek: 0,
            activeDay: 0,
            sessionsDropdown: false
        }

        this.checkDate = this.checkDate.bind(this)
        this.setActiveSession = this.setActiveSession.bind(this)
        this.setEventGroup = this.setEventGroup.bind(this)
        this.changeWeek = this.changeWeek.bind(this)
        this.changeDay = this.changeDay.bind(this)
        this.toggleActive = this.toggleActive.bind(this)
        this.toggleSessionsDropdown = this.toggleSessionsDropdown.bind(this)
    }

    componentDidMount() {
        this.checkDate()
        this.setActiveSession()
    }

    // If todays date is equal to day in schedule make it selected
    checkDate() {
        const todayDate = moment().format('MMMM D, YYYY')
        const { weeks } = this.props.block

        weeks && weeks.forEach((week, wi) => {
            week.acfSchedule.day.forEach((day, di) => {
                const date = moment(day.date).format('MMMM D, YYYY')
                if (date === todayDate) {
                    this.changeWeek(wi)
                    this.changeDay(di)
                }
            })
        })
    }

    setActiveSession() {
        let sessions = []
        const { weeks } = this.props.block

        weeks && weeks.forEach((week, wi) => {
            sessions[wi] = sessions[wi] === undefined ? [] : sessions[wi]
            week.acfSchedule.day.forEach((day, di) => {
                sessions[wi][di] = 0
            })
        })

        this.setState({
            sessions
        })
    }

    setEventGroup(wi, di, egi) {
        let { sessions } = this.state

        sessions[wi][di] = egi

        this.setState({
            sessions
        })

        this.toggleSessionsDropdown()
    }

    toggleSessionsDropdown() {
        this.setState({
            toggleSessionsDropdown: !this.state.toggleSessionsDropdown
        })
    }

    changeWeek(activeWeek) {
        this.setState({
            activeWeek,
            activeDay: 0
        })
    }

    changeDay(activeDay) {
        this.setState({
            activeDay
        })
    }

    toggleActive(id) {
        const idState = this.state[id] === undefined || !this.state[id] ? true : false
        this.setState({
            [id]: idState
        })
    }

    render() {
        const { weeks } = this.props.block
        return (
            <ContainerMax className="py-4">
                <ContentMax>
                    <FilterBarStyled>
                        <div className="filter-title">Select week</div>
                        {weeks && weeks.map((week, i) => {
                            return (
                                <WeekButton
                                    active={i === this.state.activeWeek}
                                    onClick={() => this.changeWeek(i)}
                                    key={i}
                                >
                                    {week.title}
                                </WeekButton>
                            )
                        })}
                    </FilterBarStyled>

                    {weeks && weeks.map((week, wi) => {
                        const { acfSchedule } = week
                        return (
                            <WeekTab active={wi === this.state.activeWeek} key={wi}>
                                <WeekDays>
                                    {acfSchedule.day && acfSchedule.day.map((day, i) => {
                                        const dayDate = moment(day.date, 'DD/MM/YYYY').format('D') // e.g 12
                                        const shortDay = moment(day.date, 'DD/MM/YYYY').format('ddd') // e.g Fri
                                        return (
                                            <button
                                                className={`day ${i === this.state.activeDay ? "active" : ""}`}
                                                key={i}
                                                onClick={() => this.changeDay(i)}
                                            >
                                                <span className="day-name">
                                                    {day.dayShortName ? day.dayShortName : shortDay}
                                                </span>
                                                <span className="day-date">
                                                    <span>{dayDate}</span>
                                                </span>
                                            </button>
                                        )
                                    })}
                                </WeekDays>

                                {acfSchedule.day && acfSchedule.day.map((day, i) => {
                                    return (
                                        <Day active={i === this.state.activeDay} key={`day-${i}`}>

                                            {day.eventGroup.length > 1 &&
                                                <SelectSession className={classNames({
                                                    active: this.state.toggleSessionsDropdown
                                                })}>
                                                    <button
                                                        className="sessions-title"
                                                        onClick={this.toggleSessionsDropdown}
                                                    >
                                                        Select Session
                                                        {this.state.toggleSessionsDropdown ? (
                                                            <FontAwesomeIcon icon={faAngleUp} />
                                                        ) : (
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        )}

                                                    </button>
                                                    <div className="sessions">
                                                        {day.eventGroup && day.eventGroup.map((eg, egi) => {
                                                            return (
                                                                <button onClick={() => this.setEventGroup(wi, i, egi)}>{eg.title}</button>
                                                            )
                                                        })}
                                                    </div>
                                                </SelectSession>
                                            }

                                            <Row>
                                                {day.eventGroup && day.eventGroup.map((eg, egi) => {
                                                    return (
                                                        <Col md={6} key={egi} className="mb-md-3">
                                                            <EventGroup
                                                                className={classNames({
                                                                    active: this.state.sessions && this.state.sessions[wi][i] === egi
                                                                })}
                                                            >
                                                                <div className="title">
                                                                    {eg.title}
                                                                </div>
                                                                <div className="events">
                                                                    {eg.events && eg.events.map((event, i) => {
                                                                        const id = `toggler${egi}${i}`
                                                                        return (
                                                                            <div className="event" key={i}>
                                                                                <h4>{event.name}</h4>
                                                                                <div dangerouslySetInnerHTML={{ __html: event.description }} />

                                                                                {event.timings &&
                                                                                    <div className="event-timings">
                                                                                        <EventsButton
                                                                                            id={id}
                                                                                            onClick={() => this.toggleActive(id)}
                                                                                            className={classNames({
                                                                                                active: this.state[id]
                                                                                            })}
                                                                                        >
                                                                                            <FontAwesomeIcon icon={faClock} className="mr-1" />
                                                                                            {event.timingsTitle}
                                                                                            <FontAwesomeIcon icon={faAngleDown} className="angle" />
                                                                                        </EventsButton>
                                                                                        <UncontrolledCollapse toggler={`#${id}`}>
                                                                                            {event.timings.map((timing, i) => {
                                                                                                return (
                                                                                                    <div className="event-timing">
                                                                                                        <div>{timing.time}: &nbsp;</div>
                                                                                                        <div>{timing.title}</div>
                                                                                                    </div>
                                                                                                )
                                                                                            })}
                                                                                        </UncontrolledCollapse>
                                                                                    </div>
                                                                                }

                                                                                {event.eventLink &&
                                                                                    <WPLink
                                                                                        url={event.eventLink.url}
                                                                                        target={event.eventLink.target}
                                                                                        className="event-link"
                                                                                    >
                                                                                        {event.eventLink.title}
                                                                                    </WPLink>
                                                                                }
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </EventGroup>
                                                        </Col>
                                                    )
                                                })}
                                            </Row>
                                        </Day>
                                    )
                                })}
                            </WeekTab>
                        )
                    })}
                </ContentMax>
            </ContainerMax>
        )
    }
}

export default Schedule
