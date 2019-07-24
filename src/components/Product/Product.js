/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import "./Product.scss";
import Select from "../UI/Select/Select";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
class Product extends Component {
  state = {
    quantity: 1,
    currentSelection: "Frequency",
    frequency: 0,
    showOptions: false
  };
  addToCart = event => {
    event.preventDefault();
    console.log("here");
    if (this.state.frequency !== 0 && this.state.quantity !== 0) {
      this.props.addToCartHandler(
        this.props.productId,
        this.state.quantity,
        this.props.name,
        this.state.frequency
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

  toggleOptionsHandler = () => {
    console.log("here" + this.state.showOptions);
    this.setState({ showOptions: !this.state.showOptions });
  };

  render() {
    return (
      <div className="">
        <div className="product col-sm-12 row">
          <div className="col-sm-6">
            <img src={this.props.imageURL} alt="product image" />
          </div>
          <div className="col-sm-12 col-md-6 text-justify">
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
                toggleOptionsHandler={this.toggleOptionsHandler}
                showOptions={this.state.showOptions}
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
    addToCartHandler: (itemId, quantity, itemName, frequency) =>
      dispatch(actions.addToCart(itemId, quantity, itemName, frequency))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Product);
