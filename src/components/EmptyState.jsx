import './EmptyState.css'

function EmptyState({ type, message, description }) {
  const getIcon = () => {
    switch (type) {
      case 'no-tasks':
        return '📝'
      case 'no-results':
        return '🔍'
      default:
        return '📋'
    }
  }

  return (
    <div className="empty-state">
      <div className="empty-state-icon">{getIcon()}</div>
      <h3 className="empty-state-title">{message}</h3>
      <p className="empty-state-description">{description}</p>
    </div>
  )
}

export default EmptyState

