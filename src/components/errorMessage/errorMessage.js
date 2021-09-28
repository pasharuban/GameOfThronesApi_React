import React from "react";
import img from "./error.jpg";

import "./ErrorMessage.css";

const ErrorMessage = () => {
  return (
    <>
      <img src={img} alt="error"></img>
      <span>Something goes wrong :(</span>
    </>
  );
};
export default ErrorMessage;
