import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "../pages/Product";

interface Product {
  _id: string;
  title: string;
  desc: string;
  img: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

interface CartState {
  products: Product[];
  quantity: number;
  total: number;
}

const initialState: CartState = {
  products: [],
  quantity: 0,
  total: 0,
};

export interface RootState {
  cart: CartState;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
      }>
    ) => {
      state.quantity += 1;
      state.products.push(action.payload.product);
      state.total += action.payload.product.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
