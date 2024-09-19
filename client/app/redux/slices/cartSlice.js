import { createSlice } from '@reduxjs/toolkit';
import { areProductsEqual, updateCart } from '../../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { ...newItem } = action.payload;

      const existingItem = state.cartItems.find((item) =>
        areProductsEqual(item, newItem)
      );

      if (!existingItem) {
        state.cartItems.push({ ...newItem });
      } else {
        existingItem.qty += 1;
      }

      return updateCart(state);
    },

    addFromDropdownToCart: (state, action) => {
      const { ...newItem } = action.payload;
      const { qty } = action.payload;

      const existingItem = state.cartItems.find((item) =>
        areProductsEqual(item, newItem)
      );

      if (existingItem) {
        existingItem.qty = qty;
      }

      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => !areProductsEqual(item, itemToRemove)
      );

      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
      return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
      return updateCart(state);
    },

    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
      return updateCart(state);
    },

    resetCart: () => {
      return initialState;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  addFromDropdownToCart,
  clearCartItems,
  savePaymentMethod,
  resetCart
} = cartSlice.actions;

export default cartSlice.reducer;
