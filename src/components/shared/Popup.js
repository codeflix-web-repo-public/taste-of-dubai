import React from "react"
import styled from "styled-components"
import CustomImage from "components/shared/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  Modal, ModalBody, Row, Col } from "reactstrap"
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faGlobe, faTimes } from "@fortawesome/free-solid-svg-icons"
import { media } from "utils/Media"
import Text from "components/shared/Text"
import PopupGalleryCarousel from "components/shared/PopupGalleryCarousel"
import WPLink from "components/shared/WPLink"

const ColStyled = styled(Col)`
  a {
    font-size: 1.5rem;
    padding-right: 1.5rem;
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
  color: ${props => props.theme.colors.black};
  font-size: 1.5rem;

  @media ${media.md} {
    right: -.5rem;
    top: -.75rem;
  }
  @media ${media.lg} {
    right: -1rem;
    top: -1.5rem;
  }
`

const Popup = (props) => {
  const { data } = props
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} centered size="lg">
      <ModalBody>
          <Close onClick={props.toggle}>
              <FontAwesomeIcon icon={faTimes} />
              <span className="sr-only">Close</span>
          </Close>
          <Row>
              <Col lg={{ size: 6, order: 2 }}>
                  {data.acfTastePageSettings.popupTitle &&
                  <Text as="h4" primary uppercase>{data.acfTastePageSettings.popupTitle}</Text>
                  }
                  {data.acfTastePageSettings.popupText &&
                  <Text base dangerouslySetInnerHTML={{ __html: data.acfTastePageSettings.popupText }} />
                  }
                  <Row className="align-items-center">
                      {data.acfTastePageSettings.popupCtaLink &&
                      <Col md="auto" className="pb-3 pb-lg-0">
                          <WPLink
                              url={data.acfTastePageSettings.popupCtaLink.url}
                              button
                              color="black"
                              target={data.acfTastePageSettings.popupCtaLink.target}
                          >
                              {data.acfTastePageSettings.popupCtaLink.title}
                          </WPLink>
                      </Col>
                      }
                      <ColStyled md="auto">
                          {data.acfTastePageSettings.popupFacebook &&
                          <a href={data.acfTastePageSettings.popupFacebook} target="_blank" rel="noopener noreferrer">
                              <span className="sr-only">Facebook</span>
                              <FontAwesomeIcon icon={faFacebookF} />
                          </a>
                          }
                          {data.acfTastePageSettings.popupTwitter &&
                          <a href={data.acfTastePageSettings.popupTwitter} target="_blank" rel="noopener noreferrer">
                              <span className="sr-only">Twitter</span>
                              <FontAwesomeIcon icon={faTwitter} />
                          </a>
                          }
                          {data.acfTastePageSettings.popupInstagram &&
                          <a href={data.acfTastePageSettings.popupInstagram} target="_blank" rel="noopener noreferrer">
                              <span className="sr-only">Instagram</span>
                              <FontAwesomeIcon icon={faInstagram} />
                          </a>
                          }
                          {data.acfTastePageSettings.popupWebsiteLink &&
                          <WPLink url={data.acfTastePageSettings.popupWebsiteLink} target="_blank" rel="noopener noreferrer">
                              <span className="sr-only">Website</span>
                              <FontAwesomeIcon icon={faGlobe} />
                          </WPLink>
                          }
                      </ColStyled>
                  </Row>
              </Col>
              <Col lg={{ size: 6, order: 1 }}>
                  {data.acfTastePageSettings.featuredImage45 && !data.acfTastePageSettings.popupGallery &&
                  <CustomImage
                      image={data.acfTastePageSettings.featuredImage45}
                      className="d-none d-md-block"
                  />
                  }
                  {data.acfTastePageSettings.popupGallery &&
                  <div className="pt-3 pt-md-0">
                      <PopupGalleryCarousel images={data.acfTastePageSettings.popupGallery} image={data.acfTastePageSettings.featuredImage45} />
                  </div>
                  }
              </Col>
          </Row>
      </ModalBody>
  </Modal>
  )
}

export default Popup