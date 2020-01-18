import {
  SET_PROFILES,
  SET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  loading: false,
  profile: null,
  profiles: null
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case SET_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: action.payload
      };
    default:
      return state;
  }
}
