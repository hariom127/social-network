import { PostActionTypes } from "../constant/action-type";

const initialState = {
  message: "",
  posts: [],
  loading: false,
};
// (state, action) --------destructure action------> (state, {type, payload})  -----------
export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PostActionTypes.GET_POST_REQUEST:
      return (state = { ...state, loading: true });
    case PostActionTypes.GET_POST_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        posts: payload.posts,
        message: payload.message,
      });
    case PostActionTypes.GET_POST_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};
