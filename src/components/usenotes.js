import { useState, useCallback } from "react";

const FOLDER_COLORS = ["#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#8B5CF6", "#EF4444"];

const defaultFolders = [
  { id: "f1", name: "Personal", color: "#F59E0B" },
  { id: "f2", name: "Work", color: "#3B82F6" },
];

const defaultNotes = [
  {
    id: "n1",
    folderId: "f1",
    title: "Welcome to NoteKeeper",
    body: "Start writing your thoughts here.\n\nThis is a clean, distraction-free note-taking app with folder support. Create folders on the left, pick a note to edit, and get going.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "n2",
    folderId: "f2",
    title: "Meeting notes — Q3 planning",
    body: "Agenda items:\n- Review roadmap\n- Assign owners\n- Set milestones",
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function useNotes() {
  const [folders, setFolders] = useState(defaultFolders);
  const [notes, setNotes] = useState(defaultNotes);
  const [activeFolder, setActiveFolder] = useState("all");
  const [activeNote, setActiveNote] = useState("n1");

  const createNote = useCallback((folderId) => {
    const id = uid();
    const note = {
      id,
      folderId: folderId ?? folders[0]?.id,
      title: "Untitled",
      body: "",
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
    setActiveNote(id);
  }, [folders]);

  const updateNote = useCallback((id, changes) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...changes, updatedAt: new Date().toISOString() } : n
      )
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => {
      const next = prev.filter((n) => n.id !== id);
      return next;
    });
    setActiveNote((prev) => {
      if (prev === id) return null;
      return prev;
    });
  }, []);

  const createFolder = useCallback((name) => {
    const color = FOLDER_COLORS[Math.floor(Math.random() * FOLDER_COLORS.length)];
    const folder = { id: uid(), name, color };
    setFolders((prev) => [...prev, folder]);
  }, []);

  const deleteFolder = useCallback((id) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
    setNotes((prev) => prev.filter((n) => n.folderId !== id));
    setActiveFolder("all");
  }, []);

  return {
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
  };
}
