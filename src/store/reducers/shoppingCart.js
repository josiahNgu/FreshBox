import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  shoppingList: null,
  fetchDataFinished: true,
  isAddingToCart: false
};
const getShoppingList = (state, action) => {
  return updateObject(state, {
    shoppingList: action.shoppingList,
    fetchDataFinished: action.fetchDataFinished
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
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SHOPPINGLIST:
      return getShoppingList(state, action);
    case actionTypes.ADD_TO_CART:
      return updateShoppingList(state, action);
    case actionTypes.IS_ADDING_TO_CART:
      return addingToCart(state, action);
    default:
      return state;
  }
};
export default reducer;
