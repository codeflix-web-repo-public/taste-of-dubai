
import React, { Component } from "react"
import styled, { css } from "styled-components"
import { media } from "utils/Media"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import FilterDropdown from "components/shared/FilterDropdown"
import WPLink from "components/shared/WPLink"
import classNames from "classnames"

const TickeyHospitalityBlock = styled.div`
	background: ${props => props.theme.colors.white};
	color: ${props => props.theme.colors.black};
	text-align: center;
	position: relative;
	z-index: 10;
	height: 100%;

	${props => props.dropdownActive && css`
		z-index: 11;
	`}

	&:before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: black;
		left: .5rem;
		top: .5rem;
		z-index: 1;
	}

	h4 {
		margin: 0;
		font-family: ${props => props.theme.font.family.black};
		font-size: ${props => props.theme.font.size.xxl};
		color: ${props => props.theme.colors.black};
		text-transform: uppercase;
	}
	
	p.description {
		font-size: ${props => props.theme.font.size.base};
		line-height: 1.5;
		margin: 21px 0;
		font-family: ${props => props.theme.font.family.base};
	}
	
	.subtitle {
		font-family: ${props => props.theme.font.family.black};
		font-size: ${props => props.theme.font.size.lg};
		color: ${props => props.theme.colors.black};
		text-transform: uppercase;
		margin: 0;
	}

	.price {
		margin-bottom: 1rem;
		margin: 0 auto;
		display: none;

		&.active {
			display: block;
		}

		.price-text {
			font-size: 3.5rem;
			font-family: ${props => props.theme.font.family.black};
			line-height: 1; 

			&.price--small {
				font-size: 1.5rem;
				line-height: 3;
			}   
		}
	}
	
	.booking-links {
		a {
			margin-top: 1rem;
			width: 100%;
		}
	}

	.package-details {
		margin: 14px 0 0;
		background-color: ${props => props.theme.colors.white};
		text-align: left;

	    @media ${media.md} {
  			position: relative;
	    }  

		.title {
			color: ${props => props.theme.colors.primary};
			font-size: ${props => props.theme.font.size.sm};
			font-family: ${props => props.theme.font.family.bold};
			text-transform: uppercase;
		}

		ul {
			padding: 0;
			margin: 0;
			text-align: left;
			background-color: ${props => props.theme.colors.white};
			list-style: none;

			li {
				padding: .25rem 0;
				position: relative;
				padding-left: 20px;

				&:before {
					content: "";
					position: absolute;
					height: 9px;
					width: 9px;
					left: 0;
					top: .85rem;
					background-color: ${props => props.theme.colors.primary};
				}

				.ticket-tooltip {
					margin-left: .5rem;
					color: ${props => props.theme.colors.primary};
					cursor: pointer;
					display: inline-block;
				}

				.text {
					display: inline-block;
					p {
					    font-size: 0.875rem;/*14*/
					    line-height: 1.5;
					    color:  ${props => props.theme.colors.black};
						
					    i,em {
					    	font-family: ${props => props.theme.font.family.italic};
					    }
					    strong,b {
					    	font-family: ${props => props.theme.font.family.bold};
					    }
					  	a {
					  		text-decoration: underline;
					  	}
					}
				}
			}
		}
    }
`

const TicketInner = styled.div`
	position: relative;
	z-index: 2;
	background-color: white;
	padding: 2rem;
	height: 100%;

	@media ${media.md} {
		padding: 4rem 3rem;
	}

	@media ${media.lg} {
		padding: 2rem;
	}

	@media ${media.xl} {
		padding: 4rem 3rem;
	}

	${props => props.highlight && css`
		border: 8px solid ${props => props.theme.colors.secondary};

		&:before,
		&:after {
			content: "${props.highlight}";
			position: absolute;
			bottom: calc(100% +  4px);
			background-color: ${props => props.theme.colors.secondary};
			font-size: ${props => props.theme.font.size.sm};
			font-family: ${props => props.theme.font.family.bold};
			padding: .25rem .5rem;
			left: 1rem;
		}

		&:after {
			top: calc(100% +  4px);
			bottom: auto;
			right: 1rem;
			left: auto;
		}
	`}
`

const UncontrolledTooltipStyled = styled(UncontrolledTooltip)`
	.tooltip .tooltip-inner {
		p {
			font-size: 0.8rem !important;
		}
		a {
			color: white !important;
		}
	}
`

export default class TicketHospitality extends Component {	
    constructor(props) {
        super(props)
        this.state = {
            detailsOpen: false,
			activePrice: 0,
			dropdownActive: false
        }

		this.dropdownToggle = this.dropdownToggle.bind(this)
    }

	componentDidMount() {
		const infoIcons = document.getElementsByClassName("ticket-tooltip")

		for (let infoIcon of infoIcons) {
			const sibling = infoIcon.previousElementSibling
			if (sibling) {
				sibling.appendChild(infoIcon)
			}
		}

		//set price title for filter
		if (this.props.data.acfTickets.prices && this.props.data.acfTickets.prices[0]) {
			this.setState({
				priceTitle: "Select session",
				priceLink: false
			})
		}
	}

    toggleDetails = () => {
    	this.setState({ detailsOpen: !this.state.detailsOpen });
    }

	togglePrice(price, title, link) {
		this.setState({
			activePrice: price,
			priceTitle: title,
			priceLink: link
		})
	}

	dropdownToggle() {
		this.setState({
			dropdownActive: !this.state.dropdownActive
		})
	}

	trackTicketClick(ticketName, buttonText, buttonLink) {
		window.analytics.track("Tickets button click", {
			ticketName: ticketName,
			buttonText: buttonText,
			buttonLink: buttonLink
		})
	}

	render() {
		const data = this.props.data
		return (
	        <TickeyHospitalityBlock dropdownActive={this.state.dropdownActive}>
	            <TicketInner highlight={data.acfTickets.highlight}>
					<h4 dangerouslySetInnerHTML={{ __html: data.title }} />
					{data.acfTickets.description &&
						<p className="description" dangerouslySetInnerHTML={{ __html: data.acfTickets.description }} />
					}
					
					{data.acfTickets.prices && data.acfTickets.prices.map((price, i) => (
						<div 
							key={i}
							className={classNames({
								price: true,
								active: this.state.activePrice === i
							})}
						>
							{price.subtitle && 
								<p className="subtitle" dangerouslySetInnerHTML={{ __html: price.subtitle  }} />
							}
							{ price.price === "SOLD OUT" ? (
								<p className="price-text price--small" dangerouslySetInnerHTML={{ __html: price.price }} />
							) : (
								<p className="price-text" dangerouslySetInnerHTML={{ __html: price.price }} />
							)}
						</div>
					))}

					{this.props.displayIncludes === "yes" && data.acfTickets.accordion && data.acfTickets.accordion.length>0 &&
						<div className='package-details'>
							<p className="title m-0">{data.acfTickets.packageDetailsTitle}</p>
							<ul>
								{data.acfTickets.accordion.map((item, i) => {
									const id = `${this.props.id}tooltip${i}`
									const text = item.tooltip 
									? `${item.text}<span id="${id}" class="ticket-tooltip"><span class="sr-only">More information</span>${infoSvg}</span>` 
									: item.text
									return(
										<li key={i}>
											<div className="text" dangerouslySetInnerHTML={{ __html: text }} />
											{item.tooltip && 
												<UncontrolledTooltipStyled placement="top" target={id} autohide={false}>
													<span dangerouslySetInnerHTML={{ __html: item.tooltip }} />
												</UncontrolledTooltipStyled>
											}
										</li>
									)
								})}
							</ul>
						</div>
					}

					{data.acfTickets.prices && data.acfTickets.prices.length > 1 ? (
						<>
							<FilterDropdown isOpen={this.state.dropdownActive} toggle={this.dropdownToggle} as={Dropdown} className="fullWidth">
								<DropdownToggle caret onClick={this.toggleZindex}>
									{this.state.priceTitle}
									<FontAwesomeIcon icon={faAngleDown} />
								</DropdownToggle>
								
								<DropdownMenu flip={false}>
									{data.acfTickets.prices && data.acfTickets.prices.map((price, i) => {
										let link = price.link
										// add cross domain tracking to external links
										if (typeof window !== "undefined") {
											if (window.analytics && typeof window.analytics.user !== "undefined") {
												// if (!href.includes(domain) && href.substring(0, 1) !== "/" && href.substring(0, 1) !== "#") {
												if (link.url.includes("seetickets") && link.url.substring(0, 1) !== "/" && link.url.substring(0, 1) !== "#") {
														const id = window.analytics.user().anonymousId()
														link.url = `${link.url}?ajs_aid=${id}`
												}
											}
										}
									
										return (
											<DropdownItem key={i} onClick={() => this.togglePrice(i, price.session, link)}>
												{price.session}
											</DropdownItem>
										)
									})}
								</DropdownMenu>
							</FilterDropdown>
							{this.state.priceLink && this.state.priceLink.url &&
								<div className="booking-links">
									<WPLink 
										url={this.state.priceLink.url} 
										target={this.state.priceLink.target} 
										button 
										color="black" 
										onClick={() => this.trackTicketClick(this.state.priceTitle, this.state.priceLink.title, this.state.priceLink.url)}
									>
										{this.state.priceLink.title}
									</WPLink>
								</div>
							}
						</>
					) : (
						<div className="booking-links">
							{data.acfTickets.links && data.acfTickets.links.map((link, i) => {
								if (link.__typename==='WpTicket_Acftickets_Links_UrlLink') {
									return (
										<WPLink 
											url={link.link.url} 
											target={link.link.target} 
											button 
											color="black" 
											key={i} 
											onClick={() => this.trackTicketClick(data.title, link.link.title, link.link.url)}
										>
											{link.link.title}
										</WPLink>
									)
								} else if (link.__typename==='WpTicket_Acftickets_Links_PdfDownload') {
									return (
										<WPLink 
											url={link.file.localFile.publicURL} 
											target="_blank" 
											button 
											color="black" 
											key={i} 
											onClick={() => this.trackTicketClick(data.title, link.link.title, link.file.localFile.publicURL)}
										>
											{link.buttonText}
										</WPLink>
									)
								}
								return null;
							})}
						</div>
					)}
				</TicketInner>			            	              
	        </TickeyHospitalityBlock>
		)
	}
}

const infoSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>`