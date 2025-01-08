import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isVisible: false,
  },
  reducers: {
    toggleCart: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
