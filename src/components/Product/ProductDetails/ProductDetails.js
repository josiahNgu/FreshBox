import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import "./ProductDetails.css";
import Spinner from "../../UI/Spinner/Spinner";
class ProductDetails extends Component {
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.onInItProductDetails(params.productId);
  }
  goBack = () => {
    this.props.history.goBack();
  };
  addToCart = () => {
    console.log("clicked");
  };
  render() {
    let canvas = <Spinner />;
    if (this.props.productDetails) {
      canvas = (
        <div id="product_details">
          <button onClick={this.goBack} className="back_btn">
            &laquo; Back
          </button>
          <div className="row ">
            <img
              className="col-md-6"
              src={this.props.productDetails.imageURL}
              alt="product"
            />
            <div className=" item_description col-md-6">
              <h3>{this.props.productDetails.itemName}</h3>
              <p className="bold_text">$ {this.props.productDetails.price}</p>
              <p>{this.props.productDetails.description}</p>
              <button className="ATC_btn" onClick={this.addToCart}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      );
    }
    return canvas;
  }
}
const mapStateToProps = state => {
  return {
    productDetails: state.product.productDetails,
    isLoading: state.product.isAddingToCart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onInItProductDetails: itemId => dispatch(actions.initProductDetails(itemId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
