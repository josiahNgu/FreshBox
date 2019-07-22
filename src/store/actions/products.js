import * as actionTypes from "./actionTypes";
import axios from "../../axios";
export const loadProducts = products => {
  return {
    type: actionTypes.GET_PRODUCTS,
    products: products,
    fetchDataFinished: true
  };
};
export const initProducts = () => {
  return dispatch =>
    axios
      .get("/products")
      .then(res => {
        console.log(res);
        const data = res.data.map(doc => {
          return {
            id: doc.id,
            itemName: doc.itemName,
            price: doc.price,
            category: doc.category,
            description: doc.description
          };
        });
        dispatch(loadProducts(data));
      })
      .catch(err => {
        console.log(err);
      });
};
