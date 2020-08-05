import * as actionTypes from "./actionTypes";
import axios from "../../axios";
export const loadShoppingList = (data, totalPrice) => {
  return {
    type: actionTypes.GET_SHOPPINGLIST,
    shoppingList: data,
    totalPrice: totalPrice,
    fetchDataFinished: true,
    isLoading: false
  };
};
const addingToCart = () => {
  return {
    type: actionTypes.IS_ADDING_TO_CART,
    isLoading: true
  };
};
export const isCheckingOut = () => {
  return {
    type: actionTypes.IS_CHECKING_OUT,
    isCheckingOut: true
  };
};
const setTotalPrice = totalPrice => {
  return {
    type: actionTypes.TOTAL_PRICE,
    totalPrice: totalPrice
  };
};
const addToCartFinished = () => {
  return {
    type: actionTypes.IS_ADDING_TO_CART,
    isLoading: false
  };
};
export const addAuthUserCart = (itemId, quantity) => {
  const FirebaseIdToken = `Bearer:${localStorage.getItem("idToken")}`;
  axios.defaults.headers.common["Authorization"] = FirebaseIdToken;
  const newItem = {
    itemId,
    quantity
  };
  return dispatch => {
    dispatch(addingToCart());
    axios.post("shoppingCart", newItem).then(res => {
      if (res.status.toString() === "201") {
        dispatch(addToCartFinished());
      }
    });
  };
};
export const addToCart = (itemId, quantity) => {
  console.log(itemId, quantity);
  const addItem = {
    itemId: itemId,
    quantity: quantity
  };
  return dispatch => {
    dispatch(addingToCart());
    let updateShoppingList = [];
    if (localStorage.getItem("shoppingList")) {
      updateShoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    }
    updateShoppingList.push(addItem);
    localStorage.setItem("shoppingList", JSON.stringify(updateShoppingList));
    dispatch(addToCartFinished());
  };
};
export const deleteItem = (index, totalPrice) => {
  return dispatch => {
    dispatch(getTotalPrice());
    dispatch({
      type: actionTypes.DELETE_ITEM,
      deleteIndex: index
    });
  };
};
export const deleteLoggedInUserItem = itemId => {
  const FirebaseIdToken = `Bearer:${localStorage.getItem("idToken")}`;
  axios.defaults.headers.common["Authorization"] = FirebaseIdToken;
  return dispatch => {
    // axios.
  };
};
export const initShoppingList = () => {
  const FirebaseIdToken = `Bearer:${localStorage.getItem("idToken")}`;
  axios.defaults.headers.common["Authorization"] = FirebaseIdToken;
  let totalPrice = 0;
  return dispatch =>
    axios
      .get("/shoppingCart")
      .then(res => {
        const data = res.data.map(detail => {
          totalPrice += detail.price * detail.quantity;
          return {
            itemId: detail.itemId,
            itemName: detail.itemName,
            quantity: detail.quantity,
            price: detail.price,
            imageURL: detail.imageURL
          };
        });

        dispatch(loadShoppingList(data));
        dispatch(setTotalPrice(totalPrice.toFixed(2)));
      })
      .catch(err => {
        console.log("err.response.status", err);
        if (
          err.response.status.toString() === "403"
          // ||
          // err.response.status.toString() === "401"
        ) {
          // authenticationFailed();
          window.location.reload();
          console.log("err", err);
        }
      });
};
const localStorageShoppingList = (ref, quantity, frequency) => {
  return axios
    .get(`/products/${ref}`)
    .then(res => {
      return {
        itemId: res.data.id,
        price: res.data.price,
        itemName: res.data.itemName,
        imageURL: res.data.imageURL,
        quantity: quantity,
        frequency: frequency
      };
    })
    .then(data => {
      return data;
    });
};

export const initLocalShoppingList = () => {
  localStorage.removeItem("updatedSL");
  let updatedSL = [];
  let totalPrice = 0;
  return dispatch => {
    const localShoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    let promises = localShoppingList.map(item => {
      return localStorageShoppingList(
        item.itemId,
        item.quantity,
        item.deliveryOptions
      ).then(data => {
        updatedSL.push(data);
        totalPrice += data.quantity * data.price;
      });
    });
    Promise.all(promises).then(() => {
      dispatch(loadShoppingList(updatedSL, totalPrice.toFixed(2)));
    });
  };
};
const itemPrice = (ref, quantity) => {
  return axios
    .get(`/products/ref/${ref}`)
    .then(res => {
      return {
        price: res.data.price,
        quantity: quantity
      };
    })
    .then(data => {
      return data.price * data.quantity;
    });
};
export const getTotalPrice = () => {
  const localShoppingList = JSON.parse(localStorage.getItem("shoppingList"));
  let totalPrice = 0;
  return dispatch => {
    localShoppingList.map(item => {
      totalPrice += item.price;
    });
    dispatch(setTotalPrice(totalPrice.toFixed(2)));
  };
};
