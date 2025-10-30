# 📋 Task Management Application

A modern, full-stack task management application built with React, Express.js, and MongoDB. Features a beautiful UI with dark mode support, real-time updates, and comprehensive task management capabilities.



## ✨ Features

### Core Functionality
- ✅ **Complete CRUD Operations** - Create, Read, Update, and Delete tasks
- 🎯 **Task Organization** - Group tasks by status (To Do, In Progress, Completed)
- 🔍 **Advanced Filtering** - Filter by status, priority, and sort by multiple criteria
- 📅 **Due Date Management** - Set and track task deadlines with visual indicators
- 🎨 **Priority Levels** - Categorize tasks as High, Medium, or Low priority
- 📝 **Rich Task Details** - Add descriptions and track creation dates

### User Experience
- 🌓 **Dark Mode Toggle** - Seamless switching between light and dark themes
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-time Updates** - Instant UI updates after any action
- 🎉 **Toast Notifications** - Beautiful feedback for all user actions
- 🔄 **Inline Status Updates** - Quick status changes without opening forms
- 📊 **Visual Indicators** - Color-coded priorities and status badges
- 🎭 **Empty States** - Thoughtful messages when no tasks exist

### Technical Features
- 🔥 **Hot Module Replacement** - Fast development with Vite
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations
- 🛡️ **Error Handling** - Comprehensive error handling and user feedback
- ✅ **Form Validation** - Real-time validation with clear error messages
- 💾 **MongoDB Integration** - Persistent data storage with MongoDB Atlas
- 🔄 **REST API** - Well-structured RESTful endpoints

## 🚀 Quick Start

### Prerequisites
- Node.js (v16.20.1 or higher recommended)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd task_management
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure MongoDB**
   - Open `api/server.js`
   - Update the `MONGODB_URI` with your connection string (line 15)
   - Ensure your IP is whitelisted in MongoDB Atlas

4. **Start the application**
```bash
npm run dev
```

This will start:
- Frontend on `http://localhost:3000`
- Backend API on `http://localhost:5000`

### Alternative Commands
```bash
# Run backend only
npm run server

# Run frontend only
npm run client

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
task_management/
├── api/
│   ├── server.js              # Express server with MongoDB
│   └── test-api.js            # API testing script
├── src/
│   ├── components/
│   │   ├── Header.jsx         # App header with title and theme toggle
│   │   ├── TaskList.jsx       # Main task list with filtering
│   │   ├── TaskCard.jsx       # Individual task card component
│   │   ├── TaskForm.jsx       # Modal form for create/edit
│   │   ├── TaskFilters.jsx    # Filter and sort controls
│   │   └── EmptyState.jsx     # Empty state component
│   ├── App.jsx                # Main app component
│   ├── App.css                # Global styles and theming
│   ├── index.css              # Base styles
│   └── main.jsx               # React entry point
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── README.md                  # This file
```

## 🎨 Design Decisions

### Architecture

**1. Single Package.json Approach**
- Combined frontend and backend dependencies in one `package.json`
- Simplifies development setup and deployment
- Uses `concurrently` to run both servers simultaneously
- Reduces configuration complexity

**2. Component-Based Architecture**
- Modular React components for better maintainability
- Separation of concerns (presentation vs. logic)
- Reusable components (TaskCard, TaskForm, EmptyState)
- CSS modules per component for scoped styling

**3. State Management**
- React hooks (useState, useEffect, useMemo) for state management
- Local state management (no external library needed)
- Efficient filtering and sorting with useMemo
- Optimistic UI updates for better UX

### UI/UX Design

**1. Visual Hierarchy**
- Clear status grouping (To Do, In Progress, Completed)
- Color-coded priority indicators (Red=High, Yellow=Medium, Green=Low)
- Status badges with emojis for quick recognition
- Card-based layout for better scanability

**2. Dark Mode Implementation**
- CSS custom properties for theming
- Persistent theme preference in localStorage
- Smooth transitions between modes
- Carefully chosen colors for readability in both modes

**3. Responsive Design**
- Mobile-first approach
- Flexible grid layouts with CSS Grid
- Adaptive components (forms, cards, filters)
- Touch-friendly UI elements

**4. User Feedback**
- Toast notifications for all actions (success/error)
- Loading states for async operations
- Confirmation dialogs for destructive actions
- Real-time error messages in forms

### Data Management

**1. MongoDB Schema Design**
```javascript
{
  title: String (required),
  description: String,
  status: Enum ['todo', 'in-progress', 'completed'],
  priority: Enum ['low', 'medium', 'high'],
  dueDate: Date,
  createdAt: Date
}
```

**2. API Design**
- RESTful endpoints following best practices
- Proper HTTP status codes
- Consistent response format
- Input validation on both client and server

**3. Error Handling**
- Try-catch blocks for all async operations
- User-friendly error messages
- Fallback UI for error states
- Network error handling

### Performance Optimizations

**1. Frontend**
- useMemo for expensive computations (filtering/sorting)
- Component-level CSS to reduce bundle size
- Lazy loading ready (can be added for forms)
- Optimized re-renders

**2. Backend**
- MongoDB indexing on frequently queried fields
- Efficient queries with projection
- Connection pooling with Mongoose
- Error handling middleware

### Form Validation

**1. Client-Side Validation**
- Real-time validation feedback
- Character count indicators
- Required field highlighting
- Clear error messages

**2. Server-Side Validation**
- Input sanitization
- Type checking with Mongoose schemas
- Enum validation for status and priority
- Error response standardization

## 🎯 Core Features Breakdown

### 1. Task List View
- **Organized Layout**: Tasks grouped by status for better organization
- **Visual Indicators**: Color-coded priorities and status badges
- **Sort Options**: By creation date, due date, priority, or title
- **Filter Options**: Filter by status and/or priority
- **Smart Grouping**: Automatic grouping when viewing all statuses

### 2. Task Creation
- **Modal Form**: Clean, focused creation experience
- **All Fields Supported**: Title, description, status, priority, due date
- **Validation**: Real-time validation with character limits
- **Error Messages**: Clear, helpful error messages
- **Character Counters**: Visual feedback on input length

### 3. Task Management
- **Inline Editing**: Click edit button to modify tasks
- **Modal-Based Editing**: Same form used for create/edit
- **Quick Status Updates**: Dropdown on each card for quick changes
- **Delete Confirmation**: Prevents accidental deletions
- **Optimistic Updates**: UI updates immediately

### 4. Empty States
- **No Tasks State**: Friendly message when no tasks exist
- **No Results State**: Helpful message when filters return nothing
- **Visual Design**: Emoji-based icons with clear copy
- **Call to Action**: Implicit guidance on what to do next

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Tasks
```http
GET /api/tasks
Response: { success: true, count: number, data: Task[] }
```

#### Create Task
```http
POST /api/tasks
Body: { title, description?, status?, priority?, dueDate? }
Response: { success: true, message: string, data: Task }
```

#### Update Task
```http
PATCH /api/tasks/:id
Body: { title?, description?, status?, priority?, dueDate? }
Response: { success: true, message: string, data: Task }
```

#### Delete Task
```http
DELETE /api/tasks/:id
Response: { success: true, message: string, data: Task }
```

#### Health Check
```http
GET /api/health
Response: { success: true, message: string, timestamp: string }
```

## 🧪 Testing

### Test the API
```bash
node api/test-api.js
```

### Manual Testing Checklist
- [ ] Create a new task
- [ ] Edit task details
- [ ] Update task status
- [ ] Delete a task
- [ ] Filter by status
- [ ] Filter by priority
- [ ] Sort by different criteria
- [ ] Toggle dark mode
- [ ] Test on mobile device
- [ ] Test form validation

## 🎨 Color Palette

### Light Mode
- Background: `#ffffff`, `#f9fafb`, `#f3f4f6`
- Text: `#111827`, `#6b7280`
- Primary: `#3b82f6`

### Dark Mode
- Background: `#0f172a`, `#1e293b`, `#334155`
- Text: `#f1f5f9`, `#94a3b8`
- Primary: `#60a5fa`

### Status Colors
- Success: `#22c55e`
- Error: `#ef4444`
- Warning: `#f59e0b`
- Info: `#3b82f6`

## 🔧 Configuration

### Vite Proxy
API requests from frontend are proxied to backend:
```javascript
// vite.config.js
server: {
  port: 3000,
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

### MongoDB Connection
Update the connection string in `api/server.js`:
```javascript
const MONGODB_URI = 'your-mongodb-connection-string'
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚧 Future Enhancements

- [ ] Drag and drop for status changes
- [ ] Task categories/tags
- [ ] Search functionality
- [ ] Bulk operations
- [ ] Task attachments
- [ ] User authentication
- [ ] Team collaboration
- [ ] Task comments
- [ ] Activity history
- [ ] Export tasks (CSV, PDF)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🐛 Troubleshooting

### MongoDB Connection Issues
1. Check if IP is whitelisted in MongoDB Atlas
2. Verify username and password
3. Check network connectivity
4. Ensure MongoDB URI is correctly formatted

### Port Already in Use
- Change backend port in `api/server.js` (line 7)
- Change frontend port in `vite.config.js` (line 8)

### Module Not Found
- Run `npm install` to install all dependencies
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

## 💡 Tips

- Use keyboard shortcuts in forms (Tab to navigate, Enter to submit)
- Click outside modal to close (or use X button)
- Status can be quickly updated from the task card
- Due dates show smart labels (overdue, today, tomorrow, etc.)
- Tasks are auto-sorted based on your selected criteria

---

**Built with ❤️ using React, Express.js, and MongoDB**

For more information or support, please open an issue in the repository.
