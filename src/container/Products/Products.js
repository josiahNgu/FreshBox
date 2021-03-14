import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Product from "../../components/Product/Product";
import Spinner from "../../components/UI/Spinner/Spinner";
import "./Products.scss";
class Products extends Component {
  componentDidMount() {
    this.props.onInitProducts();
  }

  redirectToProductDetails = SKUid => {
    this.props.history.push(`/products/ref/${SKUid}`);
  };
  render() {
    let productsArray = <Spinner />;
    if (this.props.fetchSuccess) {
      productsArray = this.props.products.map(product => (
        <div
          className="product-card col-12 col-md-4 col-lg-4 px-0"
          key={product.id}
          onClick={() => this.redirectToProductDetails(product.id)}
        >
          <Product
            className="product_content"
            key={product.id}
            productId={product.id}
            name={product.itemName}
            price={product.price}
            description={product.description}
            imageURL={product.imageURL}
          />
        </div>
      ));
    }
    return (
      <section id="products_page" className="row col-md-12">
        {this.props.isLoading ? <Spinner /> : productsArray}
      </section>
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
export default connect(mapStateToProps, mapDispatchToProps)(Products);
