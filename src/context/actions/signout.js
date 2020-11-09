import {
    USER_SIGNOUT
} from "../../utils/constants/actiontypes";

import { Auth } from 'aws-amplify';

export const signOut = (history) => (dispatch) => {
    Auth.signOut()
    .then((res) => {
        localStorage.setItem('isAuth', false);
        dispatch({
            type: USER_SIGNOUT,
            payload : null,
        })
        history.push('/login');
    })
    .catch((res) => {
        console.log("Error signing out");
    })
};