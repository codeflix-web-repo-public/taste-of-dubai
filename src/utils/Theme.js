// match bootstrap sizes, also add xxl
const sizes = {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1600px",
    xxxl: "1920px",
    contentMax: "1440px"
};

const bootstrapGutterWidth = "15px";
const bootstrapGutterWidthHalf = "15px";

const fontSizeBase = 1;

const font = {
    family: {
        base: "AvertaRegular",
        body: `AvertaRegular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
        bold: `AvertaBold`,
        black: `AvertaBlack` 
    },
    weight: {
        regular: 400,
        semiBold: 600,
        bold: 700,
        black: 900
    },
    size: {
        xs: `${fontSizeBase * .75}rem`, // 12px
        sm: `${fontSizeBase * .875}rem`, // 14px
        base: `${fontSizeBase}rem`, // 16px
        md: `${fontSizeBase * 1.125}rem`, // 18px
        lg: `${fontSizeBase * 1.25}rem`, // 20px
        xl: `${fontSizeBase * 1.5}rem`, // 24px
        xxl: `${fontSizeBase * 1.88}rem` // 30px
    },
    lineHeight: {
        sm: 1.1,
        base: 1.4,
        headings: 1
    },
    h1: {
        size: `${fontSizeBase * 3.5}rem`
    },
    h2: {
        size: `${fontSizeBase * 3.2}rem` 
    },
    h3: {
        size: `${fontSizeBase * 2.9}rem`
    },
    h4: {
        size: `${fontSizeBase * 2.5}rem`, 
    },
    h5: {
        size: `${fontSizeBase * 1.5}rem`, 
    },
    h6: {
        size: `${fontSizeBase * 1.15}rem`
    }
}

const ThemeExport = {
    sizes,
    bootstrapGutterWidth,
    bootstrapGutterWidthHalf,
    font,
    transitionBase: "all .4s ease-in-out",
    colors: {
        themeTitle: "#953B8C",
        primary: "#F4214F",
        secondary: "#FFFF00",
        tertiary: "#953B8C",
        quaternary: "#B5DDD8",
        white: "#ffffff",
        whiteOff: "#f2f2f2",
        black: "#020202",
        blackOff: "#333333",
        grey: "#707070",
        grey1: "#555555",
        grey2: "#878787",
        grey3: "#B2B2B2",
        grey4: "#DADADA",
        blue: "#626C80",
        red: "#BB133E",
        navy: "#012169",
        pink: "#F43581",
        purple: "#702283",
        yellow: "#F2C83D",
        turquoise: "#00ADB9",
        orange: "#f0820e",
        gradient: `linear-gradient(to left, #953B8C, #FF1442);`
    }
}

export default ThemeExport