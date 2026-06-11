export default function NoteList({
  notes,
  activeNote,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
  folderName,
}) {
  function formatDate(iso) {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now - d;
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  }

  function excerpt(body) {
    const clean = body.replace(/\n/g, " ").trim();
    return clean.length > 80 ? clean.slice(0, 80) + "…" : clean || "No content";
  }

  return (
    <section className="notelist">
      <div className="notelist__header">
        <h2 className="notelist__title">{folderName}</h2>
        <button className="notelist__new" onClick={onCreateNote} title="New note">
          +
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="notelist__empty">
          <p>No notes here yet.</p>
          <button className="notelist__empty-cta" onClick={onCreateNote}>
            Create your first note
          </button>
        </div>
      ) : (
        <ul className="notelist__list">
          {notes.map((note) => (
            <li
              key={note.id}
              className={`notelist__item ${activeNote === note.id ? "notelist__item--active" : ""}`}
              onClick={() => onSelectNote(note.id)}
            >
              <div className="notelist__item-top">
                <span className="notelist__item-title">{note.title || "Untitled"}</span>
                <button
                  className="notelist__item-delete"
                  onClick={(e) => { e.stopPropagation(); onDeleteNote(note.id); }}
                  title="Delete note"
                >
                  ✕
                </button>
              </div>
              <div className="notelist__item-date">{formatDate(note.updatedAt)}</div>
              <div className="notelist__item-excerpt">{excerpt(note.body)}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
