import React, { useState } from "react";
import EditTodo from "../EditTodo";
import toast from "react-hot-toast";
import TodoServices from "../../Services/TodoServices";
import "./Card.css";

const Card = ({ allTask, getUserTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // ✅ which task is being edited

  // handle edit
  const handleEdit = (task) => {
    setCurrentTask(task);   // ✅ store selected task
    setShowModal(true);
  };

  // handle delete
  const handleDelete = async (id) => {
    try {
      await TodoServices.deleteTodo(id);
      toast.success("Task Deleted Succesfully");
      getUserTask();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <div className="card-container">
        {allTask?.map((task) => (
          <div
            className="card border-primary mb-3 mt-3"
            style={{ maxWidth: "18rem" }}
            key={task._id} // ✅ better key than index
          >
            <div className="card-header">
              <div className="chead">
                <h6>{task?.title.substring(0, 10)}</h6>
                <h6
                  className={
                    task?.isCompleted === true ? "task-cmp " : "task-inc"
                  }
                >
                  {task?.isCompleted === true ? "Completed " : "incomplete"}
                </h6>
              </div>
            </div>
            <div className="card-body">
              <h6 className="card-title" style={{ fontWeight: "bold" }}>
                {task?.title}
              </h6>
              <p className="card-text card-desc">{task?.description}</p>
              <h6 className="card-date">
                Date : {task?.createdAt.substring(0, 10)}
              </h6>
            </div>
            <div className="card-footer bg-transparent border-primary">
              <button
                className="btn btn-warning"
                title="EDIT Task"
                onClick={() => handleEdit(task)} // ✅ pass this task
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                className="btn btn-danger ms-2"
                title="Delete Task"
                onClick={() => handleDelete(task?._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ single modal, outside the map */}
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
