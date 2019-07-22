import axios from "../../axios";
import * as actionTypes from "./actionTypes";
const setUserData = user => {
  return {
    type: actionTypes.SET_USER,
    user: user
  };
};
const getUserDataFailed = () => {
  return {
    type: actionTypes.SET_USER_FAILED
  };
};

export const getAuthenticatedUserData = () => {
  const FirebaseIdToken = `Bearer:${localStorage.getItem("idToken")}`;
  axios.defaults.headers.common["Authorization"] = FirebaseIdToken;
  return dispatch =>
    axios
      .get("/user")
      .then(res => {
        // console.log(res.data.userData.credentials);
        dispatch(setUserData(res.data.userData.credentials));
      })
      .catch(err => {
        dispatch(getUserDataFailed(err.data));
      });
};
