/*
    Helper function which generates a popup modal url 
    This is used for custom post types that do not have a page
    e.g. https://domain.com/restaurants#restaurant-name
*/
const GenerateCPTPopupUrl = (slug, type, options) => {
    const { 
        restaurantLandingPage,
        chefLandingPage
    } = options
    let url
    
    switch (type) {
        case "Restaurant":
            url = `${restaurantLandingPage.url}#${slug}`
            break;
        case "Chef":
            url = `${chefLandingPage.url}#${slug}`
            break;
    
        default:
            break;
    }

    return url
}

export { GenerateCPTPopupUrl }

