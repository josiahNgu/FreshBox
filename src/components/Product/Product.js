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
  viewMore = () => {
    console.log("clicked");
  };

  render() {
    return (
      <div className="product col-sm-12 dark_text" onClick={this.viewMore}>
        <img src={this.props.imageURL} alt="product image" />
        <p className="product_show_more">View</p>
        <div>
          <h5 className="product_title">{this.props.name}</h5>
          <p className="text_center">${this.props.price}</p>
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
