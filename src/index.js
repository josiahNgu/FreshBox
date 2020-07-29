import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import "bootstrap/dist/css/bootstrap.css";
import productReducer from "./store/reducers/products";
import authReducer from "./store/reducers/auth";
import shoppingCartReducer from "./store/reducers/shoppingCart";
import paymentReducer from "./store/reducers/payment";
import userReducer from "./store/reducers/user";
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  shoppingCart: shoppingCartReducer,
  user: userReducer,
  payment: paymentReducer,
});
// For example, if you use Firebase for your app, you’ll need to get that set up as your app is first mounting.
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
