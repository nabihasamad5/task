import TaskCard from "./TaskCard";

export default function TaskGrid({ tasks, onToggle, onEdit, onDelete }) {
  return (
    <section className="grid">
      {tasks.length === 0 ? (
        <p className="empty">No tasks to show here.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </section>
  );
}
