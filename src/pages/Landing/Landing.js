import React from "react";
import { Link } from "react-router-dom";
// import Hero from "../../assets/images/hero.jpg";
import Todo from "../../assets/images/Todo.jpg";
import "./Landing.css";
const Landing = () => {
  return (
    <div className="hero p-5">
      <div className="intro-text">
        <h1>
          <span className="tagline1">Stay focused.</span> <br />
          <span className="tagline2">Stay Organized.</span>
        </h1>
        <p style={{"color": "#6B6B6B"}}>
          Turn thoughts into tasks instantly — just type and let the app organize everything for you.
        </p>
        <Link className="btn red" to="/register">
          Register Now!
        </Link>
        <Link className="btn blue" to="/login">
          Login
        </Link>
      </div>
      <div className="">
        <img src={Todo} alt="heroimage" width={"100%"} height={515} />
      </div>
    </div>
  );
};

export default Landing;
