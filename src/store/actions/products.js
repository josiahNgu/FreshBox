import { db } from "../../components/Firebase/index";
import * as actionTypes from "./actionTypes";
export const loadProducts = products => {
  return {
    type: actionTypes.GET_PRODUCTS,
    products: products,
    fetchDataFinished: true
  };
};
export const initProducts = () => {
  return dispatch =>
    db
      .collection("products")
      .get()
      .then(res => {
        const data = res.docs.map(doc => {
          console.log(doc.id);
          return {
            id: doc.id,
            itemName: doc.data().itemName,
            price: doc.data().price,
            category: doc.data().category,
            description: doc.data().description
          };
        });
        dispatch(loadProducts(data));
      })
      .catch(err => {
        console.log(err);
      });
};
