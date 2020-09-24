import * as actionTypes from "./actionTypes";
import axios from "../../axios";
export const getUserOrders = () => {
    const FirebaseIdToken = `Bearer:${localStorage.getItem("idToken")}`;
    axios.defaults.headers.common["Authorization"] = FirebaseIdToken;
    return dispatch => {
        axios.get('order').then(result => {
            console.log('result :>> ', result);
        })
    }
}