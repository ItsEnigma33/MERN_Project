import axios from "axios";
import {
  PROFILE_LOADING,
  SET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_USER
} from "./types";

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

// Add Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/profile/user", profileData)
    .then(res => {
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Exp
export const addExperienceAction = (experienceData, history) => dispatch => {
  axios
    .post("/profile/addExperience", experienceData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add Edu
export const addEducationAction = (educatinData, history) => dispatch => {
  axios
    .post("/profile/addEducation", educatinData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Del Exp
export const deleteExperienceById = (id, history) => dispatch => {
  axios
    .delete("", id)
    .then(res => {
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Del Edu
export const deleteEducationById = (id, history) => dispatch => {
  axios
    .delete("", id)
    .then(res => {
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Del Profile
export const deleteProfile = () => dispatch => {
  axios
    .delete("/profile/delete")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: {}
      });
    })
    .catch(err => {});
};
