import {
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERROR
} from "./types";
import axios from "axios";

export const createPost = postData => dispatch => {
  dispatch({
    type: CLEAR_ERROR
  });

  axios
    .post(`/post/add`, postData)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getPostById = id => dispatch => {
  axios
    .get(`/post/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POST,
        payload: {}
      });
    });
};

export const getAllPost = () => dispatch => {
  axios
    .get("/post/all")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: []
      });
    });
};

export const likePost = id => dispatch => {
  axios
    .post(`/post/like/${id}`)
    .then(res => {
      dispatch(getAllPost());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const unlikePost = id => dispatch => {
  axios
    .post(`/post/unlike/${id}`)
    .then(res => {
      dispatch(getAllPost());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createComment = (postId, commentData) => dispatch => {
  dispatch({
    type: CLEAR_ERROR
  });

  axios
    .post(`/post/comment/add/${postId}`, commentData)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/post/comment/delete/${postId}/${commentId}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deletePost = id => dispatch => {
  axios
    .delete(`/post/delete/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_POST,
        payload: null
      });
    });
};
