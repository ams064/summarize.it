import { useState, useContext, useEffect } from "react";
import { signup } from "../../context/actions/signup";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/Provider";
import { SET_ALLOW_SIGNUP } from "../../utils/constants/actiontypes";

export default () => {
  // set inital state of the form to empty object
  const [form, setForm] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState('');
  const history = useHistory();

  const {
    authDispatch,
    authState: {
      auth: { loading, error, data, opt_message, allow_signup },
    },
  } = useContext(AppContext);

  useEffect(() => {
    if (error) {
      for (const item in error) {
        setFieldErrors({ ...fieldErrors, [item]: error[item] });
      }
    }
  }, [error]);

  
  useEffect(() => {
    if (data && data.user.signInUserSession == null && !allow_signup) {
      authDispatch({
        type : SET_ALLOW_SIGNUP,
        payload : data,
      })
      history.push("/login");
    }
  }, [data]);


  // Update form on value change using setForm()
  const onChange = (event, { name, value }) => {
    setForm({ ...form, [name]: value });
    setFieldErrors('');
    setMessage('');
  };

  // Disables the submit button if one of the field is missing
  const signupFormValid =
    !form.firstName?.length ||
    !form.lastName?.length ||
    !form.password?.length ||
    !form.email?.length;

  const onSubmit = () => {
    setFieldErrors({});
    signup(form)(authDispatch);
  };

  return { form, onChange, loading, fieldErrors, signupFormValid, onSubmit };
};