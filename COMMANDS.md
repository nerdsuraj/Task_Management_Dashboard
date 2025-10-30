# 📋 Complete Command Reference

## 🚀 Quick Start Commands

### Development Mode (Recommended)
```bash
# Install dependencies (first time only)
npm install

# Start both frontend and backend
npm run dev
```
**Access:** 
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 🏗️ Production Build Commands

### Check Node Version First
```bash
node --version
```
**Required:** Node.js 20.19+ or 22.12+ for building

### If Node Version is Correct (20.19+):
```bash
# Build frontend
npm run build

# Start production server
npm start

# Or do both at once
npm run build:start
```
**Access:** http://localhost:5000 (everything on one server)

---

## 📦 All Available Commands

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm install` | Install all dependencies | First time setup or after pulling changes |
| `npm run dev` | Start dev servers (frontend + backend) | Development with hot reload |
| `npm run build` | Build React app to dist/ | Before production deployment |
| `npm start` | Start production server | After building, or in production |
| `npm run build:start` | Build + Start in one command | Quick production test |
| `npm run server` | Start backend only (dev mode) | Backend-only development |
| `npm run client` | Start frontend only (dev mode) | Frontend-only development |
| `npm run lint` | Check code quality | Before committing code |

---

## 🔧 Upgrade Node.js (Required for Building)

Your current Node.js version: **16.10.0**
Required for build: **20.19+ or 22.12+**

### Option 1: Using NVM (Node Version Manager) - Recommended

```bash
# Install nvm (if not installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc

# Install latest Node.js LTS
nvm install --lts

# Use the new version
nvm use --lts

# Verify
node --version
```

### Option 2: Using Node.js Official Installer

```bash
# Download and install Node.js 20 LTS
# Visit: https://nodejs.org/

# For Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### Option 3: Using Package Manager

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
```

---

## 🎯 Complete Setup Workflow

### First Time Setup

```bash
# 1. Navigate to project
cd /home/suraj/data/task_management

# 2. Install dependencies
npm install

# 3. Start development
npm run dev
```

### After Upgrading Node.js

```bash
# 1. Navigate to project
cd /home/suraj/data/task_management

# 2. Clean install (optional but recommended)
rm -rf node_modules package-lock.json
npm install

# 3. Build the project
npm run build

# 4. Start production server
npm start
```

---

## 🔄 Development Workflow

### Daily Development
```bash
# Start development servers
npm run dev

# In browser: http://localhost:3000
# Make changes - hot reload works automatically
# Press Ctrl+C to stop when done
```

### Before Committing
```bash
# Check for linting errors
npm run lint

# If there are errors, fix them and check again
```

---

## 🚀 Production Deployment Workflow

### Local Production Test
```bash
# 1. Build the frontend
npm run build

# 2. Verify build output
ls -la dist/

# 3. Start production server
npm start

# 4. Test in browser
# Open: http://localhost:5000
```

### Production Deployment (After upgrading Node.js)
```bash
# 1. Pull latest code
git pull origin main

# 2. Install dependencies
npm install --production

# 3. Build frontend
npm run build

# 4. Start with PM2 (process manager)
npm install -g pm2
pm2 start api/server.js --name task-manager
pm2 save
pm2 startup

# 5. Check status
pm2 status
pm2 logs task-manager
```

---

## 🧪 Testing Commands

### Test API Endpoints
```bash
# Using the test script
node api/test-api.js

# Using curl
curl http://localhost:5000/api/health
curl http://localhost:5000/api/tasks

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","priority":"high"}'
```

---

## 🔍 Debugging Commands

### Check if ports are in use
```bash
# Check port 5000 (backend)
lsof -ti:5000

# Check port 3000 (frontend)
lsof -ti:3000

# Kill process on port
lsof -ti:5000 | xargs kill -9
```

### View running processes
```bash
# See all node processes
ps aux | grep node

# With PM2
pm2 list
pm2 logs
```

### Check MongoDB connection
```bash
# From your terminal
mongosh "mongodb+srv://soorajkrpandit:suraj%406200@naukriwala.demmeuk.mongodb.net/"
```

---

## 🧹 Cleanup Commands

### Clean node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clean build artifacts
```bash
rm -rf dist/
npm run build
```

### Clean everything and start fresh
```bash
# Remove dependencies and build
rm -rf node_modules package-lock.json dist/

# Reinstall
npm install

# Rebuild (after Node.js upgrade)
npm run build
```

---

## 🌐 Access URLs

### Development Mode
| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | React app with hot reload |
| Backend API | http://localhost:5000/api | API endpoints |
| Health Check | http://localhost:5000/api/health | API status |

### Production Mode
| Service | URL | Purpose |
|---------|-----|---------|
| Everything | http://localhost:5000 | Single server for all |
| API | http://localhost:5000/api/tasks | API endpoints |
| Health | http://localhost:5000/api/health | API status |

---

## 🎯 Quick Command Cheat Sheet

```bash
# DEVELOPMENT
npm install              # Install dependencies
npm run dev             # Start dev servers

# PRODUCTION
npm run build           # Build frontend
npm start               # Start server
npm run build:start     # Build + Start

# TESTING
node api/test-api.js    # Test API
curl localhost:5000/api/health  # Health check

# CLEANUP
rm -rf node_modules dist/  # Clean all
npm install                 # Reinstall

# PROCESS MANAGEMENT
pm2 start api/server.js    # Start with PM2
pm2 stop task-manager      # Stop
pm2 restart task-manager   # Restart
pm2 logs task-manager      # View logs
```

---

## ⚠️ Current Issue Resolution

**Problem:** Cannot build due to Node.js version

**Your Node.js:** 16.10.0
**Required:** 20.19+ or 22.12+

**Solution Steps:**

1. **Upgrade Node.js:**
   ```bash
   # Using NVM (recommended)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.bashrc
   nvm install 20
   nvm use 20
   node --version  # Should show v20.x.x
   ```

2. **Then build:**
   ```bash
   cd /home/suraj/data/task_management
   npm run build
   npm start
   ```

---

## 📊 Expected Outputs

### npm run dev
```
[0] 🚀 Server is running on http://localhost:5000
[0] 📚 API endpoints available at http://localhost:5000/api/tasks
[0] ✅ MongoDB Connected Successfully
[1] VITE v7.x.x ready in xxx ms
[1] ➜ Local: http://localhost:3000/
```

### npm run build
```
vite v7.x.x building for production...
✓ 150 modules transformed.
dist/index.html                   2.50 kB
dist/assets/index-abc123.js       150.20 kB │ gzip: 48.50 kB
dist/assets/index-def456.css      12.30 kB │ gzip: 3.20 kB
✓ built in 2.5s
```

### npm start
```
🚀 Server is running on http://localhost:5000
📚 API endpoints available at http://localhost:5000/api/tasks
✅ MongoDB Connected Successfully
🔗 Mongoose connected to MongoDB
```

---

## ✅ Summary

**For NOW (with Node 16.10.0):**
```bash
npm run dev
# Access: http://localhost:3000
```

**For PRODUCTION (after upgrading to Node 20+):**
```bash
npm run build:start
# Access: http://localhost:5000
```

---

**Need help?** Check the documentation:
- README.md - Full documentation
- SETUP_GUIDE.md - Quick setup
- PRODUCTION_GUIDE.md - Deployment guide
- SINGLE_SERVER_SETUP.md - Architecture details

