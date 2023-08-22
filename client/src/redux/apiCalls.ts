import { loginStart, loginSuccess, loginfailure } from "./userRedux";
import { publicRequest } from "../requestMethods";
import {
  getProductStart,
  getProductSuccess,
  getProductfailure,
} from "./productRedux";

export const login = async (dispatch: any, user: any) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginfailure());
  }
};

export const getProducts = async (dispatch: any) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductfailure());
  }
};
