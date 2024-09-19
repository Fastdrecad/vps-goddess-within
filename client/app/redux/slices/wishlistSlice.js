import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: localStorage.getItem('wishlistItems')
    ? JSON.parse(localStorage.getItem('wishlistItems'))
    : []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // TOGGLE TO WISHLIST

    toggleWishlistItem: (state, action) => {
      const product = action.payload;
      const index = state.wishlistItems.findIndex(
        item => item._id === product._id
      );
      if (index === -1) {
        // Item is not in the wishlist, add it
        state.wishlistItems.push(product);
      } else {
        // Item is already in the wishlist, remove it
        state.wishlistItems.splice(index, 1);
      }

      localStorage.setItem(
        'wishlistItems',
        JSON.stringify(state.wishlistItems)
      );
    },

    // CLEAR WISHLIST ITEMS
    clearAllWishlistItems: state => {
      state.wishlistItems = [];
      localStorage.removeItem('wishlistItems');
    }
  }
});

export const { toggleWishlistItem, clearAllWishlistItems } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
