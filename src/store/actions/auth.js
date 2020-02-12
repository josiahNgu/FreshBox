import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import firebase from "firebase/app";
import "firebase/auth";
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
    errors: error,
    hasError: true
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
        dispatch(
          loginFailed("There was an error while log in. Please try again")
        );
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
export const googleAuth = () => {
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
  console.log("here");
  let user = null;
  // firebase.auth().signInWithRedirect(GoogleProvider);
  firebase
    .auth()
    .signInWithPopup(GoogleProvider)
    .then(result => {
      const token = result.credential.accessToken;
      console.log("result :", result);
      const expirationDate = new Date(
        new Date().getTime() + result.credential.expiresIn * 1000
      );

      user = result.user;
      localStorage.setItem("idToken", token);
      localStorage.setItem("expirationDate", expirationDate);
      // <Redirect to="/account" />;
      // dispatch(setUserData, user);
    })
    .catch(err => {
      console.log(err);
    });
  return dispatch => {
    dispatch(setUserData(user));
  };
};
