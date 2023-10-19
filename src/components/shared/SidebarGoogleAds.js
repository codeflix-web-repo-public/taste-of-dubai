import React, { Component, useContext } from "react"
import { StaticQuery, graphql } from "gatsby"
import { LanguageContext } from "utils/LanguageContext"

class SidebarGoogleAds extends Component {
    constructor(props) {
        super(props)
        this.ad = []
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            const postscribe = require('postscribe');

            this.props.mpus.forEach((mpu, i) => {
                const height = mpu.type === "single" ? 250 : 600
                let id = `googlead${mpu.name.toLowerCase()}-${i}`
                id = id.replace(" ", "")
                postscribe(this.ad[i], `
                    <script>
                    window.googletag = window.googletag || {cmd: []};
                        googletag.cmd.push(function() {
                            googletag.defineSlot('/${this.props.accountId}/${mpu.name}', [300, ${height}], '${id}').addService(googletag.pubads());
                            googletag.pubads().enableSingleRequest();
                            googletag.enableServices();
                        });
                    </script>
                    <div id='${id}' style='width: 300px; height: ${height}px;'>
                        <script>
                            googletag.cmd.push(function() { googletag.display('${id}'); });
                        </script>
                    </div>
                `)
            })
        }
    } 

    componentWillUnmount() {
		if (typeof window !== "undefined" && window.googletag) {
			window.googletag.destroySlots()
		}
	}

    render() {
        const placeholders = this.props.mpus && this.props.mpus.map((mpu, i) => {
            return(
                <React.Fragment key={i}>
                    <div className="w-100"></div>
                    <div className="pb-2" ref={ad => this.ad[i] = ad} />
                </React.Fragment>
            )
        })

        return placeholders
    }
}


const SidebarGoogleAdsExport = (props) => {
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
                const { acfOptions } = data.allWp.edges[0].node[currentLanguage.code]
                if (acfOptions.googleAdsAccountId && props.googleAdsSidebar && props.googleAdsSidebar.sidebarMpus) {
                    // Page google sidebar ads overrides the below (global sidebar ads)
                    return (
                        <SidebarGoogleAds 
                            accountId={acfOptions.googleAdsAccountId} 
                            mpus={props.googleAdsSidebar.sidebarMpus}
                        />
                    )
                } else if (acfOptions.googleAdsAccountId && acfOptions.globalSidebarMpus) {
                    return (
                        <SidebarGoogleAds 
                            accountId={acfOptions.googleAdsAccountId} 
                            mpus={acfOptions.globalSidebarMpus}
                        />
                    )	
                } else return ""
            }}
        />
    )
}

export default SidebarGoogleAdsExport