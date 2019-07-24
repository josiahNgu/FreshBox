import * as actionTypes from "./actionTypes";
import axios from "../../axios";
export const loginSuccess = () => {
  if (localStorage.getItem("idToken") !== null) {
    return {
      type: actionTypes.LOGIN_SUCCESS
    };
  }
};
export const loginFailed = error => {
  return {
    type: actionTypes.LOGIN_FAILED,
    hasError: true,
    errors: error
  };
};
export const setUserData = user => {
  return {
    type: actionTypes.SET_USER,
    user: user
  };
};
export const setCallbackLink = callbackLink => {
  return {
    type: actionTypes.SET_CALLBACK_LINK,
    callbackLink
  };
};
export const logout = () => {
  return;
};
export const login = (email, password) => {
  const user = {
    email: email,
    password: password
  };
  console.log(user);
  return dispatch => {
    axios
      .post("/auth", user)
      .then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        // history.push("/products");
        // dispatch(setCallbackLink(callbackLink));
        dispatch(loginSuccess(localStorage.getItem("idToken")));
      })
      .catch(err => {
        dispatch(loginFailed(err.data));
      });
  };
};
export const getUserData = () => {
  return dispatch => {
    axios
      .get("/user")
      .then(res => {
        console.log(res);
        dispatch(setUserData(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};
export const authenticationStatus = status => {
  return {
    type: actionTypes.IS_AUTHENTICATED,
    isAuthenticated: status
  };
};
const setAuthorizationHeader = token => {
  const FirebaseIdToken = `Bearer:${token}`;
  localStorage.setItem("idToken", token);
  axios.defaults.headers.common["Authorization"] = FirebaseIdToken;
};
