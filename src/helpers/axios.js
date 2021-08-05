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

axiosInstance.interceptors.request.use(
  (req) => {
    console.log(req);
    const { auth } = store.getState();
    if (auth.token) {
      req.headers.Authorization = `Bearer ${auth.token}`;
    }

    req.timeout = 30000;
    return req;
  },
  (error) => {
    // Do something with request error
    console.log(error);
    return error;
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 599) {
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
      }
    }

    return error.response;
  }
);
export default axiosInstance;
