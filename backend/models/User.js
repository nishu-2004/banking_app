import pool from '../config/database.js';

export class UserModel {
  // Create a new user
  static async create(userData) {
    const { username, email, password, phone, role = 'Customer' } = userData;
    const [result] = await pool.execute(
      'INSERT INTO KodUser (username, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [username, email, password, phone, role]
    );
    return result;
  }

  // Find user by username
  static async findByUsername(username) {
    const [rows] = await pool.execute(
      'SELECT * FROM KodUser WHERE username = ?',
      [username]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  // Find user by email
  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM KodUser WHERE email = ?',
      [email]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  // Find user by ID
  static async findById(uid) {
    const [rows] = await pool.execute(
      'SELECT uid, username, email, phone, balance, role FROM KodUser WHERE uid = ?',
      [uid]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  // Get user balance
  static async getBalance(uid) {
    const [rows] = await pool.execute(
      'SELECT balance FROM KodUser WHERE uid = ?',
      [uid]
    );
    return rows.length > 0 ? rows[0].balance : null;
  }

  // Check if username exists
  static async usernameExists(username) {
    const [rows] = await pool.execute(
      'SELECT uid FROM KodUser WHERE username = ?',
      [username]
    );
    return rows.length > 0;
  }

  // Check if email exists
  static async emailExists(email) {
    const [rows] = await pool.execute(
      'SELECT uid FROM KodUser WHERE email = ?',
      [email]
    );
    return rows.length > 0;
  }
}

export default UserModel;
