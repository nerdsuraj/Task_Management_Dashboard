import './Header.css'

function Header({ darkMode, setDarkMode, onAddTask }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">📋 Task Manager</h1>
          <p className="app-subtitle">Organize your tasks efficiently</p>
        </div>
        
        <div className="header-right">
          <button 
            className="btn btn-primary"
            onClick={onAddTask}
          >
            <span className="btn-icon">+</span>
            Add Task
          </button>
          
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

