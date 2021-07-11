import axios from "../../helpers/axios";
import {
  categoryConstants,
  initDataConstants,
  productConstants,
} from "../constant";

export const getInitialData = (params) => {
  return async (dispatch) => {
    dispatch({ type: initDataConstants.GET_INITIALDATA_REQUEST });

    try {
      const res = await axios.get("/initialdata");
      console.log("TryBlock:(res)", res);
      console.log("TryBlock:(res.response)", res.response);

      console.log("TryBlock:(res.request)", res.request);

      if (res.status === 200) {
        const { categories, categoryList, products, orders } = res.data;
        dispatch({
          type: categoryConstants.GET_CATEGORY_SUCCESS,
          payload: { categories, categoryList },
        });
        dispatch({
          type: productConstants.GET_PRODUCT_SUCCESS,
          payload: { products },
        });
      } else if (res.response) {
        dispatch({
          type: productConstants.GET_PRODUCT_FAILURE,
        });

        dispatch({
          type: categoryConstants.GET_CATEGORY_FAILURE,
        });
      } else {
        dispatch({
          type: productConstants.GET_PRODUCT_FAILURE,
        });

        dispatch({
          type: categoryConstants.GET_CATEGORY_FAILURE,
        });
      }
    } catch (error) {
      console.log("Catch Block", error);
      dispatch({
        type: productConstants.GET_PRODUCT_FAILURE,
      });

      dispatch({
        type: categoryConstants.GET_CATEGORY_FAILURE,
      });
    }
  };
};
