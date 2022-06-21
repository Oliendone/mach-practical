import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASIC_MOVIEDB_URL,
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_MOVIEDB_API_KEY_V4}`,
  },
});

export default axiosInstance
