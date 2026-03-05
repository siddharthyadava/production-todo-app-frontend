import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("todoapp") || "{}");
    setUsername(userData?.user?.username || "");
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const logoutHandler = () => {
    localStorage.removeItem("todoapp");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="app-nav-shell">
      <nav className="app-nav page-shell">
        <div className="app-nav__brand-wrap">
          <button
            className="app-nav__toggle"
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
          </button>
          <NavLink className="app-nav__brand" to="/home">
            TaskPulse
          </NavLink>
          <p className="app-nav__welcome">
            <i className="fa-solid fa-circle-user" /> Hi {username || "there"}
          </p>
        </div>

        <div className={`app-nav__links ${menuOpen ? "is-open" : ""}`}>
          <NavLink
            className={({ isActive }) => `app-nav__link ${isActive ? "is-active" : ""}`}
            to="/home"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) => `app-nav__link ${isActive ? "is-active" : ""}`}
            to="/todoList"
          >
            Task List
          </NavLink>
          <button className="app-nav__logout" type="button" onClick={logoutHandler}>
            <i className="fa-solid fa-right-from-bracket" />
            Log out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
