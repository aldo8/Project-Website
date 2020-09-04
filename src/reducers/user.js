import { 
  GET_USER_TYPE,
  LOGIN_TYPE,
  LOGOUT_TYPE,
  SET_LEADER_TYPE,
  SUCCESS_TYPE,
} from 'actions/actionTypes';

const initialState = {
  isLeader:false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${LOGIN_TYPE}${SUCCESS_TYPE}`:
    case `${GET_USER_TYPE}${SUCCESS_TYPE}`:
      return { ...state, ...action.payload.data };
    case SET_LEADER_TYPE:
      return { ...state, isLeader: action.payload };
    case `${LOGOUT_TYPE}${SUCCESS_TYPE}`:
      return { ...initialState };
    default:
      return state;
  }
};
