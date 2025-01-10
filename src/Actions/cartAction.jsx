import axios from "axios";
import {
  setCartItems,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
} from "../Slices/cartSlice";

const FIREBASE_BASE_URL = "https://shoppingapp-bfd38-default-rtdb.firebaseio.com/cart";

// Action creator for adding/updating cart
export const cartAction = (item) => {
  return async (dispatch, getState) => {
    try {
      const state = getState(); // Get the current Redux state
      const existingCartItems = state.cart.cartItems;

      // Check if the cart already contains the item
      const existingItem = existingCartItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        // If the item exists, increase its quantity
        const updatedQuantity = existingItem.quantity + 1;
        await axios.patch(`${FIREBASE_BASE_URL}/${existingItem.id}.json`, {
          quantity: updatedQuantity,
        });
        dispatch(increaseQuantity({ id: item.id }));
      } else {
        // If the item does not exist, add it to the cart
        const response = await axios.post(`${FIREBASE_BASE_URL}.json`, item);
        if (response.data) {
          const firebaseId = response.data.name; // Firebase returns a unique ID
          dispatch(
            setCartItems({
              id: firebaseId, // Use Firebase ID as the unique identifier
              ...item,
            })
          );
        }
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
};

// Action creator for decreasing quantity or removing item
export const decreaseCartItem = (itemId) => {
  return async (dispatch, getState) => {
    try {
      const state = getState(); // Get the current Redux state
      const existingCartItems = state.cart.cartItems;

      const existingItem = existingCartItems.find(
        (cartItem) => cartItem.id === itemId
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // Decrease quantity if greater than 1
          const updatedQuantity = existingItem.quantity - 1;
          await axios.patch(`${FIREBASE_BASE_URL}/${itemId}.json`, {
            quantity: updatedQuantity,
          });
          dispatch(decreaseQuantity({ id: itemId }));
        } else {
          // Remove item if quantity is less than or equal to 0
          await axios.delete(`${FIREBASE_BASE_URL}/${itemId}.json`);
          dispatch(removeCartItem());
        }
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
};

// Action creator for fetching cart items on reload
export const fetchCartItems = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${FIREBASE_BASE_URL}.json`);
      if (response.data) {
        // Convert Firebase object to an array
        const cartItems = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        cartItems.forEach((item) => {
          dispatch(setCartItems(item));
        });
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
};
