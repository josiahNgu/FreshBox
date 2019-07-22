import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  user: null,
  fetchDataFinished: false
};
const setUser = (state, action) => {
  return updateObject(state, {
    user: action.user,
    fetchDataFinished: true
  });
};
const setUserFailed = (state, action) => {
  return updateObject(state, {
    fetchDataFinished: false
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return setUser(state, action);
    case actionTypes.SET_USER_FAILED:
      return setUserFailed(state, action);
    default:
      return state;
  }
};
export default reducer;
