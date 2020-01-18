import axios from "axios";
import {
  PROFILE_LOADING,
  SET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_USER,
  SET_PROFILES
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
    .delete(`/profile/experience/${id}`, id)
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
    .delete(`/profile/education/${id}`, id)
    .then(res => {
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Get All Profiles
export const getAllProfiles = () => dispatch => {
  axios
    .get("/profile/all")
    .then(res => {
      dispatch(setProfileLoading());
      dispatch({
        type: SET_PROFILES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: SET_PROFILES,
        payload: null
      })
    );
};

//Get Profile By handle
export const getProfileByHandle = handle => dispatch => {
  axios
    .get(`/profile/handle/${handle}`)
    .then(res => {
      dispatch(setProfileLoading());
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: SET_PROFILE,
        payload: null
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
