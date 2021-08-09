import axios from "../../helpers/axios";
import { productConstants, pageConstants, resetConstants } from "../constant";

export const getProductsByslug = (slug) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST });
    const res = await axios.get(`product/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
        payload: res.data.error,
      });
    }
  };
};

export const getProductPage = (params) => {
  const { cid, type } = params;
  return async (dispatch) => {
    dispatch({ type: pageConstants.GET_PAGE_REQUEST });
    const res = await axios.get(`page/${cid}/${type}`);
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: pageConstants.GET_PAGE_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: pageConstants.GET_PAGE_FAILURE,
        payload: res.data.error,
      });
    }
  };
};

export const getProductsById = (productId) => {
  console.log(productId);

  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_BY_ID_REQUEST });
    const res = await axios.get(`p/product/${productId}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_ID_SUCCESS,
        payload: res.data.product,
      });
    } else {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_ID_FAILURE,
        payload: res.data.error,
      });
    }
  };
};

export const getProductsByName = (searchTerm) => {
  console.log(searchTerm);

  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_BY_NAME_REQUEST });
    const res = await axios.get(`search/${searchTerm}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_NAME_SUCCESS,
        payload: res.data.products,
      });
    } else if (res.status === 203) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_NAME_FAILURE,
        payload: res.data.message,
      });
    } else {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_NAME_FAILURE,
        payload: res.data.error,
      });
    }
  };
};

export const resetSearch = () => {
  return async (dispatch) =>
    dispatch({
      type: resetConstants.RESET_SEARCHED_PRODUCTS,
    });
};

export const resetProductDetails = () => {
  return async (dispatch) =>
    dispatch({ type: resetConstants.RESET_PRODUCT_DETAILS });
};
