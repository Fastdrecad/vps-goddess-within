import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  size: null,
  price: null,
  rating: null,
  selectedCategories: []
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
    }
  }
});

export const { setSize, setPrice, setRating, setSelectedCategories } =
  filterSlice.actions;
export default filterSlice.reducer;
