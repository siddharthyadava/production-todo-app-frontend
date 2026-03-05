import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import TodoServices from "../../Services/TodoServices";
import Spinner from "../../components/Spinner";
import Card from "../../components/Card/Card";
import "./TodoList.css";

const readUserData = () => {
  try {
    return JSON.parse(localStorage.getItem("todoapp") || "{}");
  } catch (error) {
    return {};
  }
};

const TodoList = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [allTask, setAllTask] = useState([]);
  const navigate = useNavigate();
  const userData = readUserData();
  const userId = userData?.user?.id;

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

  const filteredTasks = useMemo(() => {
    if (statusFilter === "completed") {
      return allTask.filter((task) => task.isCompleted === true);
    }
    if (statusFilter === "incomplete") {
      return allTask.filter((task) => task.isCompleted === false);
    }
    return allTask;
  }, [allTask, statusFilter]);

  return (
    <>
      <Navbar />
      <main className="todo-page page-shell enter-fade">
        <section className="todo-filter glass-panel enter-up">
          <div>
            <p className="todo-filter__eyebrow">Task Gallery</p>
            <h1>Browse your tasks by status</h1>
          </div>
          <div className="todo-filter__controls">
            <button
              type="button"
              className={`todo-filter__chip ${statusFilter === "all" ? "is-active" : ""}`}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`todo-filter__chip ${statusFilter === "incomplete" ? "is-active" : ""}`}
              onClick={() => setStatusFilter("incomplete")}
            >
              Incomplete
            </button>
            <button
              type="button"
              className={`todo-filter__chip ${statusFilter === "completed" ? "is-active" : ""}`}
              onClick={() => setStatusFilter("completed")}
            >
              Completed
            </button>
          </div>
        </section>

        <section className="todo-list-content enter-up">
          {loading ? (
            <Spinner />
          ) : filteredTasks.length ? (
            <Card allTask={filteredTasks} getUserTask={getUserTask} />
          ) : (
            <div className="todo-empty glass-panel">
              <h3>No tasks in this filter</h3>
              <p>Switch filters or create a new task from your dashboard.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default TodoList;
