import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";


export const postItem = createAsyncThunk(
  'cart/postItem',
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://shoppingapp-bfd38-default-rtdb.firebaseio.com/cart.json',
        item
      );
      const data = response.data;
      const obj = { id: data.name, ...item }; // Add Firebase-generated ID to the object
      return obj;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const FIREBASE_URL = "https://shoppingapp-bfd38-default-rtdb.firebaseio.com/cart";

export const getItem = createAsyncThunk(
  'cart/getItem',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://shoppingapp-bfd38-default-rtdb.firebaseio.com/cart.json'
      );
      const data = response.data;
      const arrofitem = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      return arrofitem;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantity',
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      if (quantity > 0) {
        // Update item quantity
        await axios.patch(`${FIREBASE_URL}/${id}.json`, { quantity });
        return { id, quantity };
      } else {
        // Remove item if quantity is 0
        await axios.delete(`${FIREBASE_URL}/${id}.json`);
        return { id, quantity: 0 };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isVisible: false,
    cartItems:[],
    status:null,
    loading:false,
    error:null,
    status:null
  },
  reducers: {
    toggleCart: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
  extraReducers: (builder) => {
    builder
      // postItem
      .addCase(postItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status="sending";
      })
      .addCase(postItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload);
        state.status="success";
      })
      .addCase(postItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      // getItem
      .addCase(getItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status="fetching";
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.status="success";
      })
      .addCase(getItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })


      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status="sending";
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const { id, quantity } = action.payload;
        if (quantity > 0) {
          const index = state.cartItems.findIndex((item) => item.id === id);
          if (index >= 0) {
            state.cartItems[index].quantity = quantity;
          }
        } else {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }
        state.status="success";
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status="failed";
      });
  },
});

export const { toggleCart , setCartItems ,increaseQuantity,decreaseQuantity,removeCartItem} = cartSlice.actions;
export default cartSlice.reducer;
