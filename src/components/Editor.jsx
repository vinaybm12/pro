import { useEffect, useState } from "react";

export default function Editor({ note, folders, onUpdate }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [folderId, setFolderId] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setFolderId(note.folderId);
    }
  }, [note?.id]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
    onUpdate(note.id, { title: e.target.value });
  }

  function handleBodyChange(e) {
    setBody(e.target.value);
    onUpdate(note.id, { body: e.target.value });
  }

  function handleFolderChange(e) {
    setFolderId(e.target.value);
    onUpdate(note.id, { folderId: e.target.value });
  }

  if (!note) {
    return (
      <main className="editor editor--empty">
        <div className="editor__placeholder">
          <span className="editor__placeholder-icon">📄</span>
          <p>Select a note or create a new one</p>
        </div>
      </main>
    );
  }

  const activeFolder = folders.find((f) => f.id === folderId);

  return (
    <main className="editor">
      <div className="editor__toolbar">
        <div className="editor__folder-tag" style={{ borderColor: activeFolder?.color }}>
          <span
            className="editor__folder-dot"
            style={{ background: activeFolder?.color }}
          />
          <select
            className="editor__folder-select"
            value={folderId}
            onChange={handleFolderChange}
          >
            {folders.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>
        <span className="editor__autosave">Auto-saved</span>
      </div>

      <div className="editor__canvas">
        <input
          className="editor__title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Note title…"
        />
        <textarea
          className="editor__body"
          value={body}
          onChange={handleBodyChange}
          placeholder="Start writing…"
        />
      </div>

      <div className="editor__footer">
        {new Date(note.updatedAt).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </main>
  );
}
