function NoteCard({ note, editNote, deleteNote }) {
  const formattedDate = new Date(note.createdAt).toLocaleString();

  return (
    <div className="note-card">
      <div className="note-card-content">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>

      <div className="note-card-footer">
        <span>{formattedDate}</span>

        <div className="note-actions">
          <button type="button" className="edit-button" onClick={() => editNote(note)}>
            Edit
          </button>

          <button type="button" className="delete-button" onClick={() => deleteNote(note.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;