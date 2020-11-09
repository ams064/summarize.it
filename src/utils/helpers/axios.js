import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;
let headers = {};



// creatng an axios instance, so that we dont need to change code eerytime the api url changes
const axiosInstance = axios.create({
    baseURL : baseURL,
    headers,
});

export default axiosInstance;