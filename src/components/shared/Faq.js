import React, { Component } from "react"
import styled from "styled-components"
import { media } from "utils/Media";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faAngleDown } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const FaqContainer = styled.div`
	margin-bottom: 3em;
	.question {
	 	font-family: ${props => props.theme.font.family.medium};
	    font-size: 1.125rem;/*18*/
	    line-height: 1.33;
	    color: #1D2E41;
	    padding: 16px 0;
		border-top: solid 1px #ced9e5;
		padding-left: 47px;
		position: relative;
		cursor: pointer;
		svg.icon {
			font-size: 25px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 5px;
		}
		svg.arrow {
			font-size: 25px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 0;
		}
	}
	.answer {
		iframe {
			height: 288px;
			width: 100%;
		    @media ${media.md} {
				height: 300px;
		    }
		    @media ${media.lg} {
				height: 330px;
		    }
		}
	}
`

export default class FaqBlock extends Component {

  constructor(props) {
    super(props);
	this.state = { 
	  openIndex : null
	};
  }

  setOpenIndex = (index) => {
	if (this.state.openIndex === index) {
		index = null;
	}
  	this.setState({ openIndex: index });
  }

  render() {
	  
      return (
    	  <FaqContainer>
	    	  {this.props.data.faq && this.props.data.faq.map((faq, i) => {
	    		
	    		var icon = null;
	    		if (faq.icon) {
	    			icon = faq.icon.replace('fas fa-', '');
	    		}
	      		return <div className="faq-row" key={i}>
	      			<div className="question" onClick={() => this.setOpenIndex(i)}>
	                      {icon &&
	                      	<FontAwesomeIcon className="icon" icon={['fas', icon]} />
	                      }
	                      <span dangerouslySetInnerHTML={{ __html: faq.question }} />
	                      <FontAwesomeIcon className="arrow" icon={faAngleDown} />
	                </div>
                    {this.state.openIndex === i &&
                    	<div className="answer" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    }
	      		</div>
	    	  })} 
	      </FaqContainer>
	    );
	  }
  }