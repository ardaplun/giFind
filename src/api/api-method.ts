import axios from 'axios';

const APP_BASE_URL = 'http://api.giphy.com/v1/gifs';

export const API = axios.create({
  baseURL: APP_BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.params = {...config.params, 'api_key': process.env.VUE_APP_GIPHY_KEY};// eslint-disable-line
    return config;
  },
  (error) => Promise.reject(error),
);

export default API;
