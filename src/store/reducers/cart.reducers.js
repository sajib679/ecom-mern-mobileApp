import { cartConstants } from "../constant";

const initState = {
  cartItems: {},
  updatingCart: false,
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        updatingCart: true,
      };
      break;
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
      };
      break;
    case cartConstants.ADD_TO_CART_FAILURE:
      state = {
        ...state,
        updatingCart: false,
        error: action.payload.error,
      };
      break;
    case cartConstants.RESET_CART:
      state = {
        ...initState,
        cartItems: {},
      };
      break;
    default:
      break;
  }
  return state;
};

export default cartReducer;
