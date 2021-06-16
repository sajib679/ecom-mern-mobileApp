import { searchConstants } from "../constant";

export const searchFocused = (focused, count) => {
  return async (dispatch) =>
    dispatch({
      type: searchConstants.IS_SEARCH_BAR_FOCUSED,
      payload: { focused, count },
    });
};
