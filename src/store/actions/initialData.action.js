import axios from "../../helpers/axios";
import {
  categoryConstants,
  initDataConstants,
  productConstants,
} from "../constant";

export const getInitialData = (params) => {
  return async (dispatch) => {
    dispatch({ type: initDataConstants.GET_INITIALDATA_REQUEST });
    const res = await axios.get("/initialdata");
    console.log(res);
    if (res.status === 200) {
      const { categories, categoryList, products, orders } = res.data;
      console.log(res.data);
      dispatch({
        type: categoryConstants.GET_CATEGORY_SUCCESS,
        payload: { categories, categoryList },
      });
      dispatch({
        type: productConstants.GET_PRODUCT_SUCCESS,
        payload: { products },
      });
    }
  };
};
