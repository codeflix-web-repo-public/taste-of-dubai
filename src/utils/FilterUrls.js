const FilterUrls = (text) => {
    if (text) {
        const urls = [
            "https://cms-staging.walkwithamal.org",
            "http://cms-staging.walkwithamal.org",
            "https://cms.walkwithamal.org",
            "http://cms.walkwithamal.org"
        ]
    
        let newText = text
    
        urls.forEach((url) => {
            newText = newText.replace(url, "")
        })
    
        return newText
    }
} 

export { FilterUrls }