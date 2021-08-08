import { initDataConstants } from "../constant";

const initState = {
  loading: false,
  isLoaded: false,
};

const initDataReducer = (state = initState, action) => {
  switch (action.type) {
    case initDataConstants.GET_INITIALDATA_REQUEST:
      state = {
        ...state,
        loading: true,
        isLoaded: false,
      };
      break;

    case initDataConstants.GET_INITIALDATA_FAILURE:
      state = {
        ...state,
        loading: false,
        isLoaded: true,
      };
      break;

    case initDataConstants.GET_INITIALDATA_SUCCESS:
      state = {
        ...state,
        loading: false,
        isLoaded: true,
      };
      break;

    default:
      break;
  }
  return state;
};

export default initDataReducer;
