import {
  ADD_POST,
  POST_LOADING,
  GET_POST,
  GET_POSTS,
  DELETE_POST
} from "../actions/types";
import isEmpty from "../utils/validator/isEmptyCheck";

const initailState = {
  loading: false,
  posts: [],
  post: {}
};

export default function(state = initailState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload
      };
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts].filter(post => action.payload !== post._id)
      };
    default:
      return state;
  }
}
