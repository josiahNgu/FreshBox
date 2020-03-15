import * as actionTypes from "./actionTypes";
import axios from "../../axios";

const setShippingAddress = info => {
  return {
    type: actionTypes.SHIPPING_ADDRESS,
    shippingInfo: info
  };
};
export const shippingAddressForm = shippingInfo => {
  return dispatch => dispatch(setShippingAddress(shippingInfo));
};
export const cardForm = cardInfo => {
  return {
    type: actionTypes.CARD_INFO,
    cardInfo: cardInfo
  };
};
export const placeOrder = (userOrder, shippingInfo, cardInfo) => {
  const order = {
    userOrder: userOrder,
    shippingInfo: shippingInfo,
    cardInfo: cardInfo
  };
  console.log("order :", order);
  return dispatch =>
    axios
      .post("/order", order)
      .then(res => {
        console.log("res :", res);
      })
      .catch(err => {
        console.log("err :", err);
      });
};
