import React, { useContext } from "react"
import { StaticQuery, graphql } from "gatsby"
import { Row, Col } from "reactstrap"
import { LanguageContext } from "utils/LanguageContext"
import ContainerMax from "components/shared/ContainerMax"
import CustomImage from "components/shared/CustomImage";
import Text from "components/shared/Text"

const FooterSponsers = (props) => {
    return (
        <ContainerMax className="py-4">
            {props.data.footerSponserTitle &&
                <Text size="2" uppercase extrabold center white className="py-4">
                    {props.data.footerSponserTitle}
                </Text>
            }
            <Row className="justify-content-center align-items-center">
                {props.data.footerSponserLogos &&
                    props.data.footerSponserLogos.map((logo, i) => {
                        return (
                            <Col xs={6} md={3} xl={2} className="pb-3" key={i}>
                                <div style={{ maxWidth: "200px", margin: "0 auto" }}>
                                    {logo.url !== null ? (
                                        <a href={logo.url} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                                            <CustomImage
                                                image={logo.image}
                                            />
                                        </a>
                                    ) : (
                                        <CustomImage
                                            image={logo.image}
                                        />
                                    )}
                                </div>
                            </Col>
                        );
                    })
                }
            </Row>
        </ContainerMax>
    )
}

const FooterSponsersExport = () => {
    const { currentLanguage } = useContext(LanguageContext)
    return(
        <StaticQuery
            query={graphql`
                query {
                    allWp {
                        edges {
                            node {
                                ...optionsFragment
                            }
                        }
                    }
                }
            `}
            render={data => {
                if (
                    data.allWp.edges[0].node[currentLanguage.code] &&
                    data.allWp.edges[0].node[currentLanguage.code].acfOptions.footerSponserLogos
                ) {
                    return (
                        <FooterSponsers data={data.allWp.edges[0].node[currentLanguage.code].acfOptions} />
                    )
                } else {
                    return ""
                }
            }}
        />
    )
}

export default FooterSponsersExport