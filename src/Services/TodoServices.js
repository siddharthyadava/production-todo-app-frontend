import axios from "axios";

// Base URL
const baseUrl = process.env.REACT_APP_BASEURL;

// Read user from localStorage safely
const storedUser = localStorage.getItem("todoapp");
let token = null;

if (storedUser) {
  try {
    const user = JSON.parse(storedUser);
    token = user?.token || null;
  } catch (err) {
    console.error("Error parsing user data:", err);
  }
}

// Set default auth header ONLY if token exists
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// ------- SERVICE FUNCTIONS -------

// CREATE TODO
const createTodo = (data) => axios.post(`${baseUrl}/todo/create`, data);

// GET ALL TODO
const getAllTodo = (id) => axios.post(`${baseUrl}/todo/getAll/${id}`);

// UPDATE TODO
const updateTodo = (id, data) =>
  axios.patch(`${baseUrl}/todo/update/${id}`, data);

// DELETE TODO
const deleteTodo = (id) =>
  axios.delete(`${baseUrl}/todo/delete/${id}`);

export default { createTodo, getAllTodo, updateTodo, deleteTodo };
