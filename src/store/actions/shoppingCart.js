import { db } from "../../components/Firebase/index";
import * as actionTypes from "./actionTypes";
import axios from "../../axios";
export const loadShoppingList = data => {
  console.log(data);
  return {
    type: actionTypes.GET_SHOPPINGLIST,
    shoppingList: data,
    fetchDataFinished: true
  };
};

export const addToCart = (itemId, quantity, itemName, frequency) => {
  console.log(itemId, quantity, itemName, frequency);
  // let shoppingList = null;
  const addItem = {
    itemId: itemId,
    quantity: quantity,
    itemName: itemName,
    frequency: frequency
  };
  const FirebaseIdToken = `Bearer:${localStorage.getItem("idToken")}`;
  axios.defaults.headers.common["Authorization"] = FirebaseIdToken;
  return dispatch =>
    axios
      .post("/shoppingCart", addItem)
      .then(() => initShoppingList())
      .catch(err => console.log(err));

  // return;
  // dispatch => db.collection("userData").where("userId", "==", userId);
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
        console.log(err);
      });
};
