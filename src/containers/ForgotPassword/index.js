import React from "react";
import ForgotPasswordUI from '../../layout/ForgotPassword';
import useForm from "./useForm";

const ForgotPasswordContainer = () => {
  return <ForgotPasswordUI form={useForm()} />
};

export default ForgotPasswordContainer;