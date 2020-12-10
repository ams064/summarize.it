import axios from 'axios';
import { INPUT_SUMMARIZED } from "../../utils/constants/actiontypes";

export const summarize = (inputText, length, tags) => (setOutputText) => (setSummarizeLoad) => (setSummarized) => (setCanSave)=> (dispatch) => {
    axios.post('https://kqotrompeg.execute-api.us-west-1.amazonaws.com/ver1', {input_data : inputText, length: length, tags: tags})
    .then((res) => {
        console.log(res);
        let r = JSON.parse(res.data.body);
        setOutputText(r);
        console.log(r);
        setSummarizeLoad(false);
        setSummarized(false);
        setCanSave(true);
        dispatch({
            type: INPUT_SUMMARIZED,
            payload : {
              inputText : inputText,
              outputText : r,
              currTags : tags,
              currLength : length,
              currSave : true,
            }
          });
    })
    .catch((err) => {
      console.log(err);
      setSummarizeLoad(false);
    });
};