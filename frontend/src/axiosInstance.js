import axios from "axios";


const BASE_URL =  "http://localhost:4000/api";

function getAccessToken() {
  const storage = JSON.parse(localStorage.getItem("user"))
  const token =  storage ? storage.token : null;
  return token
}


export const userRequest = axios.create({
  baseURL: BASE_URL,
  //headers: { token: `Bearer ${TOKEN}`},
});

userRequest.interceptors.request.use(config => {
  const newToken = getAccessToken();
  if (newToken) {
    config.headers.token = `Bearer ${newToken}`;
  }
  return config;
});
