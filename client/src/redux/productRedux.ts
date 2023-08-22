import { createSlice } from "@reduxjs/toolkit";

export interface userState {
  user: any;
  isFetching: boolean;
  error: boolean;
}

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getProductStart: (state) => {
      state.isFetching = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductfailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getProductStart, getProductSuccess, getProductfailure } =
  productSlice.actions;
export default productSlice.reducer;
