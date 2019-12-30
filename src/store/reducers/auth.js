import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  isAuthenticated: false,
  shouldRedirect: false,
  hasError: false,
  signupError: {},
  user: null,
  token: "",
  callbackLink: "/"
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    isAuthenticated: true,
    shouldRedirect: true,
    user: action.user
  });
};
const signupUser = (state, action) => {
  return updateObject(state, {
    isAuthenticated: true,
    shouldRedirect: true
  });
};
const loginFailed = (state, action) => {
  console.log(action.errors);
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
const setUserData = (state, action) => {
  return updateObject(state, {
    user: action.user
  });
};
const setCallbackLink = (state, action) => {
  return updateObject(state, {
    callbackLink: action.callbackLink
  });
};
const setToken = (state, action) => {
  console.log("action.token :", action.token);
  return updateObject(state, {
    token: action.token
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
    case actionTypes.SET_USER:
      return setUserData(state, action);
    case actionTypes.SET_CALLBACK_LINK:
      return setCallbackLink(state, action);
    case actionTypes.SET_TOKEN:
      return setToken(state, action);
    default:
      return state;
  }
};
export default reducer;
