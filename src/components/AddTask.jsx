import { useState } from "react";

export default function AddTask({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) {
      setError("Task cannot be empty.");
      return;
    }
    onAdd(value, priority);
    setText("");
    setError("");
  };

  return (
    <form onSubmit={submit} noValidate>
      <div className={`add-task ${error ? "invalid" : ""}`}>
        <input
          type="text"
          placeholder="Add a new task..."
          aria-label="New task"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
        />
        <select
          value={priority}
          aria-label="Priority"
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button type="submit">Add</button>
      </div>
      <p className="error" role="alert">{error}</p>
    </form>
  );
}
