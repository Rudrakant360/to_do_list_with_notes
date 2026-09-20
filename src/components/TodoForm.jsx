import { useEffect, useState } from "react";

function TodoForm({ addTodo, editingTodo, updateTodo, cancelEdit }) {
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    setTaskText(editingTodo ? editingTodo.text : "");
  }, [editingTodo]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedText = taskText.trim();

    if (!trimmedText) {
      return;
    }

    if (editingTodo) {
      updateTodo(editingTodo.id, trimmedText);
    } else {
      addTodo(trimmedText);
    }

    setTaskText("");
  };

  const handleCancel = () => {
    setTaskText("");
    cancelEdit();
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(event) => setTaskText(event.target.value)}
        placeholder="Enter a task..."
      />

      <button type="submit" className="primary-button">
        {editingTodo ? "Update" : "Add Task"}
      </button>

      {editingTodo && (
        <button type="button" className="secondary-button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TodoForm;