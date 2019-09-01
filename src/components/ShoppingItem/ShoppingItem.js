import React, { Component } from "react";
import "./ShoppingItem.css";
class ShoppingItem extends Component {
  render() {
    return (
      <div className="container ShoppingItem">
        {/* product refer to product page class */}
        <div className="CartItem col-sm-12 ">
          <div className="row">
            <div className="col-sm-4">
              <img src={this.props.imageURL} alt={this.props.itemName} />
            </div>
            <div className="col-sm-8 ProductDetails">
              <div>
                <h5 className="product_title">{this.props.itemName}</h5>
              </div>
              <div>
                <p>Quantity: {this.props.quantity}</p>
              </div>
              <p>RM {(this.props.price * this.props.quantity).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingItem;
