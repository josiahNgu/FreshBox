import axios from "../../axios";

export const initPaypal = () => {
  return dispatch => {
    axios.post("/payment").then(data => console.log(data));
  };
};
