// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
import Cookies from "universal-cookie";
require('dotenv').config();

const baseURL = process.env.REACT_APP_API_URL;
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");

  if (accessToken) {
    config.headers["authorization"] = "Bearer " + accessToken;
  }

  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;