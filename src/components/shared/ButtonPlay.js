import React from "react"
import styled from "styled-components"

const ButtonPlayStyled = styled.button`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    border: 0;
    width: 0;
	height: 0;
	background: transparent;
	border-style: solid;
	border-width: 30px 0 30px 30px;
	border-color: transparent transparent transparent rgba(255,255,255,.8);

    &:hover {
		border-color: transparent transparent transparent #fff;
    } 
`

const ButtonPlay = (props) => (
    <ButtonPlayStyled href={props.url}>
    </ButtonPlayStyled>
)


export default ButtonPlay