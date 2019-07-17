import * as actionTypes from "./actionTypes";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
export const loginSuccess = user => {
  localStorage.setItem("user", user);
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then(idToken => {
      const expiresIn = 10;
      localStorage.setItem("expires", expiresIn);
      localStorage.setItem("token", idToken);
    });
  if (localStorage.getItem("token") !== null) {
    return {
      type: actionTypes.LOGIN_SUCCESS,
      user: user
    };
  } else {
    return {
      type: actionTypes.LOGIN_FAILED
    };
  }
};
export const loginFailed = () => {
  return {
    type: actionTypes.LOGIN_FAILED,
    hasError: true
  };
};

export const login = (email, password) => {
  return dispatch =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        dispatch(loginSuccess(user));
      })
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(loginFailed());
        console.log(errorCode + errorMessage);
      });
};
export const authenticationStatus = status => {
  return {
    type: actionTypes.IS_AUTHENTICATED,
    isAuthenticated: status
  };
};
