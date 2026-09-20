import { useEffect, useState } from "react";

function NotesForm({ addNote, editingNote, updateNote, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(editingNote ? editingNote.title : "");
    setContent(editingNote ? editingNote.content : "");
  }, [editingNote]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    if (editingNote) {
      updateNote(editingNote.id, trimmedTitle, trimmedContent);
    } else {
      addNote(trimmedTitle, trimmedContent);
    }

    setTitle("");
    setContent("");
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    cancelEdit();
  };

  return (
    <form className="notes-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Note title"
      />

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your note..."
        rows="6"
      />

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {editingNote ? "Update Note" : "Add Note"}
        </button>

        {editingNote && (
          <button type="button" className="secondary-button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NotesForm;