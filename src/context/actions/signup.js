import {
    SIGNUP_LOADING,
    SIGNUP_SUCCESS,
    SIGNUP_ERR,
  } from "../../utils/constants/actiontypes";
import { Auth } from 'aws-amplify';
  
  export const signup = ({
    email : username,
    password,
    lastName: last_name,
    firstName: first_name,
  }) => (dispatch) => {
    dispatch({
      type: SIGNUP_LOADING,
    });
    console.log(password)
    Auth.signUp({username, password, attributes : {'custom:last_name' : last_name, 'custom:first_name' : first_name}})
      .then((res) => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        if(err.code == 'UsernameExistsException' || err.message.toLowerCase().includes('email')) {
          dispatch({
            type: SIGNUP_ERR,
            payload: {'email' : err.message}
          });          
        }

        if(err.message.toLowerCase().includes('password')) {
          dispatch({
            type: SIGNUP_ERR,
            payload: {'password' : 'Password should contain lowercase, uppercase and numbers'}
          });
        }

        else {
          dispatch({
            type: SIGNUP_ERR,
            payload: {'error' : "COULD NOT CONNECT TO SERVER"},
          });
        }
      });
  };