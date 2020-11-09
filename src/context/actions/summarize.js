import axiosInstance from "../../utils/helpers/axios";
import axios from 'axios';
import { INPUT_SUMMARIZED } from "../../utils/constants/actiontypes";

export const summarize = (inputText) => (setOutputText) => (setSummarizeLoad) => (setSummarized) => (dispatch) => {
    axios.post('https://cors-anywhere.herokuapp.com/https://ptdnxz4a65.execute-api.us-west-2.amazonaws.com/test/', {text : inputText})
    .then((res) => {
        setOutputText(JSON.parse(res.data.body));
        setSummarizeLoad(false);
        setSummarized(false);
        dispatch({
            type: INPUT_SUMMARIZED,
            payload : {
              inputText : inputText,
              outputText : res.data.body
            }
          });
    })
    .catch((err) => {
      console.log(err);
    });
};