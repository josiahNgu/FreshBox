import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { logout } from "./index";
export const loadShoppingList = data => {
  console.log(data);
  return {
    type: actionTypes.GET_SHOPPINGLIST,
    shoppingList: data,
    fetchDataFinished: true,
    isLoading: false
  };
};
const addingToCart = () => {
  return {
    type: actionTypes.IS_ADDING_TO_CART,
    isLoading: true
  };
};

export const addToCart = (itemId, quantity, itemName, frequency) => {
  console.log(itemId, quantity, itemName, frequency);
  const addItem = {
    itemId: itemId,
    quantity: quantity,
    itemName: itemName,
    frequency: frequency
  };
  const FirebaseIdToken = `Bearer:${localStorage.getItem("idToken")}`;
  axios.defaults.headers.common["Authorization"] = FirebaseIdToken;
  return dispatch => {
    dispatch(addingToCart());
    axios
      .post("/shoppingCart", addItem)
      .then(() => initShoppingList())
      .catch(err => console.log(err));
  };
};
export const authenticationFailed = () => {
  logout();
};
export const initShoppingList = () => {
  const FirebaseIdToken = `Bearer:${localStorage.getItem("idToken")}`;
  axios.defaults.headers.common["Authorization"] = FirebaseIdToken;
  return dispatch =>
    axios
      .get("/shoppingCart")
      .then(res => {
        console.log(res);
        const data = res.data.map(detail => {
          return {
            itemId: detail.itemId,
            itemName: detail.itemName,
            frequency: detail.frequency
          };
        });
        dispatch(loadShoppingList(data));
      })
      .catch(err => {
        console.log("err.response.status", err.response.status);
        if (err.response.status.toString() === "403") {
          // authenticationFailed();
          console.log("err", err);
        }
      });
};
