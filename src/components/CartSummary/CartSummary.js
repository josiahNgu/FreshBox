import React from "react";
import "./CartSummary.css";
const cartSummary = props => {
  const shippingText = (type, destination) => {
    if (type === "economy" && destination) {
      return `3-5 Business days to ${destination}`;
    } else if (type === "economy") return "3-5 Business days to US";
  };
  return (
    <div className="CartSummary">
      <div className="CartSumDetails col-sm-12">
        <div className="row ">
          <div className="col-sm-8">
            <h5>Estimation</h5>
            <div className="row">
              <p className="col-sm-6">Order</p>
              <p className="col-sm-6">$ {props.orderPrice}</p>
            </div>
            <div className="row">
              <p className="col-sm-6">
                {shippingText(props.shipping, props.destination)}
              </p>
              <p className="col-sm-6">$7.00</p>
            </div>
            <div className="row">
              <p className="col-sm-6">Taxes</p>
              <p className="col-sm-6">$0.00</p>
            </div>
          </div>
          <div className="col-md-4">
            <h5>Total: ${(Number(props.orderPrice) + 7).toFixed(2)}</h5>
            <button className="SubmitButton" onClick={props.clicked}>
              {props.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default cartSummary;
