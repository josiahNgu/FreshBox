import { db } from "../../components/Firebase/index";
import * as actionTypes from "./actionTypes";

export const loadShoppingList = data => {
  console.log(data);
  return {
    type: actionTypes.GET_SHOPPINGLIST,
    shoppingList: data,
    fetchDataFinished: true
  };
};
export const updateDBCart = (shoppingList, userId) => {
  return dispatch =>
    db
      .collection("userData")
      .doc()
      .where("userId", "==", userId);
};
export const addToCart = (itemId, quantity, frequency, userId) => {
  console.log(itemId, quantity, frequency, userId);
  let shoppingList = null;
  return dispatch =>
    db
      .collection("userData")
      .where("userId", "==", userId)
      .get()
      .then(res => {
        res.docs.forEach(doc => {
          shoppingList = doc.data().shoppingList.map(detail => {
            console.log(detail.itemName);
            return {
              itemName: detail.itemName,
              itemId: detail.itemId,
              quantity: detail.quantity,
              price: detail.price
            };
          });
          console.log(shoppingList);
          shoppingList.push({
            itemId: itemId,
            quantity: quantity,
            frequency: frequency
          });
          console.log(shoppingList);
          dispatch(updateDBCart(shoppingList, userId));
        });
      });

  // return;
  // dispatch => db.collection("userData").where("userId", "==", userId);
};
export const initShoppingList = userId => {
  return dispatch =>
    db
      .collection("userData")
      .where("userId", "==", userId)
      .get()
      .then(res => {
        if (res !== null) {
          res.docs.forEach(doc => {
            const data = doc.data().shoppingList.map(detail => {
              console.log(detail.itemName);
              return {
                itemName: detail.itemName,
                itemId: detail.itemId,
                quantity: detail.quantity,
                price: detail.price
              };
            });
            dispatch(loadShoppingList(data));
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
};
