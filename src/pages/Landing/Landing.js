import React from "react";
import { Link } from "react-router-dom";
import TodoPreview from "../../assets/images/Todo.jpg";
import "./Landing.css";

const featureList = [
  {
    icon: "fa-layer-group",
    title: "Organize Fast",
    description: "Capture ideas instantly and keep every task in one clear flow.",
  },
  {
    icon: "fa-chart-line",
    title: "Track Progress",
    description: "See completed and pending tasks at a glance without extra clicks.",
  },
  {
    icon: "fa-mobile-screen-button",
    title: "Works On Mobile",
    description: "Built with responsive layouts for smooth use on smaller screens.",
  },
];

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="landing-glow landing-glow--a" />
      <div className="landing-glow landing-glow--b" />

      <header className="landing-topbar page-shell enter-fade">
        <Link className="landing-logo" to="/">
          TaskPulse
        </Link>
        <div className="landing-topbar__actions">
          <Link className="landing-link-btn" to="/login">
            Log in
          </Link>
          <Link className="landing-link-btn landing-link-btn--solid" to="/register">
            Start free
          </Link>
        </div>
      </header>

      <main className="landing-hero page-shell">
        <section className="landing-copy enter-up">
          <span className="pill landing-pill">
            <i className="fa-solid fa-sparkles" />
            Modern Task Workspace
          </span>
          <h1>Plan your day with a cleaner, faster, and smarter to-do experience.</h1>
          <p>
            Build momentum with focused task views, quick actions, and a UI that feels
            smooth on desktop and mobile.
          </p>
          <div className="landing-cta">
            <Link className="landing-link-btn landing-link-btn--solid" to="/register">
              Create account
            </Link>
            <Link className="landing-link-btn landing-link-btn--ghost" to="/login">
              I already have an account
            </Link>
          </div>
        </section>

        <section className="landing-preview glass-panel enter-up">
          <img src={TodoPreview} alt="Todo app preview" />
          <div className="preview-meta">
            <div>
              <p>Today</p>
              <h3>9 Active Tasks</h3>
            </div>
            <span className="preview-meta__tag">3 completed</span>
          </div>
        </section>
      </main>

      <section className="landing-features page-shell">
        {featureList.map((feature, index) => (
          <article
            key={feature.title}
            className="landing-feature-card glass-panel enter-up"
            style={{ animationDelay: `${index * 100 + 120}ms` }}
          >
            <span className="landing-feature-card__icon">
              <i className={`fa-solid ${feature.icon}`} />
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Landing;
