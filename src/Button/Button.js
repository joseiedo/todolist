import React from "react";
import "./Button.css";

const Button = ({ text, color, ...props }) => {
  return (
    <button className="btn-default" {...props}>
      {text}
    </button>
  );
};

export default Button;
