import {
    SIGNUP_LOADING,
    SIGNUP_SUCCESS,
    SIGNUP_ERR,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_ERR,
    USER_SIGNOUT,
    INPUT_SUMMARIZED,
    INPUT_CHANGE,
    SIGNUP_SUCCESS_MESSAGE,
    SET_ALLOW_SIGNUP,
    UPDATE_USER_INFO,
    RESET_PASSWORD,
    SUMMARY_SAVED
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
            opt_message : SIGNUP_SUCCESS_MESSAGE,
            allow_signup : false,
          },
        };

      case LOGIN_SUCCESS:
        return {
          ...state,
          auth: {
            ...state.auth,
            loading: false,
            data: payload,
            isAuth : true,
            opt_message : null,
            allow_signup : false,
            rowsChange : true,
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
            opt_message : null,
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
            opt_message : null,
            rowsChange : false,
          },
        };

      case INPUT_SUMMARIZED:
        return {
          ...state,
          auth: {
            ...state.auth,
            currInput : payload.inputText,
            currOutput : payload.outputText,
            currTags : payload.currTags,
            currLength : payload.currLength,
            currSave : payload.currSave,
          },
        };

        case INPUT_CHANGE:
          return {
            ...state,
            auth: {
              ...state.auth,
              currInput : null,
              currOutput : null,
              currTags : ["News"],
              currLength : 30,
              currSave : false,
          },
        };

        case SET_ALLOW_SIGNUP:
          return {
            ...state,
            auth: {
              ...state.auth,
              allow_signup : true,
          },
        };

        case UPDATE_USER_INFO:
          return {
            ...state,
            auth: {
              ...state.auth,
              data : payload,
          },
        };

        case RESET_PASSWORD:
          return {
            ...state,
            auth: {
              ...state.auth,
              opt_message : payload,
          },
        };

        case SUMMARY_SAVED:
          return {
            ...state,
            auth : {
              ...state.auth,
              rowsChange : true,
            },
          };
  
      default:
        console.log("Default");
        return state;
    }
  };
  
  export default auth;