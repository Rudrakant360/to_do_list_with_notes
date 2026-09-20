function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          <h2>Student App</h2>
        </div>

        <div className="nav-links">
          <button
            className={activePage === "todos" ? "nav-button active" : "nav-button"}
            onClick={() => setActivePage("todos")}
          >
            To-Do
          </button>

          <button
            className={activePage === "notes" ? "nav-button active" : "nav-button"}
            onClick={() => setActivePage("notes")}
          >
            Notes
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;