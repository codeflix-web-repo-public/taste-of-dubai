import React, { Component } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import classNames from "classnames"
import NavFullNav from "./NavFullNav"

const NavFullWrap = styled.div`
    /* position: fixed; */
    width: 100vw;
    max-height: calc(100% - ${props => props.navTop});
    /* background: ${props => props.theme.colors.gradient}; */
    z-index: 600;
    top: ${props => props.navTop};
    left: 0;
    visibility: hidden;
    height: 0;
    opacity: 0;
    transition: opacity .4s ease;
    /* padding-top: 1.3rem; */
    overflow-y: auto;

    &.active {
        visibility: visible;
        opacity: 1;
        height: ${props => props.activeHeight};
    }
`

const NavFullInner = styled.div`
    width: 100%;
    min-height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

class NavFull extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeHeight: 0
        }
        this.toggle = this.toggle.bind(this)
        this.calcActiveHeight = this.calcActiveHeight.bind(this)
    }

    componentDidMount() {
        this.calcActiveHeight()
        window.addEventListener("resize", this.calcActiveHeight)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.calcActiveHeight)
    }


    toggle(e) {
        this.props.toggleNav(e)
        navigate("/")
    }

    calcActiveHeight() {
        const activeHeight = `${this.navInner.clientHeight}px`
        this.setState({
            activeHeight
        })
    }

    render() {
        return(
            <NavFullWrap 
                className={classNames({ active: this.props.active })} 
                navTop={this.props.navTop}
                activeHeight={this.state.activeHeight}
            >
                <NavFullInner ref={navInner => this.navInner = navInner}>
                    <NavFullNav />
                </NavFullInner>
            </NavFullWrap>
        )
    }
}

export default NavFull