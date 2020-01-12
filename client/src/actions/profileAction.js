import axios from "axios";
import { PROFILE_LOADING, SET_PROFILE, CLEAR_CURRENT_PROFILE } from "./types";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/profile/user")
    .then(res => {
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => dispatch({ type: SET_PROFILE, payload: {} }));
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
