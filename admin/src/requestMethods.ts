import axios from "axios";

const BASE_URL = "https://shopnest-87me.onrender.com/api";

let TOKEN = "";
const currentUser = JSON.parse(
  JSON.parse(localStorage.getItem("persist:root") || "").user
).currentUser;
if (currentUser) TOKEN = currentUser.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
