import * as types from '../constants/UserConstants';
import * as api from '../api/userApi';

export const register = (name, email, password) => async dispatch => {
  dispatch({ type: types.USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await api.register(name, email, password);
    dispatch({ type: types.USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: types.USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const login = (email, password) => async dispatch => {
  dispatch({ type: types.USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await api.login(email, password);
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: types.USER_LOGIN_FAIL,
      payload: 'Invalid Email or Password',
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo');
  dispatch({ type: types.USER_LOGOUT });
};

export const detailsUser = userId => async (dispatch, getState) => {
  dispatch({ type: types.USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await api.getUser(userId, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: types.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
