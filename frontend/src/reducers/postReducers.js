import * as types from '../constants/PostConstants';
/*
export const fetchPostsReducer = (state = { loading: true, posts: [] }, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_REQUEST:
      return { loading: true };
    case types.FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload, loading: false };
    case types.FETCH_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return {
        ...state,
      };
  }
};

export const fetchSinglePostReducer = (state = { loading: true, post: [] }, action) => {
  switch (action.type) {
    case types.FETCH_SINGLE_POST_REQUEST:
      return { loading: true };
    case types.FETCH_SINGLE_POST_SUCCESS:
      return { loading: false, post: action.payload };
    case types.FETCH_SINGLE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return {
        ...state,
      };
  }
};

export const createPostReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case types.CREATE_POST_REQUEST:
      return { loading: true };
    case types.CREATE_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case types.CREATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return {
        ...state,
      };
  }
};

export const updatePostReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_POST_REQUEST:
      return { loading: true };
    case types.UPDATE_POST_SUCCESS:
      return { loading: false, success: true };
    case types.UPDATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return {
        ...state,
      };
  }
};

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case types.DELETE_POST_REQUEST:
      return { loading: true };
    case types.DELETE_POST_SUCCESS:
      return { loading: false, success: true };
    case types.DELETE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return {
        ...state,
      };
  }
};
*/

export const postReducer = (state = { loading: true, posts: [], currentPost: null }, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_REQUEST:
      return {
        loading: true,
        posts: [],
      };
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case types.FETCH_POSTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case types.FETCH_SINGLE_POST_REQUEST:
      return {
        loading: true,
        posts: [],
      };
    case types.FETCH_SINGLE_POST_SUCCESS:
      return {
        ...state,
        currentPost: action.payload,
        loading: false,
      };
    case types.FETCH_SINGLE_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case types.CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      };
    case types.CREATE_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case types.DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        currentPost: null,
        loading: false,
      };
    case types.DELETE_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case types.UPDATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          post._id === action.payload._id ? action.payload : post;
        }),
        currentPost: action.payload,
        loading: false,
      };
    case types.UPDATE_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
