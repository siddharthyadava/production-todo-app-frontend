import React from "react";
import toast from "react-hot-toast";
import TodoServices from "../Services/TodoServices";
import "./TaskModal.css";

const PopModal = ({
  getUserTask,
  title,
  setTitle,
  description,
  setDescription,
  showModal,
  setShowModal,
}) => {
  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp") || "{}");
      const createdBy = userData?.user?.id;
      const data = { title, description, createdBy };

      if (!title || !description) {
        toast.error("Please provide title and description");
        return;
      }

      await TodoServices.createTodo(data);
      setShowModal(false);
      getUserTask();
      setTitle("");
      setDescription("");
      toast.success("Task created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Unable to create task");
    }
  };

  if (!showModal) return null;

  return (
    <div className="task-modal-overlay enter-fade" role="dialog" aria-modal="true">
      <div className="task-modal glass-panel enter-up">
        <div className="task-modal__header">
          <h3>Create a new task</h3>
          <button className="task-modal__close" type="button" onClick={handleClose}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <form className="task-modal__form" onSubmit={handleSubmit}>
          <label className="task-modal__field" htmlFor="new-task-title">
            Title
            <input
              id="new-task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Example: Finish UI redesign"
              required
            />
          </label>

          <label className="task-modal__field" htmlFor="new-task-description">
            Description
            <textarea
              id="new-task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add some details for this task"
              required
            />
          </label>

          <div className="task-modal__actions">
            <button className="task-modal__btn task-modal__btn--ghost" type="button" onClick={handleClose}>
              Cancel
            </button>
            <button className="task-modal__btn task-modal__btn--solid" type="submit">
              Create task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopModal;
