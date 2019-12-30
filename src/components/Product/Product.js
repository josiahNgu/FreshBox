/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./Product.scss";

const Product = props => {
  return (
    <div className="product col-sm-12 dark_text">
      <img src={props.imageURL} alt="product image" />
      <p className="product_show_more">View</p>
      <div>
        <h5 className="product_title">{props.name}</h5>
        <p className="text_center">${props.price}</p>
      </div>
    </div>
  );
};
export default Product;
