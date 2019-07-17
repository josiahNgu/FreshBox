import React, { Component } from "react";
import "./Product.scss";
import stockImage from "../../misc/Scott Facial Tissue.jpg";
import firebase from "firebase/app";
import Select from "../UI/Select/Select";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
class Product extends Component {
  state = {
    quantity: 1,
    currentSelection: "Frequency",
    frequency: 0
  };
  addToCart = event => {
    event.preventDefault();
    console.log("here");
    if (this.state.frequency !== 0 && this.state.quantity !== 0) {
      this.props.addToCartHandler(
        this.props.productId,
        this.state.quantity,
        this.state.frequency,
        firebase.auth().currentUser.uid
      );
    }
  };
  selectHandler = (name, value) => {
    console.log(name + "value" + value);
    this.setState({
      frequency: value,
      currentSelection: name
    });
  };
  render() {
    return (
      <div className="container">
        <div className="product col-sm-12 row">
          <div className="col-sm-6">
            <img alt="stock image" src={stockImage} />
          </div>
          <div className="col-sm-6">
            <div>
              <h5 className="product_title">{this.props.name}</h5>
            </div>
            <div>
              <span>{this.props.description}</span>
              <span>Quantity</span>
            </div>
            <div>
              <Select
                selectHandler={this.selectHandler}
                currentSelection={this.state.currentSelection}
              />
            </div>

            <button
              onClick={this.addToCart}
              href=""
              className="product_ATC_Button"
            >
              Add To Cart | RM {this.props.price}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addToCartHandler: (itemId, quantity, frequency, userId) =>
      dispatch(actions.addToCart(itemId, quantity, frequency, userId))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Product);
