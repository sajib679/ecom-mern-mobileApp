// @ts-nocheck
import axios from "../../helpers/axios";
import { bannerConstants } from "../constant";

export const getAllBanner = () => {
  return async (dispatch) => {
    dispatch({ type: bannerConstants.GET_BANNER_REQUEST });
    const res = await axios.get(`/banner`);

    if (res.status == 200) {
      dispatch({
        type: bannerConstants.GET_BANNER_SUCCESS,
        payload: res.data.banner,
      });
    }
  };
};
