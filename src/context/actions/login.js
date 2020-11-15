import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERR,
} from "../../utils/constants/actiontypes";

import { Auth } from 'aws-amplify';

export const login = ({ password, email }) => (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });

  Auth.signIn(email, password)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res,
      });
      localStorage.setItem('isAuth', true);
    })
    .catch((err) => {
      console.log(err);
      if(err.code == 'UserNotFoundException' || err.code == 'NotAuthorizedException') {
        dispatch({
          type: LOGIN_ERR,
          payload: 'Incorrect email or password',
        });
      } else if(err.code == 'UserNotConfirmedException') {
        dispatch({
          type: LOGIN_ERR,
          payload: 'Email address is not verified, please check your email for the verification link.'
        });
      }
    });
};