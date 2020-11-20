import axiosInstance from "../../utils/helpers/axios";
import axios from 'axios';
import {
  SUMMARY_SAVED,
} from "../../utils/constants/actiontypes";


export const save = (inputText, outputText) => (setSaveLoad) => (dispatch) => {
    axios.post('https://cors-anywhere.herokuapp.com/https://kqotrompeg.execute-api.us-west-1.amazonaws.com/ver1', {inutText : inputText, outputText : outputText})
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