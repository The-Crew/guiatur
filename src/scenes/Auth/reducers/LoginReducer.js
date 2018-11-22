import {
  CHANGE_LOGIN_USERNAME,
  CHANGE_LOGIN_PASSWORD,
  LOADING_LOGIN,
} from '../actions/types';

const INITIAL_STATE = {
  username: 'filipegame07',
  password: '123456',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LOGIN_USERNAME:
      return { ...state, username: action.payload };
    case CHANGE_LOGIN_PASSWORD:
      return { ...state, password: action.payload };
    case LOADING_LOGIN:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
