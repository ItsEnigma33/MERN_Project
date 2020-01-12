import { GET_ERRORS, SET_USER } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

export const registerAction = (user, history) => dispatch => {
  axios
    .post("/user/register", user)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginAction = user => dispatch => {
  axios
    .post("/user/login", user)
    .then(res => {
      const { token } = res.data;
      //Setting in Local Storage
      localStorage.setItem("token", token);
      //Setting Auth Token
      setAuthToken(token);
      //JWT Decode
      const { user } = jwt_decode(token);
      //Dispatch
      dispatch(setUserDispatcher(user));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const logout = user => dispatch => {
  localStorage.removeItem("token");
  //Removing header From Axios
  setAuthToken(false);
  // Dispatching Empty Object
  dispatch(logoutUserDispatcher());
};

export const logoutUserDispatcher = () => {
  return {
    type: SET_USER,
    payload: {}
  };
};

export const setUserDispatcher = user => {
  return {
    type: SET_USER,
    payload: user
  };
};
