import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

const registerUser = (data) => {
  return axios.post(`${baseUrl}/user/register`, data);
};

const loginUSer = (data) => {
  return axios.post(`${baseUrl}/user/login`, data);
};

const forgotPassword = (data) => {
  return axios.post(`${baseUrl}/user/forgot-password`, data);
}

const resetPassword = (token, data) => {
  return axios.post(`${baseUrl}/user/reset-password/${token}`, data);
}

const AuthServices = { registerUser, loginUSer, forgotPassword, resetPassword };

export default AuthServices;
