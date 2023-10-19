import React, { Component } from "react"
import styled, { css } from "styled-components"
import { media } from "utils/Media"
import { Link } from "gatsby"
import Nav from "./Nav"
import HeaderCountdown from "./HeaderCountdown"
import ContainerMax from "components/shared/ContainerMax"
import Logo from "components/shared/Logo"

const NavBarWrap = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    transition: background-color .4s ease;

    @media ${media.md} {
        height: 100px;
    }

    &:after {
        content: "";
        position: absolute;
        top: 100%;
        height: 25px;
        width: 100%;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, .1), rgba(0, 0, 0, 0));

        ${props => props.navActive && css`
            display: none;
        `}
    }
`

const ContainerMaxStyled = styled(ContainerMax)`
    height: 100%;
    position: relative;
`

const NavBarToggle = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: 0;
    width: 30px;
    height: 25px;
    display: flex;
    flex-wrap: wrap;
    left: 1rem;
    padding: 0;

    @media ${media.lg} {
        left: auto;
        right: 30px;
        justify-content: flex-end;
    }

    span {
        position: absolute;
        height: 2px;
        width: 100%;
        background-color: ${props => props.theme.colors.white};
        left: 0;

        @media ${media.lg} {
            right: 0;
            left: auto;
        }

        &:nth-child(1) {
			top: 0;
		}

		&:nth-child(2) {
			top: 50%;
            width: 20px;
			transform: translateY(-50%);
		}

		&:nth-child(3) {
			bottom: 0;
            width: 15px;
		}
    }

    ${props => props.navActive && css`
        span {
			&:nth-child(1) {
				top: 50%;
                left: 50%;
                right: auto;
				transform: translate(-50%, -50%) rotate(-45deg);
			}

			&:nth-child(2) {
				opacity: 0;
			}

			&:nth-child(3) {
				top: 50%;
                width: 100%;
                left: 50%;
                right: auto;
				bottom: auto;
				transform: translate(-50%, -50%) rotate(45deg);
			}
		}
    `}
`

const LogoWrap = styled(Link)`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    text-align: center;

    img {
        width: 100px;

        @media ${media.md} {
            width: 200px;
        }
    }

    @media ${media.sm} {
        width: auto;
        text-align: left;
    }
`

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.toggleNavLogo = this.toggleNavLogo.bind(this)
    }

    toggleNavLogo() {
        if(this.props.navActive) {
            // document.body.classList.toggle('nav-active')
            this.props.toggleNav()
        }
    }

    render() {
        return (
            <NavBarWrap navActive={this.props.navActive}>
                <ContainerMaxStyled maxWidth="1600">
                    <HeaderCountdown navActive={this.props.navActive} />
    
                    <LogoWrap to={this.props.rootUrl} onClick={this.toggleNavLogo}>
                        <Logo />
                    </LogoWrap>
                    
                    <Nav 
                        path={this.props.path} 
                        navActive={this.props.navActive}
                    />
                    
                    <NavBarToggle 
                        onClick={this.props.toggleNav}
                        navActive={this.props.navActive}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </NavBarToggle>
                </ContainerMaxStyled>
            </NavBarWrap>
        )
    }
}

export default NavBar