import { useState } from "react";
import Navbar from "./components/Navbar";
import TodoPage from "./pages/TodoPage";
import NotesPage from "./pages/NotesPage";

function App() {
  const [activePage, setActivePage] = useState("todos");

  return (
    <div className="app">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        {activePage === "todos" ? <TodoPage /> : <NotesPage />}
      </main>
    </div>
  );
}

export default App;