import NoteCard from "./NoteCard";

function NotesList({ notes, editNote, deleteNote }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No notes found.</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          editNote={editNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
}

export default NotesList;