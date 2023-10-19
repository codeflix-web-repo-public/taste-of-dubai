// Helper function to remove cms from url
const LinkSearchReplace = (text) => {
    let newText
    if (process.env.NODE_ENV === "production") {
        newText = text.replace(/cms./g, "")
        newText = newText.replace(/staging./g, "")
    } else {
        newText = text.replace(/cms-/g, "")
    }
    return newText
}

export { LinkSearchReplace }