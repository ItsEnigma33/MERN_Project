import { GET_ERRORS, CLEAR_ERROR } from "../actions/types";

const initailState = {};

export default function(state = initailState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERROR:
      return {};
    default:
      return state;
  }
}
