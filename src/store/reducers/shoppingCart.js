import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  shoppingList: null,
  fetchDataFinished: false,
  isAddingToCart: false,
  totalPrice: 0,
  isCheckingOut: false,
  fetchCartDone: false
};
const getShoppingList = (state, action) => {
  return updateObject(state, {
    shoppingList: action.shoppingList,
    totalPrice: action.totalPrice,
    fetchDataFinished: true
  });
};
const updateShoppingList = (state, action) => {
  return updateObject(state, {
    shoppingList: action.shoppingList
  });
};
const addingToCart = (state, action) => {
  return updateObject(state, {
    isAddingToCart: action.isLoading
  });
};
const setTotalPrice = (state, action) => {
  return updateObject(state, {
    totalPrice: action.totalPrice
  });
};
const setIsCheckingOut = (state, action) => {
  return updateObject(state, {
    isCheckingOut: action.isCheckingOut
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SHOPPINGLIST:
      return getShoppingList(state, action);
    case actionTypes.ADD_TO_CART:
      return updateShoppingList(state, action);
    case actionTypes.IS_ADDING_TO_CART:
      return addingToCart(state, action);
    case actionTypes.TOTAL_PRICE:
      return setTotalPrice(state, action);
    case actionTypes.IS_CHECKING_OUT:
      return setIsCheckingOut(state, action);
    default:
      return state;
  }
};
export default reducer;
