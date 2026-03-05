import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import PopModal from "../../components/PopModal";
import TodoServices from "../../Services/TodoServices";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner";
import "./HomePage.css";

const readUserData = () => {
  try {
    return JSON.parse(localStorage.getItem("todoapp") || "{}");
  } catch (error) {
    return {};
  }
};

const HomePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);

  const userData = readUserData();
  const userId = userData?.user?.id;
  const username = userData?.user?.username || "there";

  const getUserTask = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const { data } = await TodoServices.getAllTodo(userId);
      setAllTask(data?.todos || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    getUserTask();
  }, [getUserTask, navigate, userId]);

  const visibleTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allTask;

    return allTask.filter(
      (task) =>
        task.title?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
    );
  }, [allTask, searchQuery]);

  const completedCount = useMemo(
    () => allTask.filter((task) => task.isCompleted).length,
    [allTask]
  );

  return (
    <>
      <Navbar />
      <main className="dashboard page-shell enter-fade">
        <section className="dashboard-hero glass-panel enter-up">
          <div>
            <p className="dashboard-hero__eyebrow">Dashboard</p>
            <h1>Welcome back, {username}</h1>
            <p className="dashboard-hero__text">
              Keep momentum high with quick search, one-tap actions, and a cleaner task
              board.
            </p>
          </div>

          <div className="dashboard-search-wrap">
            <div className="dashboard-search">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                type="search"
                placeholder="Search task title or description"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <button className="dashboard-create-btn" type="button" onClick={() => setShowModal(true)}>
              <i className="fa-solid fa-plus" />
              Create Task
            </button>
          </div>
        </section>

        <section className="dashboard-stats enter-up">
          <article className="dashboard-stat-card glass-panel">
            <p>Total tasks</p>
            <h3>{allTask.length}</h3>
          </article>
          <article className="dashboard-stat-card glass-panel">
            <p>Completed</p>
            <h3>{completedCount}</h3>
          </article>
          <article className="dashboard-stat-card glass-panel">
            <p>Pending</p>
            <h3>{allTask.length - completedCount}</h3>
          </article>
        </section>

        <section className="dashboard-tasks enter-up">
          {loading ? (
            <Spinner />
          ) : visibleTasks.length ? (
            <Card allTask={visibleTasks} getUserTask={getUserTask} />
          ) : (
            <div className="dashboard-empty glass-panel">
              <h3>No matching task found</h3>
              <p>Try another keyword or create a new task to get started.</p>
            </div>
          )}
        </section>

        <PopModal
          getUserTask={getUserTask}
          showModal={showModal}
          setShowModal={setShowModal}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
        />
      </main>
    </>
  );
};

export default HomePage;
