import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import "./ProductDetails.scss";
import Spinner from "../../UI/Spinner/Spinner";
import Alert from "../../UI/Alert/Alert";
import Input from "../../UI/Input/Input";
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryOptions: "1",
      quantity: "1",
      addToCart: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.onInItProductDetails(params.productId);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({
        addToCart: this.props.isLoading
      });
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };
  addToCart = () => {
    if (this.props.isAuthenticated) {
      this.props.addAuthUserCart(
        this.props.productDetails.id,
        this.state.quantity
      );
    } else {
      this.props.addProductToCart(
        this.props.productDetails.id,
        this.state.quantity,
        this.state.deliveryOptions
      );
    }
    this.setState({
      addToCart: true
    });
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    let canvas = <Spinner />;
    let alert = "";
    let styles = "ATC_btn";
    let message = "adding item to cart";
    if (this.props.productDetails) {
      canvas = (
        <div id="product_details" className="pt_4">
          <button onClick={this.goBack} className="DesktopOnly back_btn">
            &laquo; Back
          </button>
          <div className="product-container">
            <div className="item_description">
              <h3 className="product-title">
                {this.props.productDetails.itemName}
              </h3>
              <p className="bold_text">$ {this.props.productDetails.price}</p>
              <p>{this.props.productDetails.description}</p>
              <label>Quantity</label>
              <Input
                elementTypes="quantityInput"
                name="quantity"
                placeholder="1"
                changed={this.handleChange}
              />

              <br />
              <button
                className={styles}
                disabled={this.props.isLoading}
                onClick={this.addToCart}
              >
                Add To Cart
              </button>
            </div>
            <div className=" product_content">
              <img
                className="product-img"
                src={this.props.productDetails.imageURL}
                alt="product"
              />
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
    addingToCart: state.shoppingCart.isAddingToCart,
    isAuthenticated: state.auth.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onInItProductDetails: itemId =>
      dispatch(actions.initProductDetails(itemId)),
    addProductToCart: (itemId, quantity) =>
      dispatch(actions.addToCart(itemId, quantity)),
    addAuthUserCart: (itemId, quantity) => {
      dispatch(actions.addAuthUserCart(itemId, quantity));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
