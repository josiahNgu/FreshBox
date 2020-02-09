import React from "react";
import "./Input.css";
const input = props => {
  let inputElement = null;
  let inputClasses = ["FormInput", "Input"];
  let cardClasses = ["Input_Card"];
  let quantityInput = ["QuantityInputBox"];
  let shippingInput = ["FormInput", "ShippingInput", "col-md-6", "dark_text"];
  let cardClassesRow = ["Input_Card_Row"];
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
    case "cardInput":
      inputElement = (
        <input
          className={cardClasses.join(" ")}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case "cardInputRow":
      inputElement = (
        <input
          className={cardClassesRow.join(" ")}
          value={props.value}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case "shippingInput":
      inputElement = (
        <input
          className={shippingInput.join(" ")}
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
