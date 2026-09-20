function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />

        <div className="todo-text">
          <h3>{todo.text}</h3>

          <span className={todo.completed ? "status completed-status" : "status pending-status"}>
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>
      </div>

      <div className="todo-actions">
        <button type="button" className="edit-button" onClick={() => editTodo(todo)}>
          Edit
        </button>

        <button type="button" className="delete-button" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;