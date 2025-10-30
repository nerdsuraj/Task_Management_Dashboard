// Simple API Test Script
// Run with: node api/test-api.js

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing Task Management API\n');
  
  try {
    // 1. Test Health Endpoint
    console.log('1️⃣  Testing Health Endpoint...');
    let response = await fetch(`${BASE_URL}/health`);
    let data = await response.json();
    console.log('✅ Health:', data);
    console.log('');

    // 2. Get All Tasks (initially empty)
    console.log('2️⃣  Getting all tasks...');
    response = await fetch(`${BASE_URL}/tasks`);
    data = await response.json();
    console.log('✅ All tasks:', data);
    console.log('');

    // 3. Create a New Task
    console.log('3️⃣  Creating a new task...');
    response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Complete project documentation',
        status: 'in-progress',
        priority: 'high'
      })
    });
    const newTask = await response.json();
    console.log('✅ Created task:', newTask);
    const taskId = newTask.data._id;
    console.log('');

    // 4. Create Another Task
    console.log('4️⃣  Creating another task...');
    response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Review code changes',
        status: 'pending',
        priority: 'medium'
      })
    });
    data = await response.json();
    console.log('✅ Created task:', data);
    console.log('');

    // 5. Get All Tasks Again
    console.log('5️⃣  Getting all tasks again...');
    response = await fetch(`${BASE_URL}/tasks`);
    data = await response.json();
    console.log('✅ All tasks:', data);
    console.log('');

    // 6. Update the First Task
    console.log('6️⃣  Updating task status...');
    response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'completed',
        priority: 'low'
      })
    });
    data = await response.json();
    console.log('✅ Updated task:', data);
    console.log('');

    // 7. Delete the Task
    console.log('7️⃣  Deleting task...');
    response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE'
    });
    data = await response.json();
    console.log('✅ Deleted task:', data);
    console.log('');

    // 8. Get All Tasks After Deletion
    console.log('8️⃣  Getting all tasks after deletion...');
    response = await fetch(`${BASE_URL}/tasks`);
    data = await response.json();
    console.log('✅ Remaining tasks:', data);
    console.log('');

    console.log('🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    console.error('\n⚠️  Make sure the API server is running (npm run server)');
  }
}

testAPI();

