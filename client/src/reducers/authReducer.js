import { SET_USER } from "../actions/types";
import isEmpty from "../utils/validator/isEmptyCheck";

const initailState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initailState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
