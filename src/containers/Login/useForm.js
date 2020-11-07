import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/Provider";
import { useHistory } from "react-router-dom";
import { login } from "../../context/actions/login";

export default () => {
  const [form, setForm] = useState({});
  const [err, setErrors] = useState('');

  const history = useHistory();

  const {
    authDispatch,
    authState: {
      auth: { loading, error, data, isAuth },
    },
  } = useContext(AppContext);


  const onChange = (e, { name, value }) => {
    setErrors('');
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (error != null) {
        setErrors(error);
      }
  }, [error]);

  const loginFormValid = !form.email?.length || !form.password?.length;

  const onSubmit = () => {
    setErrors('');
    login(form)(authDispatch);
  };

  console.log(data);
  useEffect(() => {
    if (isAuth && data) {
      if (data.hasOwnProperty('signInUserSession')) {
        history.push("/");
      }
    }
  }, [data]);

  return { form, onChange, loading, err, loginFormValid, onSubmit };
};