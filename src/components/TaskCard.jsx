import { useState } from "react";

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  const save = () => {
    const value = draft.trim();
    if (value) onEdit(task.id, value);
    else setDraft(task.text);
    setEditing(false);
  };

  return (
    <article className={`card ${task.completed ? "done" : ""}`}>
      <div className="card-head">
        <span className={`badge ${task.priority}`}>{task.priority}</span>
        <button
          className="tick"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? "Mark as active" : "Mark as completed"}
        >
          ✓
        </button>
      </div>

      {editing ? (
        <input
          className="edit-input"
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") {
              setDraft(task.text);
              setEditing(false);
            }
          }}
        />
      ) : (
        <p className="card-text">{task.text}</p>
      )}

      <div className="card-actions">
        <button onClick={() => setEditing(true)}>Edit</button>
        <button className="del" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </article>
  );
}
