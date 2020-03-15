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
export const addToCart = (itemId, quantity, deliveryOptions) => {
  console.log(itemId, quantity, deliveryOptions);
  const addItem = {
    itemId: itemId,
    quantity: quantity,
    deliveryOptions: deliveryOptions
  };
  return dispatch => {
    dispatch(addingToCart());
    //   if (localStorage.getItem("idToken") === null) {
    let updateShoppingList = [];
    if (localStorage.getItem("shoppingList")) {
      updateShoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    }
    updateShoppingList.push(addItem);
    localStorage.setItem("shoppingList", JSON.stringify(updateShoppingList));
    setTimeout(() => {
      dispatch(addToCartFinished());
    }, 3000);
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
export const initShoppingList = () => {
  const FirebaseIdToken = `Bearer:${localStorage.getItem("idToken")}`;
  axios.defaults.headers.common["Authorization"] = FirebaseIdToken;
  return dispatch =>
    axios
      .get("/shoppingCart")
      .then(res => {
        console.log(res);
        const data = res.data.map(detail => {
          return {
            itemId: detail.itemId,
            itemName: detail.itemName,
            frequency: detail.frequency,
            imageURL: detail.imageURL
          };
        });
        dispatch(loadShoppingList(data));
      })
      .catch(err => {
        console.log("err.response.status", err.response.status);
        if (err.response.status.toString() === "403") {
          // authenticationFailed();
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
