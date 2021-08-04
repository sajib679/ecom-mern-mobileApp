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

<<<<<<< HEAD
axiosInstance.interceptors.request.use(
  (req) => {
    console.log(req);
    // const CancelToken = axios.CancelToken;

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
=======
axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
>>>>>>> parent of fdc46a4... React Native -Android Working Succesfully except Icons
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
<<<<<<< HEAD
    if (error.response) {
      const { status } = error.response;
      if (status === 599) {
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
      }
=======
    const { status } = error.response;
    console.log(error.response);

    if (status === 599) {
      removeItem("token");
      removeItem("user");
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
>>>>>>> parent of fdc46a4... React Native -Android Working Succesfully except Icons
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
