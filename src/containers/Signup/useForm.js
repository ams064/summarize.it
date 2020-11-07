import { useState, useContext, useEffect } from "react";
import { signup } from "../../context/actions/signup";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/Provider";

export default () => {
  // set inital state of the form to empty object
  const [form, setForm] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

  const history = useHistory();

  const {
    authDispatch,
    authState: {
      auth: { loading, error, data },
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
    if (data) {
      history.push("/login");
    }
  }, [data]);


  // Update form on value change using setForm()
  const onChange = (event, { name, value }) => {
    setForm({ ...form, [name]: value });
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