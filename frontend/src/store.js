import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { commentReducer, postReducer } from './reducers/postReducers';
import { userRegisterReducer, userLoginReducer, userDetailsReducer, userUpdateReducer } from './reducers/userReducers';

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  },
};

const rootReducer = combineReducers({
  //post
  posts: postReducer,
  comment: commentReducer,
  //user
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
