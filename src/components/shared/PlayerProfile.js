/**
 * Player profile component
 * Used on player profile page and homepage
 */

import React, { Component } from "react"
import { Modal, ModalBody, Container, Row, Col } from 'reactstrap'; 
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp, faTimes } from "@fortawesome/free-solid-svg-icons"
import { faFacebookSquare, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import classNames from "classnames"
import { media } from "utils/Media"
import CustomImage from "components/shared/CustomImage";
import Button from "components/shared/Button"

const Player = styled.article`
	margin-bottom: 10px;
	position: relative;
	padding-bottom: 10px;

    @media ${media.md} {
	    margin-bottom: 25px;
    }

	.toggle {
		cursor: pointer;
	}

	button, span {
        border: 0;
		display: block;
        border-top: 2px solid ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
		position: relative;
        width: 100%;
        padding: .5rem 0;
		margin: 0;
        /* text-decoration: underline;  */
		text-transform: uppercase;
        text-align: left;
        font-size: ${props => props.theme.font.size.sm};
        font-family: ${props => props.theme.font.family.bold};
        background-repeat: no-repeat;
        background-position: right .5rem;
		background-color: transparent;
		padding-right: 35px;
	}

    .statsOpen & {
        opacity: .5;

        &.forceVisible {
            opacity: 1;
        }
    }

	.stats {
		position: absolute;
		top: calc(100% - 16px);
		left: 0;
		width: 100%;
		z-index: 2;
		background: #fff;
		.icon-arrow {
			outline: none;
			appearance: none;
			border-radius: 0;
			background: transparent;
			width: 100%;
			text-align: center;
			border: none;
			padding: 0;
			margin: 0;
			height: 10px;
			position: relative;
            color: ${props => props.theme.colors.primary};

			svg {
				width: 24px;
				height: 24px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
		.table-wrap {
			width: 100%;
			margin-top: 17px;
		    .table-row {
                display: flex;
                justify-content: space-between;
		  		div {
                    display: inline-block;
		  			font-size: .9rem;
  					line-height: 1.88;
  					color: #1D2E41;
					font-size: ${props => props.theme.font.size.xs};

		  			&:last-child {
		  				text-align: right;
		  			}
                      
		  			a {
		  				color: #1D2E41;
		  				margin-left: 10px;
		  			}
		  		}
		  		&:nth-child(odd) {
		  			background-color: ${props => props.theme.colors.grey4};
		  		}
                &:last-child {
                    background-color: transparent;
                }
		    }
		}
	}
`

// const ModalButton = styled.button`
// 	width: 100%;
// 	text-transform: uppercase;
// 	font-size: ${props => props.theme.font.size.sm};
// `

const ModalSyled = styled(Modal)`
	.modal-content {
		border-radius: 0;
		border: 0;
	}

	.modal-body {
		padding: 0;

		p {
			&:last-child {
				margin-bottom: 1.5rem;
			}
		}
	}

	.row {
		border-bottom: 2px solid ${props => props.theme.colors.primary};
	}
`

const Social = styled.div`
	padding: 1rem;
	a {
		margin-right: 15px;
		color: ${props => props.theme.colors.primary};
		font-size: 1.5rem;
	}
`

const Close = styled.button`
	background: transparent;
	border: 0;
	position: absolute;
	z-index: 1;
	right: 0;
	top: 0;
	display: block;
	color: ${props => props.theme.colors.primary};
`

const Title = styled.h2`
	font-family: ${props => props.theme.font.family.base};
`

class PlayerProfile extends Component {
	
    constructor(props) {
        super(props)

        this.state = {
			statsOpen: false,
			modal: false
		}
		
		this.toggleStats = this.toggleStats.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
    }

    toggleStats = () => {
		if (this.props.dropdownInfo) {
			this.setState({ statsOpen: !this.state.statsOpen });

			if (this.props.statsToggled !== false) this.props.statsToggled()
			this.setState({ 
				statsOpen: !this.state.statsOpen
			});
		}
    }

	toggleModal() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}
	
    render() {
        return <>
            <Player className={classNames({
                playerblock: true,
                forceVisible: this.state.statsOpen
            })}>
                <div 
                    onClick={this.toggleStats}
                    onKeyDown={this.toggleStats} 
                    role="button" 
                    tabIndex={0} 
                    className={classNames({
                        toggle: this.props.statsToggled !== false && this.props.dropdownInfo
                    })}
                >
                    { this.props.data.featuredImage.node !== undefined ? <CustomImage
                        image={this.props.data.featuredImage.node}
                         /> : null }
                </div>
                {this.props.dropdownInfo ? (
                    <button onClick={this.toggleStats} style={{ backgroundImage: `url("${this.props.flag !== null ? this.props.flag : ""}")` }}>
                        {this.props.data.title}
                    </button>
                ) : (
                    <span style={{ backgroundImage: `url("${this.props.flag !== null ? this.props.flag : ""}")` }}>
                        {this.props.data.title}
                    </span>
                )}

                {this.props.dropdownInfo && this.props.data.acfPlayers &&
                    <div className={this.state.statsOpen ? 'stats open' : 'stats'}>
                        {this.state.statsOpen && 
                            <div className="table-wrap">
                                {
                                    this.props.data.acfPlayers.height
                                    ? <div className="table-row">
                                        <div>Age</div>
                                        <div><strong>{this.props.data.acfPlayers.height}</strong></div>
                                    </div>
                                    : null
                                }
                                {
                                    this.props.data.acfPlayers.playerDob
                                    ? <div className="table-row">
                                        <div>DOB</div>
                                        <div><strong>{this.props.data.acfPlayers.playerDob}</strong></div>
                                    </div>
                                    : null
                                }
                                {
                                    this.props.data.acfPlayers.rolexRanking
                                    ? <div className="table-row">
                                        <div>Rolex ranking</div>
                                        <div><strong>{this.props.data.acfPlayers.rolexRanking}</strong></div>
                                    </div>
                                    : null
                                }
                                {
                                    this.props.data.acfPlayers.bestAtpRating
                                    ? <div className="table-row">
                                        <div>Turned pro</div>
                                        <div><strong>{this.props.data.acfPlayers.bestAtpRating}</strong></div>
                                    </div>
                                    : null
                                }
                                {
                                    this.props.data.acfPlayers.noOfTitles
                                    ? <div className="table-row">
                                        <div>No. of Titles</div>
                                        <div><strong>{this.props.data.acfPlayers.noOfTitles}</strong></div>
                                    </div>
                                    : null
                                }
                                {
                                    this.props.data.acfPlayers
                                    && (this.props.data.acfPlayers.facebook || this.props.data.acfPlayers.twitter || this.props.data.acfPlayers.instagram)
                                    ? <div className="table-row social">
                                        <div>SOCIAL</div>
                                        <div>
                                            {
                                                this.props.data.acfPlayers.facebook
                                                ? <a href={this.props.data.acfPlayers.facebook} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookSquare} /></a>
                                                : null
                                            }
                                            {
                                                this.props.data.acfPlayers.twitter
                                                ? <a href={this.props.data.acfPlayers.twitter} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                                                : null
                                            }
                                            {
                                                this.props.data.acfPlayers.instagram
                                                ? <a href={this.props.data.acfPlayers.instagram} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
                                                : null
                                            }
                                        </div>
                                    </div>
                                    : null
                                }
                                {this.props.data.acfPlayers.bio !== null && 
                                    <div className="table-row d-flex justify-content-center my-2">
                                        <Button onClick={this.toggleModal} color="transparentPrimary" small>READ bio</Button>
                                    </div>
                                }
                            </div>
                        }
                        <button className="icon-arrow" onClick={this.toggleStats}>
                            {this.state.statsOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                        </button>
                    </div>  
                }
            </Player>
            {this.props.dropdownInfo && this.props.data.acfPlayers && this.props.data.acfPlayers.bio !== null && 
                <ModalSyled 
                    isOpen={this.state.modal} 
                    toggle={this.toggleModal} 
                    centered={true} 
                    size="lg">
                    <ModalBody>
                        <Container fluid>
                            <Close onClick={this.toggleModal}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Close>
                            <Row>
                                <Col md={4} className="d-none d-md-block pl-0">
                                    { this.props.data.featuredImage.node !== undefined ? <CustomImage
                                        image={this.props.data.featuredImage.node}
                                        /> : null }
                                    <Social>
                                        {
                                            this.props.data.acfPlayers.facebook
                                            ? <a href={this.props.data.acfPlayers.facebook} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookSquare} /><span className="sr-only">Facebook</span></a>
                                            : null
                                        }
                                        {
                                            this.props.data.acfPlayers.twitter
                                            ? <a href={this.props.data.acfPlayers.twitter} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /><span className="sr-only">Twitter</span></a>
                                            : null
                                        }
                                        {
                                            this.props.data.acfPlayers.instagram
                                            ? <a href={this.props.data.acfPlayers.instagram} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /><span className="sr-only">Instagram</span></a>
                                            : null
                                        }
                                    </Social>
                                </Col>
                                <Col md={8}>
                                    <Title dangerouslySetInnerHTML={{ __html: this.props.data.title }} className="pt-4" />
                                    <div dangerouslySetInnerHTML={{ __html: this.props.data.acfPlayers.bio }} />
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </ModalSyled>
            }
        </>;
    }
}

export default PlayerProfile