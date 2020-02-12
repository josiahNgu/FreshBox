import * as actionTypes from "./actionTypes";

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
