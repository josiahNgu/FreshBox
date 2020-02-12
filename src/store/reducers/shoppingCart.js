import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  shoppingList: null,
  fetchDataFinished: false,
  isAddingToCart: false,
  totalPrice: 0,
  isCheckingOut: false,
  deleteIndex: null
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
const deleteItem = (state, action) => {
  const updatedSL = [
    ...state.shoppingList.slice(0, action.deleteIndex),
    ...state.shoppingList.slice(action.deleteIndex + 1)
  ];
  let totalPrice = 0;
  updatedSL.forEach(item => {
    totalPrice += item.price * item.quantity;
  });
  return updateObject(state, {
    ...state,
    shoppingList: updatedSL,
    deleteIndex: action.deleteIndex,
    totalPrice: totalPrice
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
    case actionTypes.DELETE_ITEM:
      return deleteItem(state, action);
    default:
      return state;
  }
};
export default reducer;
