import axiosInstance from "../../utils/helpers/axios";
import axios from 'axios';

export const save = (inputText, outputText) => (setSaveLoad) => {
    axios.post('https://cors-anywhere.herokuapp.com/https://ptdnxz4a65.execute-api.us-west-2.amazonaws.com/test/', {inutText : inputText, outputText : outputText})
    .then((res) => {
        setSaveLoad(false);
    })
    .catch((err) => {
      console.log(err);
    });
};