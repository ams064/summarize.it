import {
    SIGNUP_LOADING,
    SIGNUP_SUCCESS,
    SIGNUP_ERR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERR,
    USER_SIGNOUT,
  } from "../../utils/constants/actiontypes";
  
  const auth = (state, { payload, type }) => {
    console.log(type);
    switch (type) {
      case SIGNUP_LOADING:
      case LOGIN_LOADING:
        console.log("Loading");
        return {
          ...state,
          auth: {
            ...state.auth,
            error: false,
            loading: true,
            isAuth : false,
          },
        };
  
      case SIGNUP_SUCCESS:
        return {
          ...state,
          auth: {
            ...state.auth,
            loading: false,
            data: payload,
            isAuth : false,
          },
        };

      case LOGIN_SUCCESS:
        console.log("Logged in");
        return {
          ...state,
          auth: {
            ...state.auth,
            loading: false,
            data: payload,
            isAuth : true,
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
            isAuth : false,
          },
        };

      case USER_SIGNOUT:
        return {
          ...state,
          auth: {
            ...state.auth,
            loading: false,
            data: null,
            isAuth : false,
          },
        };
      default:
        return state;
    }
  };
  
  export default auth;