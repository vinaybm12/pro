import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import NoteList from "./components/Notelist";
import Editor from "./components/Editor";
import { useNotes } from "./components/usenotes";
import "../src/index.css";

export default function App() {
  const {
    folders,
    notes,
    activeFolder,
    activeNote,
    setActiveFolder,
    setActiveNote,
    createNote,
    updateNote,
    deleteNote,
    createFolder,
    deleteFolder,
  } = useNotes();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredNotes = activeFolder === "all"
    ? notes
    : notes.filter((n) => n.folderId === activeFolder);

  return (
    <div className="app-shell">
      <Sidebar
        folders={folders}
        activeFolder={activeFolder}
        onSelectFolder={setActiveFolder}
        onCreateFolder={createFolder}
        onDeleteFolder={deleteFolder}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((p) => !p)}
      />
      <NoteList
        notes={filteredNotes}
        activeNote={activeNote}
        onSelectNote={setActiveNote}
        onCreateNote={() => createNote(activeFolder === "all" ? folders[0]?.id : activeFolder)}
        onDeleteNote={deleteNote}
        folderName={
          activeFolder === "all"
            ? "All Notes"
            : folders.find((f) => f.id === activeFolder)?.name ?? "Notes"
        }
      />
      <Editor
        note={notes.find((n) => n.id === activeNote)}
        folders={folders}
        onUpdate={updateNote}
      />
    </div>
  );
}
