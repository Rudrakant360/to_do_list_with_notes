import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function TodoPage() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };

    setTodos((currentTodos) => [newTodo, ...currentTodos]);
  };

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));

    if (editingTodo && editingTodo.id === id) {
      setEditingTodo(null);
    }
  };

  const editTodo = (todo) => {
    setEditingTodo(todo);
  };

  const updateTodo = (id, text) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    );

    setEditingTodo(null);
  };

  const getFilteredTodos = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    if (filter === "pending") {
      return todos.filter((todo) => !todo.completed);
    }

    return todos;
  };

  const filteredTodos = getFilteredTodos();
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>My To-Do List</h1>
          <p>Keep track of your daily tasks.</p>
        </div>
      </div>

      <div className="todo-layout">
        <div className="form-card">
          <h2>{editingTodo ? "Edit Task" : "Add New Task"}</h2>

          <TodoForm
            addTodo={addTodo}
            editingTodo={editingTodo}
            updateTodo={updateTodo}
            cancelEdit={() => setEditingTodo(null)}
          />
        </div>

        <div className="todo-section">
          <div className="todo-summary">
            <div className="summary-box">
              <strong>{todos.length}</strong>
              <span>Total</span>
            </div>

            <div className="summary-box">
              <strong>{pendingCount}</strong>
              <span>Pending</span>
            </div>

            <div className="summary-box">
              <strong>{completedCount}</strong>
              <span>Completed</span>
            </div>
          </div>

          <div className="filter-buttons">
            <button
              className={filter === "all" ? "filter-button active" : "filter-button"}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={filter === "completed" ? "filter-button active" : "filter-button"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>

            <button
              className={filter === "pending" ? "filter-button active" : "filter-button"}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
          </div>

          <TodoList
            todos={filteredTodos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </div>
      </div>
    </section>
  );
}

export default TodoPage;