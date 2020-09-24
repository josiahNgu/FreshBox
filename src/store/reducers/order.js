import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
    isAuthenticated: false,
    shouldRedirect: false,
    hasError: false,
    signupError: {},
    user: null,
    token: "",
    loginSuccess: false,
    callbackLink: "/"
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);

        default:
            return state;
    }
};
export default reducer;
