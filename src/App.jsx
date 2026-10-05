import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import AddTask from "./components/AddTask";
import TaskGrid from "./components/TaskGrid";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tasks-v2")) || [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks-v2", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, priority) =>
    setTasks([{ id: Date.now(), text, priority, completed: false }, ...tasks]);
  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  const editTask = (id, text) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text } : t)));
  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const clearCompleted = () => setTasks(tasks.filter((t) => !t.completed));

  const done = tasks.filter((t) => t.completed).length;
  const counts = { All: tasks.length, Active: tasks.length - done, Completed: done };
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  const visible = tasks
    .filter((t) =>
      filter === "Active" ? !t.completed : filter === "Completed" ? t.completed : true
    )
    .filter((t) => t.text.toLowerCase().includes(query.toLowerCase()));

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="layout">
      <Sidebar filter={filter} setFilter={setFilter} counts={counts} />
      <main className="main">
        <div className="top">
          <div>
            <small>{today}</small>
            <h1>My Tasks</h1>
          </div>
          {done > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </div>

        <div className="progress">
          <div className="progress-meta">
            <span>{done} of {tasks.length} completed</span>
            <span>{percent}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <AddTask onAdd={addTask} />
        <input
          className="search"
          type="search"
          placeholder="Search tasks..."
          aria-label="Search tasks"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <TaskGrid
          tasks={visible}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  );
}
