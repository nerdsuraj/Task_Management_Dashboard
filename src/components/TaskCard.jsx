import { useState } from 'react'
import './TaskCard.css'

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return { text: `${Math.abs(diffDays)} days overdue`, isOverdue: true }
    if (diffDays === 0) return { text: 'Due today', isToday: true }
    if (diffDays === 1) return { text: 'Due tomorrow', isSoon: true }
    if (diffDays <= 7) return { text: `Due in ${diffDays} days`, isSoon: true }
    return { text: date.toLocaleDateString(), isNormal: true }
  }

  const dueDateInfo = task.dueDate ? formatDate(task.dueDate) : null

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      case 'low': return '🟢'
      default: return '⚪'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo': return '📋'
      case 'in-progress': return '🔄'
      case 'completed': return '✅'
      default: return '📋'
    }
  }

  const handleStatusChange = (e) => {
    e.stopPropagation()
    onStatusChange(task._id, e.target.value)
  }

  return (
    <div className={`task-card status-${task.status} priority-${task.priority}`}>
      <div className="task-card-header">
        <div className="task-badges">
          <span className={`priority-badge priority-${task.priority}`}>
            {getPriorityIcon(task.priority)} {task.priority}
          </span>
        </div>
        
        <div className="task-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => onDelete(task._id)}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        
        {task.description && (
          <p className={`task-description ${isExpanded ? 'expanded' : ''}`}>
            {task.description}
          </p>
        )}
        
        {task.description && task.description.length > 100 && (
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      <div className="task-footer">
        <div className="task-meta">
          {dueDateInfo && (
            <div className={`due-date ${dueDateInfo.isOverdue ? 'overdue' : ''} ${dueDateInfo.isToday ? 'today' : ''} ${dueDateInfo.isSoon ? 'soon' : ''}`}>
              📅 {dueDateInfo.text}
            </div>
          )}
        </div>

        <div className="status-selector">
          <select 
            value={task.status}
            onChange={handleStatusChange}
            className={`status-select status-${task.status}`}
          >
            <option value="todo">📋 To Do</option>
            <option value="in-progress">🔄 In Progress</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default TaskCard

