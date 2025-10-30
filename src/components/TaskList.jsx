/* eslint-disable no-unused-vars */
import { useState, useMemo } from 'react'
import TaskCard from './TaskCard'
import TaskFilters from './TaskFilters'
import EmptyState from './EmptyState'
import './TaskList.css'

function TaskList({ tasks, loading, error, filters, setFilters, onEdit, onDelete, onStatusChange }) {
  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = [...tasks]

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === filters.status)
    }

    // Filter by priority
    if (filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'dueDate':
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [tasks, filters])

  // Group tasks by status for better organization
  const tasksByStatus = useMemo(() => {
    const grouped = {
      todo: [],
      'in-progress': [],
      completed: []
    }
    
    filteredAndSortedTasks.forEach(task => {
      if (grouped[task.status]) {
        grouped[task.status].push(task)
      }
    })
    
    return grouped
  }, [filteredAndSortedTasks])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading tasks...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Error Loading Tasks</h3>
        <p>{error}</p>
      </div>
    )
  }

  const hasActiveFilters = filters.status !== 'all' || filters.priority !== 'all'
  const hasNoTasks = tasks.length === 0
  const hasNoFilteredTasks = filteredAndSortedTasks.length === 0 && !hasNoTasks

  return (
    <div className="task-list-container">
      <TaskFilters 
        filters={filters} 
        setFilters={setFilters}
        taskCount={filteredAndSortedTasks.length}
      />

      {hasNoTasks ? (
        <EmptyState 
          type="no-tasks"
          message="No tasks yet"
          description="Create your first task to get started!"
        />
      ) : hasNoFilteredTasks ? (
        <EmptyState 
          type="no-results"
          message="No tasks found"
          description="Try adjusting your filters to see more tasks."
        />
      ) : (
        <div className="task-sections">
          {filters.status === 'all' ? (
            // Show grouped by status
            <>
              {tasksByStatus.todo.length > 0 && (
                <div className="task-section">
                  <h2 className="section-title">
                    <span className="status-badge status-todo">To Do</span>
                    <span className="count">{tasksByStatus.todo.length}</span>
                  </h2>
                  <div className="task-grid">
                    {tasksByStatus.todo.map(task => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatusChange={onStatusChange}
                      />
                    ))}
                  </div>
                </div>
              )}

              {tasksByStatus['in-progress'].length > 0 && (
                <div className="task-section">
                  <h2 className="section-title">
                    <span className="status-badge status-in-progress">In Progress</span>
                    <span className="count">{tasksByStatus['in-progress'].length}</span>
                  </h2>
                  <div className="task-grid">
                    {tasksByStatus['in-progress'].map(task => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatusChange={onStatusChange}
                      />
                    ))}
                  </div>
                </div>
              )}

              {tasksByStatus.completed.length > 0 && (
                <div className="task-section">
                  <h2 className="section-title">
                    <span className="status-badge status-completed">Completed</span>
                    <span className="count">{tasksByStatus.completed.length}</span>
                  </h2>
                  <div className="task-grid">
                    {tasksByStatus.completed.map(task => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatusChange={onStatusChange}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            // Show flat list when filtered
            <div className="task-grid">
              {filteredAndSortedTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TaskList

