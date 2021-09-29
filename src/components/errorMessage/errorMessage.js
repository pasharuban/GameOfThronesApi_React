import React from "react";
import img from "./error-red-cross-7.webp";

import "./ErrorMessage.css";

const ErrorMessage = () => {
  return (
    <div className="error-block">
      <img className="error-img" src={img} alt="error"></img>
      <span className="error-text">Something goes wrong :(</span>
    </div>
  );
};
export default ErrorMessage;
