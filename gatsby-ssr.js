import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <meta
      key="google-site-verification"
      name="google-site-verification"
      content="tOZYmDy-w62VaqjJ9qcZob6ZPuaI_bl9qX5LEizdEQE"
    />,
  ]);
};