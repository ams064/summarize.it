import {
    SIGNUP_LOADING,
    SIGNUP_SUCCESS,
    SIGNUP_ERR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERR,
  } from "../../utils/constants/actiontypes";
  
  const auth = (state, { payload, type }) => {
    switch (type) {
      case SIGNUP_LOADING:
      case LOGIN_LOADING:
        return {
          ...state,
          auth: {
            ...state.auth,
            error: false,
            loading: true,
          },
        };
  
      case SIGNUP_SUCCESS:
      case LOGIN_SUCCESS:
        return {
          ...state,
          auth: {
            ...state.auth,
            loading: false,
            data: payload,
          },
        };
  
      case SIGNUP_ERR:
      case LOGIN_ERR:
        return {
          ...state,
          auth: {
            ...state.auth,
            loading: false,
            error: payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default auth;