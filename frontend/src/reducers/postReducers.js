import * as types from "../Constans/postConstants";

const initialState = {
  posts: [],
  currentPost: null,
};

const postReducer = (state = initialState, action) => {
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
  }
};

export { postReducer };
