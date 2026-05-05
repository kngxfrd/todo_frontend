import {} from "./App.css";
function App() {
  return (
    <div>
      <header className="header">
        <h1>TO-DO</h1>
      </header>
      <div className="text-entry">
        <input
          className="input-box"
          type="text"
          placeholder="...type your task"
        />
        <button>Clear</button>
        <button>Add Task</button>
      </div>
      <div className="tasks"></div>
    </div>
  );
}

export default App;
