import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="app-loader-wrap">
      <div className="app-loader" />
      <p>Loading tasks...</p>
    </div>
  );
};

export default Spinner;
