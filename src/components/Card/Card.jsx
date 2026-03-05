import React, { useState } from "react";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";
import "./Card.css";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Card = ({ allTask, getUserTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (!isConfirmed) return;

    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task deleted successfully");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  };

  return (
    <>
      <div className="task-grid">
        {allTask?.map((task, index) => (
          <article
            className="task-card glass-panel enter-up"
            key={task._id}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <header className="task-card__header">
              <h3>{task?.title}</h3>
              <span className={`task-status ${task?.isCompleted ? "is-completed" : "is-pending"}`}>
                {task?.isCompleted ? "Completed" : "In progress"}
              </span>
            </header>

            <p className="task-card__description">
              {task?.description || "No description provided."}
            </p>

            <footer className="task-card__footer">
              <span>
                <i className="fa-regular fa-calendar" /> {formatDate(task?.createdAt)}
              </span>
              <div className="task-card__actions">
                <button
                  className="task-card__btn task-card__btn--edit"
                  type="button"
                  title="Edit task"
                  onClick={() => handleEdit(task)}
                >
                  <i className="fa-solid fa-pen-to-square" />
                </button>
                <button
                  className="task-card__btn task-card__btn--delete"
                  type="button"
                  title="Delete task"
                  onClick={() => handleDelete(task?._id)}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </footer>
          </article>
        ))}
      </div>

      {showModal && currentTask && (
        <EditTodo
          task={currentTask}
          setShowModal={setShowModal}
          getUserTask={getUserTask}
        />
      )}
    </>
  );
};

export default Card;
