const apiUrl = 'http://localhost:3000/tasks';

// DOM Elements
const taskList = document.getElementById('taskList');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');

// Show Loader
function showLoader() {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  document.body.appendChild(loader);
  loader.style.display = 'block';
  return loader;
}

// Hide Loader
function hideLoader(loader) {
  loader.style.display = 'none';
  document.body.removeChild(loader);
}

// Fetch tasks from API and display them
function fetchTasks() {
  const loader = showLoader();
  fetch(apiUrl)
    .then(response => response.json())
    .then(tasks => {
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const taskElement = document.createElement('li');
        
        // Display title, description, and status
        taskElement.innerHTML = `
          <div class="task-details">
            <h3>${task.title}</h3>
            <p class="description">${task.description}</p>
            <span class="status">${task.status}</span>
          </div>
          <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        taskList.appendChild(taskElement);
      });
      hideLoader(loader);
    })
    .catch(err => {
      hideLoader(loader);
      alert('Failed to fetch tasks');
    });
}

// Create a new task via API
function createTask() {
  const title = titleInput.value;
  const description = descriptionInput.value;

  if (!title || !description) {
    alert('Please fill in both the title and description.');
    return;
  }

  const task = { title, description };

  const loader = showLoader();
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then(response => response.json())
    .then(() => {
      fetchTasks();  // Refresh task list
      titleInput.value = '';
      descriptionInput.value = '';
      hideLoader(loader);
    })
    .catch(err => {
      hideLoader(loader);
      alert('Error creating task');
    });
}

// Delete a task via API
function deleteTask(id) {
  const loader = showLoader();
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      fetchTasks();  // Refresh task list
      hideLoader(loader);
    })
    .catch(err => {
      hideLoader(loader);
      alert('Error deleting task');
    });
}

// Initial fetch of tasks
fetchTasks();
