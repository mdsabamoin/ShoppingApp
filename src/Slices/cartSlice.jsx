import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isVisible: false,
    cartItems:[]
  },
  reducers: {
    toggleCart: (state) => {
      state.isVisible = !state.isVisible;
    },
    setCartItems:(state,action)=>{
        const index = state.cartItems.findIndex((item)=>item.id === action.payload.id);
        if(index >= 0){
            state.cartItems[index].quantity += 1;
        }else{
            state.cartItems.push(action.payload)
        }
        
    },
    removeCartItem:(state)=>{
        state.cartItems = state.cartItems.filter((item)=>item.quantity > 0)
    },
    increaseQuantity:(state,action)=>{
        const index = state.cartItems.findIndex((item)=>item.id == action.payload.id)
        if(index >= 0){
            state.cartItems[index].quantity += 1; 
        }
    },
    decreaseQuantity:(state,action)=>{
        const index = state.cartItems.findIndex((item)=>item.id == action.payload.id)
        if(index >= 0){
            state.cartItems[index].quantity -= 1; 
        }
    }
  },
});

export const { toggleCart , setCartItems ,increaseQuantity,decreaseQuantity,removeCartItem} = cartSlice.actions;
export default cartSlice.reducer;
