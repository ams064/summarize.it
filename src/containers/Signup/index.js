import React, { useEffect } from "react";
import SignupUI from "../../layout/Signup";
import useForm from './useForm';

const SignupContainer = () => {
  useEffect(() => {}, []);

  return <SignupUI form={ useForm() } />;
};

export default SignupContainer;