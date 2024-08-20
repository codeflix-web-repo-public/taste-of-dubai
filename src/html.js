import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* <script dangerouslySetInnerHTML={{__html: `
 (function(){ var s = document.createElement('script'); var h = document.querySelector('head') || document.body; s.src = 'https://acsbapp.com/apps/app/dist/js/app.js'; s.async = true; s.onload = function(){ acsbJS.init({ statementLink : '', footerHtml : '', hideMobile : false, hideTrigger : false, disableBgProcess : false, language : 'en', position : 'left', leadColor : '#146ff8', triggerColor : '#f43581', triggerRadius : '50%', triggerPositionX : 'right', triggerPositionY : 'bottom', triggerIcon : 'people', triggerSize : 'small', triggerOffsetX : 20, triggerOffsetY : 20, mobile : { triggerSize : 'small', triggerPositionX : 'right', triggerPositionY : 'bottom', triggerOffsetX : 10, triggerOffsetY : 20, triggerRadius : '50%' } }); }; h.appendChild(s); })();
        `}} /> */}
        {props.headComponents}
        <meta name="google-site-verification" content="tOZYmDy-w62VaqjJ9qcZob6ZPuaI_bl9qX5LEizdEQE" />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}


      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
