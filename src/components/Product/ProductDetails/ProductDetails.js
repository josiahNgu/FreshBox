import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import "./ProductDetails.css";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryOptions: "1",
      quantity: "1"
    };
    this.handleChange = this.handleChange.bind(this);
  }
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
    this.props.addProductToCart(
      this.props.productDetails.id,
      this.state.quantity,
      this.state.deliveryOptions
    );
    // if(localStorage.getItem("shoppingList"))
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
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
              <label>Quantity</label>
              <Input
                elementTypes="quantityInput"
                name="quantity"
                placeholder="1"
                changed={this.handleChange}
              />
              {/* <select
                name="deliveryOptions"
                value=""
                onChange={this.handleChange}
              >
                <option value="1">Every Month</option>
                <option value="2">Every 2 Month</option>
                <option value="3">Every 3 Month</option>
              </select> */}
              <br />
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
    onInItProductDetails: itemId =>
      dispatch(actions.initProductDetails(itemId)),
    addProductToCart: (itemId, quantity, deliveryOptions) =>
      dispatch(actions.addToCart(itemId, quantity, deliveryOptions))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
