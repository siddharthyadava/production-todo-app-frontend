import React, { useState } from "react";
import toast from "react-hot-toast";
import TodoServices from "../Services/TodoServices";
import "./TaskModal.css";

const EditTodo = ({ task, setShowModal, getUserTask }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [isCompleted, setIsCompleted] = useState(Boolean(task?.isCompleted));

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp") || "{}");
      const createdBy = userData?.user?.id;
      const data = { title, description, createdBy, isCompleted };

      if (!title || !description) {
        toast.error("Please provide title and description");
        return;
      }

      await TodoServices.updateTodo(task?._id, data);
      setShowModal(false);
      getUserTask();
      toast.success("Task updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Unable to update task");
    }
  };

  if (!task) return null;

  return (
    <div className="task-modal-overlay enter-fade" role="dialog" aria-modal="true">
      <div className="task-modal glass-panel enter-up">
        <div className="task-modal__header">
          <h3>Update task</h3>
          <button className="task-modal__close" type="button" onClick={handleClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <form className="task-modal__form" onSubmit={handleSubmit}>
          <label className="task-modal__field" htmlFor="edit-task-title">
            Title
            <input
              id="edit-task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>

          <label className="task-modal__field" htmlFor="edit-task-description">
            Description
            <textarea
              id="edit-task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </label>

          <label className="task-modal__field" htmlFor="edit-task-status">
            Status
            <select
              id="edit-task-status"
              value={String(isCompleted)}
              onChange={(event) => setIsCompleted(event.target.value === "true")}
            >
              <option value="false">In progress</option>
              <option value="true">Completed</option>
            </select>
          </label>

          <div className="task-modal__actions">
            <button className="task-modal__btn task-modal__btn--ghost" type="button" onClick={handleClose}>
              Cancel
            </button>
            <button className="task-modal__btn task-modal__btn--solid" type="submit">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;
