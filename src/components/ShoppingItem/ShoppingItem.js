import React, { Component } from "react";

class ShoppingItem extends Component {
  render() {
    return (
      <div className="container">
        <div className="product col-sm-12 row">
          <div className="col-sm-6"></div>
          <div className="col-sm-6">
            <div>
              <h5 className="product_title">{this.props.itemName}</h5>
            </div>
            <div>
              <span>Quantity: {this.props.quantity}</span>
            </div>
            <p>RM {this.props.price * this.props.quantity}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingItem;
