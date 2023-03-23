import axios from "axios";


const BASE_URL = process.env.REACT_APP_BACKEND || "http://localhost:4000";

function getAccessToken() {
  const storage = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null
  const token =  storage ? storage.token : null;
  return token
}


export const userRequest = axios.create({
  baseURL: `${BASE_URL}/api`,
});

userRequest.interceptors.request.use(config => {
  const newToken = getAccessToken();
  if (newToken) {
    config.headers.token = `Bearer ${newToken}`;
  }
  return config;
});
