import React from "react"

export const LanguageContext = React.createContext({
    currentLanguage: {
        code: "EN",
        name: "English",
        slug: "en"
    },
    defaultLanguage: {
        code: "EN",
        name: "English",
        slug: "en"
    }
});