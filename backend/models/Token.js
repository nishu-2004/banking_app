import pool from '../config/database.js';

export class TokenModel {
  // Save token to database
  static async save(token, uid, expiry) {
    const [result] = await pool.execute(
      'INSERT INTO UserToken (token, uid, expiry) VALUES (?, ?, ?)',
      [token, uid, expiry]
    );
    return result;
  }

  // Find token by token string
  static async findByToken(token) {
    const [rows] = await pool.execute(
      'SELECT * FROM UserToken WHERE token = ?',
      [token]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  // Delete token
  static async delete(tid) {
    const [result] = await pool.execute(
      'DELETE FROM UserToken WHERE tid = ?',
      [tid]
    );
    return result;
  }

  // Delete all tokens for a user
  static async deleteByUserId(uid) {
    const [result] = await pool.execute(
      'DELETE FROM UserToken WHERE uid = ?',
      [uid]
    );
    return result;
  }

  // Check if token is valid and not expired
  static async isValidToken(token) {
    const [rows] = await pool.execute(
      'SELECT * FROM UserToken WHERE token = ? AND expiry > NOW()',
      [token]
    );
    return rows.length > 0;
  }
}

export default TokenModel;
