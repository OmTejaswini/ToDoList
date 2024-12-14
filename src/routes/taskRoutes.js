const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

// POST /tasks - Create a task
router.post('/', TaskController.createTask);

// GET /tasks - Fetch all tasks
router.get('/', TaskController.getTasks);

// GET /tasks/:id - Fetch task by ID
router.get('/:id', TaskController.getTaskById);

// PUT /tasks/:id - Update task status
router.put('/:id', TaskController.updateTaskStatus);

// DELETE /tasks/:id - Delete task by ID
router.delete('/:id', TaskController.deleteTask);

module.exports = router;
