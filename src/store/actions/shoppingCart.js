import * as actionTypes from "./actionTypes";
import axios from "../../axios";
export const loadShoppingList = (data, totalPrice) => {
  console.log("dataofCart", data);
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
    //     dispatch(initLocalShoppingList());
    //   } else {
    //     const FirebaseIdToken = `Bearer:${localStorage.getItem("idToken")}`;
    //     axios.defaults.headers.common["Authorization"] = FirebaseIdToken;

    //     dispatch(addingToCart());
    //     axios
    //       .post("/shoppingCart", addItem)
    //       .then(() => initShoppingList())
    //       .catch(err => console.log(err));
    //   }
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

/*TODO:fix why can't set localStorage outside of the loop because js read line by line and dont wait for async */
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
    //  for (let i = 0; i < localShoppingList.length; i++) {
    //   localStorageShoppingList(
    //     localShoppingList[i].itemId,
    //     localShoppingList[i].quantity
    //   ).then(data => {
    //     updatedSL.push(data);
    //   });
    //   localStorage.setItem("updatedSL", JSON.stringify(updatedSL));
    // }
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
    for (let i = 0; i < localShoppingList.length; i++) {
      // eslint-disable-next-line no-loop-func
      itemPrice(
        localShoppingList[i].itemId,
        localShoppingList[i].quantity
      ).then(
        // eslint-disable-next-line no-loop-func
        data => {
          totalPrice = totalPrice + data;
          console.log("totalPrice", totalPrice.toFixed(2));
        }
      );
    }
    dispatch(setTotalPrice(totalPrice.toFixed(2)));

    // return dispatch => {
    //   dispatch(setTotalPrice(totalPrice.toFixed(2)));
  };
};
