import React from "react";
import "./Input.css";
const input = props => {
  let inputElement = null;
  switch (props.elementTypes) {
    case "input":
      inputElement = (
        <input
          className="FormInput"
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
  }
  return <div className="Input">{inputElement}</div>;
};

export default input;
