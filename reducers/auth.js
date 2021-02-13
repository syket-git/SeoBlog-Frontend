import { SIGNUP, SIGNIN, SIGNOUT } from '../actions/types';
import { getCookie, getLocalStorage } from '../actions/auth';

const token = getCookie('token');
const user = getLocalStorage('user');

const initialState = {
  token: token !== undefined ? token : null,
  user: user !== undefined ? user : null,
  loading: token || user ? false : true,
  isAuthenticated: token || user ? true : false,
};
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
