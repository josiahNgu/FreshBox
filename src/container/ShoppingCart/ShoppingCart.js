import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import "./ShoppingCart.css";
class ShoppingCart extends Component {
  routeCheckoutPage = () => {
    const { history } = this.props;
    history.push("/checkout");
  };
  deleteItem = itemId => {
    console.log("itemId :", itemId);
  };
  render() {
    return (
      <div className="container col-md-12 shopping_cart">
        <div className="row">
          <div className="col-md-8 shoppingList">
            <ShoppingList />
          </div>
          <div className="payment_option gradient_background  text-center pt_1 col-md-4">
            <h3>TOTAL: {this.props.totalPrice}</h3>
            <button
              className="secondary_button"
              onClick={this.routeCheckoutPage}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    shoppingList: state.shoppingCart.shoppingList,
    totalPrice: state.shoppingCart.totalPrice
  };
};
export default withRouter(connect(mapStateToProps)(ShoppingCart));
