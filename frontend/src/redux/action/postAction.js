import axios from "../../helper/axios";
import { PostActionTypes } from "../constant/action-type";

export const post = () => {
  return async (dispatch) => {
    dispatch({ type: PostActionTypes.GET_POST_REQUEST, payload: {} });
    try {
      const res = await axios.get(`/posts/timeline/all`);
      if (res.status === 200) {
        const { msg, timeline } = res.data;
        dispatch({
          type: PostActionTypes.GET_POST_SUCCESS,
          payload: { message: msg, posts: timeline },
        });
      } else {
        if (res.status === 400 || res.status === 404) {
          dispatch({
            type: PostActionTypes.GET_POST_FAILED,
            payload: { error: res.data },
          });
        }
      }
    } catch (error) {
      dispatch({
        type: PostActionTypes.GET_POST_FAILED,
        payload: { error },
      });
    }
  };
};
