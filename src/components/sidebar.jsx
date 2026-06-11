import { useState } from "react";

export default function Sidebar({
  folders,
  activeFolder,
  onSelectFolder,
  onCreateFolder,
  onDeleteFolder,
  open,
  onToggle,
}) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [hoveredFolder, setHoveredFolder] = useState(null);

  function handleAdd() {
    const name = newName.trim();
    if (name) {
      onCreateFolder(name);
      setNewName("");
      setAdding(false);
    }
  }

  return (
    <aside className={`sidebar ${open ? "sidebar--open" : "sidebar--collapsed"}`}>
      <div className="sidebar__header">
        <span className="sidebar__logo">📝 NoteKeeper</span>
        <button className="sidebar__toggle" onClick={onToggle} title="Toggle sidebar">
          {open ? "‹" : "›"}
        </button>
      </div>

      {open && (
        <>
          <nav className="sidebar__nav">
            <button
              className={`sidebar__item ${activeFolder === "all" ? "sidebar__item--active" : ""}`}
              onClick={() => onSelectFolder("all")}
            >
              <span className="sidebar__dot" style={{ background: "#94A3B8" }} />
              <span className="sidebar__label">All Notes</span>
            </button>

            <div className="sidebar__section-label">Folders</div>

            {folders.map((f) => (
              <div
                key={f.id}
                className={`sidebar__item-wrap ${hoveredFolder === f.id ? "sidebar__item-wrap--hovered" : ""}`}
                onMouseEnter={() => setHoveredFolder(f.id)}
                onMouseLeave={() => setHoveredFolder(null)}
              >
                <button
                  className={`sidebar__item ${activeFolder === f.id ? "sidebar__item--active" : ""}`}
                  onClick={() => onSelectFolder(f.id)}
                >
                  <span className="sidebar__dot" style={{ background: f.color }} />
                  <span className="sidebar__label">{f.name}</span>
                </button>
                {hoveredFolder === f.id && (
                  <button
                    className="sidebar__delete-folder"
                    onClick={(e) => { e.stopPropagation(); onDeleteFolder(f.id); }}
                    title="Delete folder"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="sidebar__footer">
            {adding ? (
              <div className="sidebar__add-form">
                <input
                  autoFocus
                  className="sidebar__add-input"
                  placeholder="Folder name…"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd();
                    if (e.key === "Escape") { setAdding(false); setNewName(""); }
                  }}
                />
                <button className="sidebar__add-confirm" onClick={handleAdd}>Add</button>
              </div>
            ) : (
              <button className="sidebar__new-folder" onClick={() => setAdding(true)}>
                + New Folder
              </button>
            )}
          </div>
        </>
      )}
    </aside>
  );
}
