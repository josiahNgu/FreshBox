import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  products: null,
  fetchDataFinished: false
};
const getProducts = (state, action) => {
  return updateObject(state, {
    products: action.products,
    fetchDataFinished: action.fetchDataFinished
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return getProducts(state, action);
    default:
      return state;
  }
};
export default reducer;
