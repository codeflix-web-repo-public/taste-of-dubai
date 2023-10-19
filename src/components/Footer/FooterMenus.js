import React from "react"
import { Container, Row, Col } from "reactstrap"
import styled from "styled-components"
import FooterMenu from "./FooterMenu"
import Social from "components/shared/Social"

const SocialWrap = styled.div`
    h5 {
        color: ${props => props.theme.colors.secondary};
        font-family: ${props => props.theme.font.family.bold};
        text-transform: uppercase;
        font-size: ${props => props.theme.font.size.sm};
        margin-bottom: .25rem;
    }
    ul {
        text-align: center;
        li {
            a {
                font-size: 1.25rem;
                padding: .5rem 1rem;
                color: ${props => props.theme.colors.secondary};
                text-decoration: none;

                &:hover {
                    color: black;
                }

                svg {
                    max-height: 20px;
                }
            }
            &:first-child {
                a {
                    padding-left: 0;
                }
            }
        }
    }
`

const FooterMenus = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={10}>
                    <Row>
                        <Col xs={6} md={3}>
                            <FooterMenu menu={1} />
                        </Col>
                        <Col xs={6} md={3}>
                            <FooterMenu menu={2} />
                        </Col>
                        <div className="w-100 d-md-none" />
                        <Col xs={6} md={3}>
                            <FooterMenu menu={3} />
                        </Col>
                        <Col xs={6} md={3}>
                            <FooterMenu menu={4} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <SocialWrap className="py-4">
                                <Social />
                            </SocialWrap>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default FooterMenus