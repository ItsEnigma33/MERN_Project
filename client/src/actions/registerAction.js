import { GET_ERRORS } from "./types";
import axios from "axios";

export const registerAction = (user, history) => dispatch => {
  axios
    .post("/user/register", user)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
