import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/Provider";
import { useHistory } from "react-router-dom";
import { forgotpassword } from "../../context/actions/forgotpassword";
import { resetpassword } from "../../context/actions/resetpassword";

export default () => {
  const [form, setForm] = useState({});
  const [err, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isResetPasswordLoading, setIsResetPasswordLoading] = useState(false);
  const history = useHistory();


  const {
    authDispatch,
    authState: {
      auth: { opt_message },
    },
  } = useContext(AppContext);

  const onChange = (e, { name, value }) => {
    setErrors('');
    setMessage('');
    setForm({ ...form, [name]: value });
  };

  const formValid = !form.email?.length || !form.confCode?.length ||
                        !form.confPass?.length || !form.newPass?.length;

  const onEmailSubmit = () => {
    setErrors('');
    setMessage('');
    setIsSendingCode(true);
    setCodeSent(false);
    setForm({...form, ['newPass'] : ''});
    setForm({...form, ['confPass'] : ''});
    setForm({...form, ['confCode'] : ''});
    forgotpassword(form)(setMessage)(setErrors)(setIsSendingCode)(setCodeSent);
  };

  const onResetPassword = () => {
      if(form.newPass === form.confPass) {
        setErrors('');
        setMessage('');
        setIsResetPasswordLoading(true);
        resetpassword(form)(setErrors)(setIsResetPasswordLoading)(authDispatch);
      } else {
          setErrors('Password mismatch');
      }
  }

  return { form, onChange, err, onEmailSubmit, message, isSendingCode, isResetPasswordLoading, codeSent, formValid, onResetPassword };
};