import TodoItem from "./TodoItem";

function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;