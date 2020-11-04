import axiosInstance from "../../utils/helpers/axios";
import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERR,
} from "../../utils/constants/actiontypes";

export const login = ({ password, username }) => (dispatch) => {
  dispatch({
    type: LOGIN_LOADING,
  });

  axiosInstance()
    .post("/login", {
      password,
      username,
    })
    .then((res) => {
      localStorage.token = res.data.token;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_ERR,
        payload: err.response ? err.response.data : "COULD NOT CONNECT",
      });
    });
};