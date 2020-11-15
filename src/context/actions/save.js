import axiosInstance from "../../utils/helpers/axios";
import axios from 'axios';

export const save = (inputText, outputText) => (setSaveLoad) => {
    axios.post('https://cors-anywhere.herokuapp.com/https://kqotrompeg.execute-api.us-west-1.amazonaws.com/ver1', {inutText : inputText, outputText : outputText})
    .then((res) => {
        setSaveLoad(false);
    })
    .catch((err) => {
      console.log(err);
    });
};