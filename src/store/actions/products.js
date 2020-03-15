import * as actionTypes from "./actionTypes";
import axios from "../../axios";
export const loadProducts = products => {
  return {
    type: actionTypes.GET_PRODUCTS,
    products: products,
    fetchDataFinished: true
  };
};
const loadProductDetails = productDetails => {
  return {
    type: actionTypes.GET_PRODUCT_DETAILS,
    productDetails: productDetails,
    fetchIndividualDataFinished: true
  };
};
export const initProducts = () => {
  return dispatch =>
    axios
      .get("/products")
      .then(res => {
        const data = res.data.map(doc => {
          return {
            id: doc.id,
            itemName: doc.itemName,
            price: doc.price,
            category: doc.category,
            imageURL: doc.imageURL
          };
        });
        dispatch(loadProducts(data));
      })
      .catch(err => {
        console.log(err);
      });
};
export const initProductDetails = id => {
  return dispatch =>
    axios
      .get(`/products/${id}`)
      .then(doc => {
        const data = {
          id: doc.data.id,
          itemName: doc.data.itemName,
          price: doc.data.price,
          imageURL: doc.data.imageURL,
          description: doc.data.description
        };
        dispatch(loadProductDetails(data));
      })
      .catch(err => {
        console.error(err);
      });
};
