import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

const getAuthConfig = () => {
  try {
    const storedUser = localStorage.getItem("todoapp");
    const token = storedUser ? JSON.parse(storedUser)?.token : null;

    return token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
  } catch (error) {
    console.error("Error parsing user data:", error);
    return {};
  }
};

const createTodo = (data) => axios.post(`${baseUrl}/todo/create`, data, getAuthConfig());

const getAllTodo = (id) => axios.post(`${baseUrl}/todo/getAll/${id}`, {}, getAuthConfig());

const updateTodo = (id, data) => axios.patch(`${baseUrl}/todo/update/${id}`, data, getAuthConfig());

const deleteTodo = (id) => axios.delete(`${baseUrl}/todo/delete/${id}`, getAuthConfig());

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };

export default TodoServices;
