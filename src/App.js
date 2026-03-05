import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import About from "./pages/About/About";
import TodoList from "./pages/Todos/TodoList";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Home/HomePage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import "./App.css";

function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/todoList" element={<TodoList />} />

        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2600,
          style: {
            borderRadius: "10px",
            border: "1px solid #dbe4f3",
            background: "#ffffff",
            color: "#1e3a70",
            boxShadow: "0 12px 22px rgba(15, 23, 42, 0.12)",
          },
        }}
      />
    </div>
  );
}

export default App;
