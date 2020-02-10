import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../UI/Spinner/Spinner";
import ShoppingCartItem from "../ShoppingItem/ShoppingItem";
import * as actions from "../../store/actions/index";
class ShoppingList extends Component {
  componentDidMount() {
    this.props.initLocalShoppingCart();
  }
  deleteItem = index => {
    console.log("index", index);
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
          // TODO: FIX ABILITY TO DELETE ITEM
          deleteItem={() => this.deleteItem(index)}
        />
      ));
    } else {
      if (localStorage.getItem("shoppingList")) {
        shoppingCart = <Spinner />;
      } else {
        shoppingCart = "Your shopping Bag is empty";
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
    getTotalPrice: () => dispatch(actions.getTotalPrice())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList);
