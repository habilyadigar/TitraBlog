import * as types from '../constants/PostConstants';
import * as api from '../api/postApi';
import Axios from 'axios';

const API_ENDPOINT = 'http://localhost:3000/api/post';

export const fetchPosts = () => async dispatch => {
  try {
    dispatch({ type: types.FETCH_POSTS_REQUEST });
    const { data } = await api.fetchPosts();
    dispatch({ type: types.FETCH_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.FETCH_POSTS_FAIL, payload: error.message });
  }
};

export const fetchSinglePost = id => async dispatch => {
  dispatch({ type: types.FETCH_SINGLE_POST_REQUEST, payload: id });
  try {
    const { data } = await api.fetchSinglePost(id);
    dispatch({ type: types.FETCH_SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: types.FETCH_SINGLE_POST_FAIL, payload: error.message });
  }
};

export const createPost = post => async (dispatch, getState) => {
  dispatch({ type: types.CREATE_POST_REQUEST, payload: post });
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.post(API_ENDPOINT, post, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: types.CREATE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.CREATE_POST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updatePost = (id, post) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: types.UPDATE_POST_REQUEST });
    const { data } = await Axios.patch(`${API_ENDPOINT}/${id}`, post, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: types.UPDATE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: types.UPDATE_POST_FAIL, payload: error.message });
  }
};

export const deletePost = id => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({ type: types.DELETE_POST_REQUEST });
    const { data } = await Axios.delete(`${API_ENDPOINT}/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: types.DELETE_POST_SUCCESS,
      payload: data._id,
    });
  } catch (error) {
    dispatch({ type: types.DELETE_POST_FAIL, payload: error.message });
  }
};

export const createComment = (postId, review) => async (dispatch, getState) => {
  dispatch({ type: types.COMMENT_POST_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const { data } = await Axios.post(`${API_ENDPOINT}/${postId}/reviews`, review, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: types.COMMENT_POST_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    dispatch({
      type: types.COMMENT_POST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
