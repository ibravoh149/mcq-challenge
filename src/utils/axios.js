import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

if (
  localStorage.getItem("data") &&
  JSON.parse(localStorage.getItem("data")).token
) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    JSON.parse(localStorage.getItem("data")).token
  }`;
} else {
  delete axios.defaults.headers.common["Authorization"];
}

export default axios;
