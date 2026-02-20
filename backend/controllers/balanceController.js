import UserModel from '../models/User.js';

// Get user balance
export const getBalance = async (req, res) => {
  try {
    const uid = req.user.uid;

    const user = await UserModel.findById(uid);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      username: user.username,
      balance: user.balance,
      currency: '₹'
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
};

export default { getBalance };
