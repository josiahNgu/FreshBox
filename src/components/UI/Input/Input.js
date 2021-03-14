import React from "react";
import "./Input.scss";
const input = props => {
  let inputElement = null;
  let inputClasses = ["FormInput", "Input"];
  let quantityInput = ["QuantityInputBox"];
  let validationError = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push("Invalid");
    if (props.currentElement === "password") {
      validationError = (
        <p className="ValidationError">
          Enter a combination of at least 6 numbers, letters, and a special
          characters (like ! and #)
        </p>
      );
    } else {
      validationError = (
        <p className="ValidationError">
          Please enter a valid {props.currentElement}
        </p>
      );
    }
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
      {validationError}
      {inputElement}
    </div>
  );
};

export default input;
