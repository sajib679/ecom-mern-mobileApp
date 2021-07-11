import axios from "axios";
import { api } from "./urlConfig";
import { authConstants } from "../store/constant";
import store from "../store";
import { removeItem } from "./localStorage";

// instance.interceptors.request.use((config) => {
//   /* some logic */
//   return {
//     ...config,
// cancelToken: new CancelToken((cancel) => cancel("Cancel repeated request")),
//   };
// });

const token = store.getState().auth.token;

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use(
  (req) => {
    console.log(req);
    // const CancelToken = axios.CancelToken;

    const { auth } = store.getState();
    if (auth.token) {
      req.headers.Authorization = `Bearer ${auth.token}`;
    }

    req.timeout = 20000;
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
    console.log("fromInterceptorRes:", res);
    return res;
  },
  (error) => {
    console.log("fromInterceptorError:", error);
    // console.log();
    console.log("fromInterceptorError(ERROR.request):", error.request);

    // const badResponse = error.response;
    const netwrokError = error.request;

    if (netwrokError.status === 0) {
      return netwrokError;
    }

    if (error.response) {
      const { status } = error.response;
      if (status === 599) {
        localStorage.clear();
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
      }
    }

    return error;
  }
);
export default axiosInstance;
