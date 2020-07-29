import * as actionTypes from "./actionTypes";
import axios from "../../axios";

// import "firebase/auth";
export const loginSuccess = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
};

export const loginFailed = (error) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    errors: error,
    hasError: true,
  };
};
export const setUserData = (user) => {
  return {
    type: actionTypes.SET_USER,
    user: user,
  };
};
export const setCallbackLink = (callbackLink) => {
  return {
    type: actionTypes.SET_CALLBACK_LINK,
    callbackLink,
  };
};
export const logout = () => {
  return;
};
export const login = (email, password) => {
  const user = {
    email: email,
    password: password,
  };
  return (dispatch) => {
    axios
      .post("/auth", user)
      .then((res) => {
        localStorage.setItem("idToken", res.data.idToken);

        // setAuthorizationHeader(res.data.idToken);
        // dispatch(getUserData());
        dispatch(loginSuccess());
      })
      .catch((err) => {
        console.log("err :>> ", err);
        dispatch(
          loginFailed("There was an error while log in. Please try again")
        );
      });
  };
};
export const getUserData = () => {
  return (dispatch) => {
    axios
      .get("/user")
      .then((res) => {
        console.log(res);
        dispatch(setUserData(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};
export const authenticationStatus = (status) => {
  return {
    type: actionTypes.IS_AUTHENTICATED,
    isAuthenticated: status,
  };
};
const setAuthorizationHeader = (token) => {
  const FirebaseIdToken = "Bearer:" + token;
  console.log("setAuthorizationHeader() token :", token);
  localStorage.setItem("idToken", token);
  axios.defaults.headers.common["Authorization"] = FirebaseIdToken;
};
