// lib/db.ts
import sqlite3 from 'sqlite3';

// Create or open the SQLite database
const db = new sqlite3.Database('./database.db');

// Initialize database: Create users table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      studentId TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);
});

export const getUserByStudentId = (studentId: string, callback: (err: Error | null, row: User | undefined) => void) => {
  db.get('SELECT * FROM users WHERE studentId = ?', [studentId], (err, row) => {
    callback(err, row);
  });
};

export const createUser = (studentId: string, email: string, hashedPassword: string, callback: (err: Error | null, userId?: number) => void) => {
  db.run(
    'INSERT INTO users (studentId, email, password) VALUES (?, ?, ?)',
    [studentId, email, hashedPassword],
    function (err) {
      callback(err, this?.lastID); // Use optional chaining to ensure `this` exists
    }
  );
};

export default db;
