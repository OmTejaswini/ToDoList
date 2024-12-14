const sqlite3 = require('sqlite3').verbose();

// Set up SQLite database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending'
      )
    `);
  }
});

// CRUD operations

const createTask = (task, callback) => {
  const { title, description, status } = task;
  db.run(
    'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
    [title, description, status || 'pending'],
    function (err) {
      callback(err, this.lastID);
    }
  );
};

const getTasks = (callback) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    callback(err, rows);
  });
};

const getTaskById = (id, callback) => {
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
    callback(err, row);
  });
};

const updateTaskStatus = (id, status, callback) => {
  db.run(
    'UPDATE tasks SET status = ? WHERE id = ?',
    [status, id],
    function (err) {
      callback(err, this.changes);
    }
  );
};

const deleteTask = (id, callback) => {
  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    callback(err, this.changes);
  });
};

module.exports = { createTask, getTasks, getTaskById, updateTaskStatus, deleteTask };
