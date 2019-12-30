import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  products: null,
  productDetails: null,
  fetchDataFinished: false,
  fetchIndividualDataFinished: false
};
const getProducts = (state, action) => {
  return updateObject(state, {
    products: action.products,
    fetchDataFinished: action.fetchDataFinished
  });
};
const getProductDetails = (state, action) => {
  return updateObject(state, {
    productDetails: action.productDetails,
    fetchIndividualDataFinished: action.fetchIndividualDataFinished
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS:
      return getProducts(state, action);
    case actionTypes.GET_PRODUCT_DETAILS:
      return getProductDetails(state, action);
    default:
      return state;
  }
};
export default reducer;
