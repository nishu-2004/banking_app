import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import TokenModel from '../models/Token.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY = '24h';

// Register a new user
export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, phone } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if username already exists
    const usernameExists = await UserModel.usernameExists(username);
    if (usernameExists) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Check if email already exists
    const emailExists = await UserModel.emailExists(email);
    if (emailExists) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (role is Customer by default)
    await UserModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      role: 'Customer'
    });

    res.status(201).json({ 
      message: 'Registration successful. Please login to continue.'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user by username
    const user = await UserModel.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        uid: user.uid,
        username: user.username,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    // Calculate expiry time
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24);

    // Save token to database
    await TokenModel.save(token, user.uid, expiryDate);

    // Set HTTP-only cookie with proper CORS config
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: 'lax', // Changed from 'strict' to 'lax' for localhost development
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/'
    });

    console.log('✓ Login successful for user:', user.username);
    console.log('✓ JWT cookie set with path: /', 'httpOnly: true', 'sameSite: lax');

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        uid: user.uid,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (token) {
      // Delete token from database
      const tokenData = await TokenModel.findByToken(token);
      if (tokenData) {
        await TokenModel.delete(tokenData.tid);
      }
    }

    // Clear cookie
    res.clearCookie('authToken');

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Check auth status (for verifying token on page load)
export const checkAuth = async (req, res) => {
  try {
    console.log('✓ Auth check - Token verified for user:', req.user.username);
    const user = await UserModel.findById(req.user.uid);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      authenticated: true,
      user: {
        uid: user.uid,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(401).json({ success: false, authenticated: false, error: 'Not authenticated' });
  }
};

export default { register, login, logout, getProfile, checkAuth };
