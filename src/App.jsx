import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import Header from './components/Header'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    sortBy: 'createdAt'
  })

  // Toggle dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/tasks')
      const data = await response.json()
      
      if (data.success) {
        setTasks(data.data)
      } else {
        throw new Error(data.message || 'Failed to fetch tasks')
      }
    } catch (err) {
      setError(err.message)
      toast.error(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Create task
  const handleCreateTask = async (taskData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      })
      const data = await response.json()
      
      if (data.success) {
        setTasks([data.data, ...tasks])
        setShowForm(false)
        toast.success('Task created successfully!')
      } else {
        throw new Error(data.message || 'Failed to create task')
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`)
      throw err
    }
  }

  // Update task
  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      })
      const data = await response.json()
      
      if (data.success) {
        setTasks(tasks.map(task => task._id === id ? data.data : task))
        setEditingTask(null)
        setShowForm(false)
        toast.success('Task updated successfully!')
      } else {
        throw new Error(data.message || 'Failed to update task')
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`)
      throw err
    }
  }

  // Delete task
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      
      if (data.success) {
        setTasks(tasks.filter(task => task._id !== id))
        toast.success('Task deleted successfully!')
      } else {
        throw new Error(data.message || 'Failed to delete task')
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`)
    }
  }

  // Quick status update
  const handleQuickStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const data = await response.json()
      
      if (data.success) {
        setTasks(tasks.map(task => task._id === id ? data.data : task))
        toast.success('Status updated!')
      } else {
        throw new Error(data.message || 'Failed to update status')
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`)
    }
  }

  const handleEditClick = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Header 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onAddTask={() => setShowForm(true)}
      />
      
      <main className="main-content">
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          filters={filters}
          setFilters={setFilters}
          onEdit={handleEditClick}
          onDelete={handleDeleteTask}
          onStatusChange={handleQuickStatusUpdate}
        />
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onClose={handleFormClose}
        />
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
    </div>
  )
}

export default App
