const TaskModel = require('../models/taskModel');

// Controller methods

const createTask = (req, res) => {
  const { title, description, status } = req.body;
  TaskModel.createTask({ title, description, status }, (err, taskId) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating task', error: err });
    }
    res.status(201).json({ id: taskId, title, description, status });
  });
};

const getTasks = (req, res) => {
  TaskModel.getTasks((err, tasks) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching tasks', error: err });
    }
    res.status(200).json(tasks);
  });
};

const getTaskById = (req, res) => {
  const taskId = req.params.id;
  TaskModel.getTaskById(taskId, (err, task) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching task', error: err });
    }
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  });
};

const updateTaskStatus = (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;
  if (!['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  TaskModel.updateTaskStatus(taskId, status, (err, changes) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating task', error: err });
    }
    if (changes === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated', status });
  });
};

const deleteTask = (req, res) => {
  const taskId = req.params.id;
  TaskModel.deleteTask(taskId, (err, changes) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting task', error: err });
    }
    if (changes === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).json();
  });
};

module.exports = { createTask, getTasks, getTaskById, updateTaskStatus, deleteTask };
