import axios from "axios";
import { api } from "./urlConfig";
import { authConstants } from "../store/constant";
import store from "../store";
import { removeItem } from "./localStorage";

const token = store.getState().auth.token;

console.log("fromAXIOS", token);

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { status } = error.response;
    console.log(error.response);

    if (status === 599) {
      removeItem("token");
      removeItem("user");
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
