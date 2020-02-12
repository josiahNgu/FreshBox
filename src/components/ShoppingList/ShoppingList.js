import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import "./ShoppingList.css";
import ShoppingCartItem from "../ShoppingItem/ShoppingItem";
import * as actions from "../../store/actions/index";
class ShoppingList extends Component {
  componentDidMount() {
    if (localStorage.getItem("shoppingList")) {
      this.props.initLocalShoppingCart();
    }
  }
  deleteItem = index => {
    let oldList = JSON.parse(localStorage.getItem("shoppingList"));
    oldList.splice(index, 1);
    localStorage.setItem("shoppingList", JSON.stringify(oldList));
    this.props.deleteItem(index);
  };
  state = {};
  render() {
    let shoppingCart = <Spinner />;
    if (this.props.shoppingList) {
      shoppingCart = this.props.shoppingList.map((item, index) => (
        <ShoppingCartItem
          key={index}
          itemId={item.itemId}
          imageURL={item.imageURL}
          itemName={item.itemName}
          frequency={item.frequency}
          price={item.price}
          quantity={item.quantity}
          deleteItem={() => this.deleteItem(index)}
        />
      ));
    } else {
      if (localStorage.getItem("shoppingList")) {
        shoppingCart = <Spinner />;
      } else {
        shoppingCart = <p>Your shopping cart is empty</p>;
      }
    }
    return <div className="shopping_cart_list ">{shoppingCart}</div>;
  }
}
const mapStateToProps = state => {
  return {
    shoppingList: state.shoppingCart.shoppingList,
    totalPrice: state.shoppingCart.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    initLocalShoppingCart: () => dispatch(actions.initLocalShoppingList()),
    getTotalPrice: () => dispatch(actions.getTotalPrice()),
    deleteItem: index => dispatch(actions.deleteItem(index))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
