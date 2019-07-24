import React from "react";
import "./Input.scss";
const input = props => {
  let inputElement = null;
  let inputClasses = ["FormInput"];
  let validationError = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("Invalid");
    validationError = (
      <p className="ValidationError">
        Please enter a valid {props.currentElement}
      </p>
    );
  }
  switch (props.elementTypes) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className="Input">
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
