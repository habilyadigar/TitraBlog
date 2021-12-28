import * as types from '../constants/UserConstants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_REGISTER_REQUEST:
      return { loading: true };
    case types.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case types.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return { loading: true };
    case types.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case types.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case types.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case types.USER_DETAILS_REQUEST:
      return { loading: true };
    case types.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case types.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_UPDATE_REQUEST:
      return { loading: true };
    case types.USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case types.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case types.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
