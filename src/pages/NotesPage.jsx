import { useEffect, useState } from "react";
import NotesForm from "../components/NotesForm";
import NotesList from "../components/NotesList";

function NotesPage() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [searchText, setSearchText] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (title, content) => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString()
    };

    setNotes((currentNotes) => [newNote, ...currentNotes]);
  };

  const updateNote = (id, title, content) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id ? { ...note, title, content } : note
      )
    );

    setEditingNote(null);
  };

  const deleteNote = (id) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));

    if (editingNote && editingNote.id === id) {
      setEditingNote(null);
    }
  };

  const editNote = (note) => {
    setEditingNote(note);
  };

  const filteredNotes = notes.filter((note) => {
    const searchValue = searchText.toLowerCase();

    return (
      note.title.toLowerCase().includes(searchValue) ||
      note.content.toLowerCase().includes(searchValue)
    );
  });

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>My Notes</h1>
          <p>Write down important ideas and information.</p>
        </div>
      </div>

      <div className="notes-layout">
        <div className="form-card">
          <h2>{editingNote ? "Edit Note" : "Create Note"}</h2>

          <NotesForm
            addNote={addNote}
            editingNote={editingNote}
            updateNote={updateNote}
            cancelEdit={() => setEditingNote(null)}
          />
        </div>

        <div className="notes-section">
          <div className="notes-toolbar">
            <div>
              <h2>All Notes</h2>
              <p>{notes.length} notes saved</p>
            </div>

            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search notes..."
              className="search-input"
            />
          </div>

          <NotesList
            notes={filteredNotes}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        </div>
      </div>
    </section>
  );
}

export default NotesPage;