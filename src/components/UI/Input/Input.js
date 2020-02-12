import React from "react";
import "./Input.css";
const input = props => {
  let inputElement = null;
  let inputClasses = ["FormInput", "Input"];
  let quantityInput = ["QuantityInputBox"];
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
    case "quantityInput":
      inputElement = (
        <input
          className={quantityInput.join(" ")}
          type="number"
          min="1"
          name={props.name}
          placeholder={props.placeholder}
          onChange={props.changed}
        />
      );
      break;
    case "numberInput":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          type="number"
          min="1"
          name={props.name}
          placeholder={props.placeholder}
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
    <div>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
