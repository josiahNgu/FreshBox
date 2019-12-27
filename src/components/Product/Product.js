/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import "./Product.scss";
import Input from "../UI/Input/Input";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
class Product extends Component {
  state = {
    selectedQuantity: 1,
    showOptions: false
  };
  addToCart = event => {
    event.preventDefault();
    console.log("here");
    if (this.state.selectedQuantity !== 0) {
      this.props.addToCartHandler(
        this.props.productId,
        this.state.selectedQuantity,
        this.props.name
      );
    }
  };
  inputChangedHandler = event => {
    this.setState({ selectedQuantity: event.target.value });
  };

  render() {
    return (
      <div className="product col-sm-12 row">
        <div className="col-sm-6">
          <img src={this.props.imageURL} alt="product image" />
        </div>
        <div className="col-sm-12 col-md-6 text-justify">
          <div>
            <h5 className="product_title">{this.props.name}</h5>
          </div>
          <div>
            <p>{this.props.description}</p>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <p>Quantity:</p>
            </div>
            <div className="col-sm-10">
              <Input
                elementTypes="quantityInput"
                placeholder="1"
                changed={this.inputChangedHandler}
              />
            </div>
          </div>

          <button onClick={this.addToCart} className="product_ATC_Button">
            Add To Cart | RM {this.props.price.toFixed(2)}
          </button>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCartHandler: (itemId, quantity, itemName, frequency) =>
      dispatch(actions.addToCart(itemId, quantity, itemName, frequency))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Product);
