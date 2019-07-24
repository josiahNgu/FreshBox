import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Product from "../../components/Product/Product";
import Spinner from "../../components/UI/Spinner/Spinner";
class Products extends Component {
  componentDidMount() {
    this.props.onInitProducts();
  }

  render() {
    let productsArray = <Spinner />;
    if (this.props.fetchSuccess) {
      productsArray = this.props.products.map(product => (
        <Product
          key={product.id}
          productId={product.id}
          name={product.itemName}
          price={product.price}
          description={product.description}
          imageURL={product.imageURL}
        />
      ));
    }

    // const products = <Product name={this.props.products.itemName} />;
    return (
      <div className="container ">
        <div className="col-sm-12">
          {this.props.isLoading ? <Spinner /> : productsArray}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.product.products,
    fetchSuccess: state.product.fetchDataFinished,
    isLoading: state.product.isAddingToCart
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onInitProducts: () => dispatch(actions.initProducts())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
