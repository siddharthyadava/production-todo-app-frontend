import axios from "axios";

// BASE URL (Render ya Local)
const baseUrl = process.env.REACT_APP_BASEURL;

// 🔐 Safe function to get token (without crashing)
const getToken = () => {
  try {
    const raw = localStorage.getItem("todoapp");
    if (!raw) return null;

    const userData = JSON.parse(raw);

    // userData.token OR userData.user.token
    return userData?.token || userData?.user?.token || null;
  } catch (err) {
    console.error("Error reading user token:", err);
    return null;
  }
};

// 🔐 Token lagane ka safe method
axios.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// CREATE TODO
const createTodo = (data) => {
  return axios.post(`${baseUrl}/todo/create`, data);
};

// GET ALL TODO
const getAllTodo = (userId) => {
  return axios.post(`${baseUrl}/todo/getAll`, { userId });
};

// UPDATE TODO
const updateTodo = (id, data) => {
  return axios.patch(`${baseUrl}/todo/update/${id}`, data);
};

// DELETE TODO
const deleteTodo = (id) => {
  return axios.delete(`${baseUrl}/todo/delete/${id}`);
};

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };
export default TodoServices;
