import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import ProductItem from "../../components/ShoppingItem/ShoppingItem";
class ShoppingCart extends Component {
  componentDidMount() {
    this.props.initShoppingCart(this.props.userId);
  }
  render() {
    let shoppingCart = <Spinner />;
    if (this.props.shoppingList) {
      shoppingCart = this.props.shoppingList.map(item => (
        <ProductItem
          key={item.itemId}
          itemName={item.itemName}
          quantity={item.quantity}
          price={item.price}
        />
      ));
    }
    return <div>{shoppingCart}</div>;
  }
}

const mapStateToProps = state => {
  return {
    shoppingList: state.shoppingCart.shoppingList,
    userId: state.auth.user.uid
  };
};
const mapDispatchToProps = dispatch => {
  return {
    initShoppingCart: userId => dispatch(actions.initShoppingList(userId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
