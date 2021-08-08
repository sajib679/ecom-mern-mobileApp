import { productConstants, pageConstants, resetConstants } from "../constant";

const initialState = {
  products: [],
  productsByPrice: {},
  productDetails: {},
  loading: false,
  pageReguest: false,
  page: {},
  error: null,
  isLoaded: false,
  searchedProduct: [],
  message: "",
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
        isLoaded: false,
      };
      break;
    case productConstants.GET_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        isLoaded: true,
        products: action.payload.products,
      };
      break;
    case productConstants.GET_PRODUCT_FAILURE:
      state = {
        ...initialState,
        loading: false,
        isLoaded: true,
        error: action.payload.error,
      };
      break;

    case productConstants.GET_PRODUCT_BY_SLUG_REQUEST:
      state = {
        ...state,
        loading: true,
        isLoaded: false,
        productsByPrice: initialState.productsByPrice,
      };

      break;
    case productConstants.GET_PRODUCT_BY_SLUG_FAILURE:
      state = {
        ...state,
        loading: false,
        isLoaded: true,
      };

      break;
    case productConstants.GET_PRODUCT_BY_SLUG_SUCCESS:
      state = {
        ...state,
        loading: false,
        productsByPrice: { ...action.payload.productsByPrice },
        isLoaded: true,
      };

      break;

    case pageConstants.GET_PAGE_REQUEST:
      state = {
        ...state,
        pageReguest: true,
      };

      break;
    case pageConstants.GET_PAGE_FAILURE:
      state = {
        ...state,
        pageReguest: false,
      };

      break;
    case pageConstants.GET_PAGE_SUCCESS:
      state = {
        ...state,
        page: action.payload.page,
        pageReguest: false,
      };
      break;

    case productConstants.GET_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };

      break;
    case productConstants.GET_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
      };

      break;
    case productConstants.GET_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        productDetails: action.payload,
        isLoaded: true,
      };

      break;

    case resetConstants.RESET_PRODUCT_DETAILS:
      state = {
        ...state,
        loading: false,
        productDetails: [],
      };

    case productConstants.GET_PRODUCT_BY_NAME_REQUEST:
      state = {
        ...state,
        loading: true,
      };

      break;
    case productConstants.GET_PRODUCT_BY_NAME_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload,
        searchedProduct: initialState.searchedProduct,
      };

      break;
    case productConstants.GET_PRODUCT_BY_NAME_SUCCESS:
      state = {
        ...state,
        loading: false,
        searchedProduct: action.payload,
      };

      break;

    case resetConstants.RESET_SEARCHED_PRODUCTS:
      state = {
        ...state,
        loading: false,
        searchedProduct: [],
      };

      break;

    default:
      break;
  }

  return state;
};

export default productReducer;
