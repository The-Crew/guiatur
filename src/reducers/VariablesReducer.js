import { MODIFY_USER_DATA, SET_VARIABLES } from '../actions/types';

const INITIAL_STATE = {
  user: {
    email: '',
    name: '',
    lastname: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFY_USER_DATA:
      console.log('USER', action.payload);
      return { ...state, user: action.payload };
    case SET_VARIABLES:
      console.log('SET_VARIABLES', action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
