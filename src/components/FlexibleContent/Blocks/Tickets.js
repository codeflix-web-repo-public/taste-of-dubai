import React from "react"
import { Container, Row, Col } from "reactstrap"
import styled, { css } from "styled-components"
import { media } from "utils/Media"
import ContainerWithGradient from "components/shared/ContainerWithGradient"
import TicketHospitality from "components/shared/TicketHospitality"
import WPLink from "components/shared/WPLink"
import bg from "images/tickets-bg.svg"

const TicketsStyled = styled.div`
	padding-top: 50px;
	/* padding-bottom: 24px; */
	/* background-color: ${props => props.theme.colors.grey4}; */

    @media ${media.md} {
		/* padding-bottom: 50px; */
    }	

	&.no-title {
		background: transparent;
		padding-top: 0;
		padding-bottom: 0;
		margin-top: 24px;
		margin-bottom: 24px;
	    @media ${media.md} {
			margin-top: 50px;
			/* margin-bottom: 50px; */
	    }	    
	    @media ${media.lg} {
			/* margin-bottom: 100px; */
	    }
	}

	h3 {
		font-size: 1.125rem;/*18*/
		font-family: ${props => props.theme.font.family.bold};
		color: ${props => props.theme.colors.black};
		line-height: 1.44;
		margin: 12px 0 16px;
		font-weight: 400;	
		
	    @media ${media.md} {
			font-size: 1.5rem;/*24*/
			margin: 45px 0 50px;
			line-height: 1.5;
	    }
	}

	/* @media ${media.md} {
		> .container {
			> .row {
				margin: 0 -10px;
				justify-content: center;
				> .col-md-4 {
					padding: 0 10px;
				}
			}
		}
	} */

	.bottomLink {
		position: absolute;
		bottom: -3rem;
	}
`

const Tickets = (props) => {
	return (
        <ContainerWithGradient
			className={`my-5 ${props.block.bottomLink && 'mb-5'}`} 
			smallPadding 
			bg={props.block.displayBackground === "yes" ? bg : false}
		>
            <TicketsStyled className={props.block.title ? '' : 'no-title'} maxWidth="1920">
                <Container fluid>
                    {/* {props.block.title ? <h3 dangerouslySetInnerHTML={{ __html: props.block.title }} />	: null } */}
                    <Row className="justify-content-center">
                        {props.block.tickets && props.block.tickets.map((node, i) => (
                            <Col sm={10} md={6} lg="4" key={i} className="pb-5">
                                <TicketHospitality 
									data={node} 
									key={i} 
									id={`ticket${i}`} 
									displayIncludes={props.block.displayIncludes}
								/>
                            </Col>
                        ))}
                    </Row>
					{props.block.bottomLink && 
						<WPLink url={props.block.bottomLink.url} target={props.block.bottomLink.target} button color="black" className="bottomLink">
							{props.block.bottomLink.title}
						</WPLink>
					}
                </Container>
            </TicketsStyled>
        </ContainerWithGradient>
	)
}


export default Tickets