import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  shippingInfo: {},
  shippingInfoCompleted: 0,
  cardInfo: {}
};
const setShippingInfo = (state, action) => {
  return updateObject(state, {
    shippingInfo: action.shippingInfo,
    shippingInfoCompleted: 1
  });
};
const setCardInfo = (state, action) => {
  return updateObject(state, {
    cardInfo: action.cardInfo
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHIPPING_ADDRESS:
      return setShippingInfo(state, action);
    case actionTypes.CARD_INFO:
      return setCardInfo(state, action);
    default:
      return state;
  }
};
export default reducer;
