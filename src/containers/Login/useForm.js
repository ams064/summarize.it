import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/Provider";
import { useHistory } from "react-router-dom";
import { login } from "../../context/actions/login";

export default () => {
  const [form, setForm] = useState({});
  const [err, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const {
    authDispatch,
    authState: {
      auth: { loading, error, data, isAuth, opt_message, allow_signup },
    },
  } = useContext(AppContext);

  const onChange = (e, { name, value }) => {
    setErrors('');
    setMessage('');
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (error != null) {
        setErrors(error);
      }
  }, [error]);

  useEffect(() => {
    if (opt_message != null) {
        setMessage(opt_message);
      }
  }, [opt_message]);

  const loginFormValid = !form.email?.length || !form.password?.length;

  const onSubmit = () => {
    setErrors('');
    setMessage('');
    login(form)(authDispatch);
  };

  useEffect(() => {
    if (isAuth && data) {
      if (data && data.signInUserSession != null) {
        history.push("/");
      }
    }
  }, [data]);

  return { form, onChange, loading, err, loginFormValid, onSubmit, message };
};