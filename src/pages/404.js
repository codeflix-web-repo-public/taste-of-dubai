import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "components/Layout/Layout"
import FlexibleContent from "components/FlexibleContent/FlexibleContent"

const Page404 = (props) => {
    const data = props.data.page404
    const acfBlocks = data.acfFlexibleContent.blocks
    return (
        <Layout 
			path={data.uri} 
			seo={data.seo} 
			language={data.language} 
            translations={data.translations}
		>
            <FlexibleContent blocks={acfBlocks} />
        </Layout>
    )
}

class Page404Export extends Component {
	constructor(props) {
		super(props)

		this.state = {
			language: {
				code: "EN",
				name: "English",
				slug: "en"
			}
		}

		this.langNames = {
			en: "English",
		}
	}

	componentDidMount() {
		if (typeof window !== "undefined") {
			const path = window.location.pathname
			const path1 = path.split( '/' )[1]
			const lang = path1.length === 2 ? path1 : "en"

			const language = {
				code: lang.toUpperCase(),
				name: this.langNames[lang],
				slug: lang
			}

			this.setState({
				language
			})
		}
	}

	render() {
		const currentLanguage = this.state.language
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
						data.allWp.edges[0].node[currentLanguage.code].acfOptions.page404
					) {
						return (
							<Page404 data={data.allWp.edges[0].node[currentLanguage.code].acfOptions} {...this.props} />
						)
					} else return ""
				}}
			/>
		)
	}
}

export default Page404Export