import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
} from "../Constans/postConstants";
import * as api from "../api/index";

export const fetchPosts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_POSTS_REQUEST });
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_POSTS_FAIL, payload: error.message });
  }
};
