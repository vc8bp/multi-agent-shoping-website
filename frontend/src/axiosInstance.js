import axios from "axios";


const BASE_URL =  "http://localhost:4000/api";

function getAccessToken() {
  const storage = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null
  const token =  storage ? storage.token : null;
  return token
}


export const userRequest = axios.create({
  baseURL: BASE_URL,
  //headers: { token: `Bearer ${TOKEN}`},
});

userRequest.interceptors.request.use(config => {
  const newToken = getAccessToken();
  console.log(newToken)
  if (newToken) {
    config.headers.token = `Bearer ${newToken}`;
  }
  return config;
});
