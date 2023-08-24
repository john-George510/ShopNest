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
    deleteProductStart: (state) => {
      state.isFetching = true;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item: any) => item._id === action.payload),
        1
      );
    },
    deleteProductfailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductfailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductfailure,
} = productSlice.actions;
export default productSlice.reducer;
