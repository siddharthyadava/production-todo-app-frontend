import axios from "axios";

//get user token
const user = JSON.parse(localStorage.getItem("todoapp"));

const baseUrl = process.env.REACT_APP_BASEURL;

//default auth header
axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;

//CRETE TODO
const createTodo = (data) => {
  return axios.post(`${baseUrl}/todo/create`, data);
};
//GET ALL TODO
const getAllTodo = (id) => {
  return axios.post(`${baseUrl}/todo/getAll/${id}`);
};

//UPDATE TODO
const updateTodo = (id, data) => {
  return axios.patch(`${baseUrl}/todo/update/` + id, data);
};

//DLEETE TODO
const deleteTodo = (id) => {
  return axios.delete(`${baseUrl}/todo/delete/` + id);
};

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };
export default TodoServices;
