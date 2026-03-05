import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="page-shell" style={{ padding: "1.6rem 0" }}>
      <section className="glass-panel enter-up" style={{ borderRadius: "22px", padding: "1.4rem" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", marginBottom: "0.6rem" }}>About TaskPulse</h1>
        <p style={{ color: "var(--text-muted)" }}>
          TaskPulse is a modern MERN todo app focused on quick task management,
          smooth interactions, and responsive design.
        </p>
        <Link
          to="/"
          style={{
            marginTop: "1rem",
            display: "inline-flex",
            color: "var(--accent-tertiary)",
            fontWeight: 700,
          }}
        >
          Go to landing page
        </Link>
      </section>
    </main>
  );
};

export default About;
