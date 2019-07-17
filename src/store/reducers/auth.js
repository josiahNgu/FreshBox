import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  user: null,
  isAuthenticated: false,
  shouldRedirect: false,
  hasError: false,
  signupError: []
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    isAuthenticated: true,
    user: action.user
  });
};
const signupUser = (state, action) => {
  return updateObject(state, {
    user: action.newUser,
    isAuthenticated: true,
    shouldRedirect: true
  });
};
const loginFailed = state => {
  return updateObject(state, {
    hasError: true
  });
};
const signupFailed = (state, action) => {
  return updateObject(state, {
    signupError: action.errorMessage
  });
};
const setAuthentication = (state, action) => {
  return updateObject(state, {
    isAuthenticated: action.isAuthenticated
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.SIGNUP_NEW_USER_SUCCESS:
      return signupUser(state, action);
    case actionTypes.LOGIN_FAILED:
      return loginFailed(state, action);
    case actionTypes.SIGNUP_FAILED:
      return signupFailed(state, action);
    case actionTypes.IS_AUTHENTICATED:
      return setAuthentication(state, action);
    default:
      return state;
  }
};
export default reducer;
