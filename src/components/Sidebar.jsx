const ITEMS = ["All", "Active", "Completed"];

export default function Sidebar({ filter, setFilter, counts }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">✓</span> Taskly
      </div>
      <nav className="nav" aria-label="Filter tasks">
        {ITEMS.map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
            <span className="count">{counts[item]}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
