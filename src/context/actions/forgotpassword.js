import { Auth } from 'aws-amplify';
  
export const forgotpassword = ({ email })  => (setMessage) => (setErrors) => (setIsSendingCode) => (setCodeSent) => {  
    Auth.forgotPassword(email)
      .then((res) => {
          setMessage('Code Successfully sent, please check you email');
          setIsSendingCode(false);
          setCodeSent(true);
      })
      .catch((err) => {
        if(err.code == "UserNotFoundException") {
            setErrors('Email does not exists, please try again.');
        } else {
            setErrors('Error sending code, please try again.');
        }
        setIsSendingCode(false);
        setCodeSent(false);
      });
  };