import jwt from 'jsonwebtoken';
import TokenModel from '../models/Token.js';

// Verify JWT token middleware
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Check if token exists in database and is not expired
    const tokenExists = await TokenModel.isValidToken(token);
    if (!tokenExists) {
      return res.status(401).json({ error: 'Token expired or invalid' });
    }

    // Verify JWT signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default verifyToken;
