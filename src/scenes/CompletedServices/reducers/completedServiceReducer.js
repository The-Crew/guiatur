import { SCHEDULING_LIST_COMPLETED } from '../actions/types';

const INITIAL_STATE = { schedulesCompleted: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCHEDULING_LIST_COMPLETED:
      return { ...state, schedulesCompleted: action.payload };
    default:
      return state;
  }
};
