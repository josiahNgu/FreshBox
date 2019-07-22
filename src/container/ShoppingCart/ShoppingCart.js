import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import ProductItem from "../../components/ShoppingItem/ShoppingItem";
class ShoppingCart extends Component {
  componentDidMount() {
    this.props.initShoppingCart();
  }
  render() {
    let shoppingCart = <Spinner />;
    if (this.props.shoppingList) {
      shoppingCart = this.props.shoppingList.map(item => (
        <ProductItem
          key={item.itemId}
          itemName={item.itemName}
          frequency={item.frequency}
          price={item.price}
        />
      ));
    }
    return <div>{shoppingCart}</div>;
  }
}

const mapStateToProps = state => {
  return {
    shoppingList: state.shoppingCart.shoppingList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    initShoppingCart: () => dispatch(actions.initShoppingList())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
