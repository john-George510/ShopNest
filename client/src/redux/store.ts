import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reduxCart";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});
