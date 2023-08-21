import { loginStart, loginSuccess, loginfailure } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch: any, user: any) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginfailure());
  }
};
