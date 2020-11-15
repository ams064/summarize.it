import {
    UPDATE_USER_INFO,
  } from "../../utils/constants/actiontypes";
  
  import { Auth } from 'aws-amplify';
  
  export const updateUserInfo = ({ firstName, lastName, email, currentPassword, newPassword }) => (dispatch) => (setLoading) => {
  
    Auth.currentAuthenticatedUser({bypassCache: true})
    .then((user) => {
        if(currentPassword?.length !== 0) {
            return Auth.changePassword(user, currentPassword, newPassword);
        } else {
            return Auth.updateUserAttributes(user, {'custom:last_name' : lastName, 'custom:first_name' : firstName});
        }
      })
      .then((data) => {
        return Auth.currentAuthenticatedUser();
      })
      .then((changed_data) => {
        if(currentPassword?.length === 0) {
            dispatch({
                type: UPDATE_USER_INFO,
                payload : changed_data,
            });
            setLoading(false);
        } else {
            return Auth.updateUserAttributes(changed_data, {'custom:last_name' : lastName, 'custom:first_name' : firstName});
        }
      })
      .then((f_data) => {
        return Auth.currentAuthenticatedUser();
      })
      .then((final_data) => {
        dispatch({
            type: UPDATE_USER_INFO,
            payload : final_data,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
