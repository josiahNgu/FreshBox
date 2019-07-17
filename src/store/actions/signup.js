import * as actionTypes from "./actionTypes";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const signupSuccessful = () => {
  return {
    type: actionTypes.SIGNUP_NEW_USER_SUCCESS,
    newUser: firebase.auth().currentUser
  };
};

const signupFailed = error => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    errorMessage: error
  };
};
export const signup = (email, password, displayName) => {
  return dispatch =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        localStorage.setItem("token", user.stsTokenManager.accessToken);
        localStorage.setItem(
          "expirationTime",
          user.stsTokenManager.expirationTime
        );
        user
          .updateProfile({
            displayName: displayName
          })
          .then(() => {
            dispatch(signupSuccessful());
          })
          .catch(error => {
            console.log(error.code + error.message);
          });
        console.log(user);
      })
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        dispatch(signupFailed(error.message));
      });
};
