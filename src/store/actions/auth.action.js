import { authConstants } from "../constant";
import axios from "../../helpers/axios";
import { getItem, setItem, removeItem } from "../../helpers/localStorage";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.SIGNUP_REQUEST });
    const res = await axios.post("/signup", { ...user });
    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: authConstants.SIGNUP_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        const { error } = res.data;

        dispatch({
          type: authConstants.SIGNUP_FAILURE,
          payload: { error },
        });
      }
    }
  };
};

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post("/signin", { ...user });
    if (res.status === 200) {
      const { token, user } = res.data;
      setItem("token", token);
      setItem("user", user);
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      if (res.status === 400) {
        const { error } = res.data;

        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = await getItem("token");
    if (token !== null) {
      const user = await getItem("user");

      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to Login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios.post("/signout");
    console.log(res);
    if (res.status === 200) {
      removeItem("token");
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        // payload: { error: res.data.error },
      });
    }
  };
};
