import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

const registerUser = (data) => {
  return axios.post(`${baseUrl}/user/register`, data);
};

const loginUSer = (data) => {
  return axios.post(`${baseUrl}/user/login`, data);
};

const AuthServices = { registerUser, loginUSer };

export default AuthServices;
