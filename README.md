
# To-Do List Application

A simple to-do list app built with **Node.js** (Express) for the backend and **HTML/CSS/JavaScript** for the frontend.

## Features

- Create, view, update, and delete tasks.
- Tasks are stored in an in-memory **SQLite** database.

## Technologies Used

- **Backend**: Node.js, Express, SQLite
- **Frontend**: HTML, CSS, JavaScript

## Installation & Running

### Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/).

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   node src/app.js
   ```

4. Open the frontend in your browser by navigating to `public/index.html`.

The app will be available at `http://localhost:3000`.

## API Endpoints

- **POST /tasks**: Create a new task
- **GET /tasks**: Fetch all tasks
- **GET /tasks/:id**: Fetch task by ID
- **PUT /tasks/:id**: Update task status (pending, in-progress, completed)
- **DELETE /tasks/:id**: Delete task by ID
