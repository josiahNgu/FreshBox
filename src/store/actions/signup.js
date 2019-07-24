import * as actionTypes from "./actionTypes";
import axios from "../../axios";
const signupSuccessful = () => {
  return {
    type: actionTypes.SIGNUP_NEW_USER_SUCCESS
  };
};

const signupFailed = error => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    errorMessage: error
  };
};
export const signup = (email, password, displayName) => {
  const user = {
    email: email,
    password: password,
    displayName: displayName
  };
  return dispatch =>
    axios
      .post("/signup", user)
      .then(token => {
        localStorage.setItem("idToken", token);
        dispatch(signupSuccessful());
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(signupFailed(err.response.data));
      });
};
