import {
    RESET_PASSWORD,
  } from "../../utils/constants/actiontypes";

import { Auth } from 'aws-amplify';
  
export const resetpassword = ({ email, confCode, newPass })  => (setErrors) => (setIsResetPasswordLoading) => (dispatch) => {  
    Auth.forgotPasswordSubmit(email, confCode, newPass)
      .then((res) => {
          setIsResetPasswordLoading(false);
          dispatch({
              type : RESET_PASSWORD,
              payload : 'Password reset successful'
          });
      })
      .catch((err) => {
          setIsResetPasswordLoading(false);
          if(err.code === "CodeMismatchException") {
              setErrors("Confirmation code is invalid, please try again.")
          } else if (err.code === "LimitExceededException") {
              setErrors(err.message);
          } else{
            setErrors(err.message);
          }
      });
  };

