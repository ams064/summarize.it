import axiosInstance from "../../utils/helpers/axios";
import {
    USER_SIGNOUT
} from "../../utils/constants/actiontypes";

import { Auth } from 'aws-amplify';

export const signOut = () => (dispatch) => {
    Auth.signOut()
    .then((res) => {
        dispatch({
            type: USER_SIGNOUT,
            payload : null,
        })
    })
    .catch((res) => {
        console.log("Error signing out");
    })
};