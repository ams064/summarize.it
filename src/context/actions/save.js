import axios from 'axios';
import {
  SUMMARY_SAVED,
} from "../../utils/constants/actiontypes";


export const save = (inputText, outputText, documentName, data) => (setSaveLoad) => (dispatch) => {

    let axiosConfig = {
    headers: {
        'Authorization': data.signInUserSession.idToken.jwtToken,
    }
    };

    axios.post('https://pycn211n6k.execute-api.us-west-1.amazonaws.com/ver1', {input_data : inputText, output_text : outputText, file_name : documentName}, axiosConfig)
    .then((res) => {
        setSaveLoad(false);
        dispatch({
          type: SUMMARY_SAVED,
          payload : true,
        })
    })
    .catch((err) => {
      console.log(err);
    });
};