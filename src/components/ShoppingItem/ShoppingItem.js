import React from "react";
import "./ShoppingItem.scss";
function displayFrequency(option) {
  let displayText = "Every Month";
  if (option === 2) {
    displayText = "Every 2 Months";
  } else if (option === 3) {
    displayText = "Every 3 Months";
  }
  return displayText;
}

function ShoppingItem(props) {
  return (
    <div className="container shopping-item">
      {/* product refer to product page class */}
      <div className="cart-item col-sm-12 ">
        <div className="row">
          <div className="col-sm-6">
            <img src={props.imageURL} alt={props.itemName} />
          </div>
          <div className="col-sm-6 ProductDetails">
            <div>
              <h5 className="product_title">{props.itemName}</h5>
            </div>
            <div>
              <p>Quantity: {props.quantity}</p>
              <p>Frequency: {displayFrequency(props.frequency)}</p>
            </div>
            <p>Total Price: {(props.price * props.quantity).toFixed(2)}</p>
            <button className="primary_button" onClick={props.deleteItem}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingItem;
