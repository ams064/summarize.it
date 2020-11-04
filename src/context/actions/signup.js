import axiosInstance from '../../utils/helpers/axios';

import {
    SIGNUP_LOADING,
    SIGNUP_SUCCESS,
    SIGNUP_ERR,
  } from "../../utils/constants/actiontypes";
  
  export const signup = ({
    email,
    password,
    username,
    lastName: last_name,
    firstName: first_name,
  }) => (dispatch) => {
    dispatch({
      type: SIGNUP_LOADING,
    });
  
    axiosInstance()
      .post("/signup", {
        email,
        password,
        username,
        last_name,
        first_name,
      })
      .then((res) => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: SIGNUP_ERR,
          payload: err.response ? err.response.data : "COULD NOT CONNECT",
        });
      });
  };