import axios from 'axios';
import { INPUT_SUMMARIZED } from "../../utils/constants/actiontypes";

export const summarize = (inputText, length, tags) => (setOutputText) => (setSummarizeLoad) => (setSummarized) => (dispatch) => {
    axios.post('https://kqotrompeg.execute-api.us-west-1.amazonaws.com/ver1', {input_data : inputText, length: length, tags: tags})
    .then((res) => {
        let r = JSON.parse(res.data.body);
        setOutputText(r);
        setSummarizeLoad(false);
        setSummarized(false);
        dispatch({
            type: INPUT_SUMMARIZED,
            payload : {
              inputText : inputText,
              outputText : r
            }
          });
    })
    .catch((err) => {
      console.log(err);
      setSummarizeLoad(false);
    });
};