import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import Confetti from '../components/animations/Confetti';
import GlowWave from '../components/animations/GlowWave';
import ParticleSparkle from '../components/animations/ParticleSparkle';
import { balanceAPI, authAPI } from '../utils/api';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [toast, setToast] = useState(null);
  const [animationTrigger, setAnimationTrigger] = useState(null);

  console.log('📊 Dashboard loaded, user:', user?.username);

  if (!user) {
    console.log('🔒 No user in dashboard, redirecting to login');
    navigate('/login', { replace: true });
    return null;
  }

  const handleCheckBalance = async () => {
    setLoading(true);
    try {
      console.log('💰 Fetching balance for:', user.username);
      const response = await balanceAPI.checkBalance();
      console.log('✓ Balance received:', response.data.balance);
      
      setBalance(response.data.balance);
      setShowBalance(true);

      // Randomly select one animation
      const animations = ['confetti', 'glow', 'sparkle'];
      const selectedAnimation = animations[Math.floor(Math.random() * animations.length)];
      
      console.log('🎉 Triggering animation:', selectedAnimation);
      
      // Clear previous animations
      setAnimationTrigger(null);
      
      // Trigger selected animation
      setTimeout(() => {
        setAnimationTrigger(selectedAnimation);
      }, 50);

      setToast({ message: '✓ Balance loaded successfully!', type: 'success' });
    } catch (error) {
      console.error('✗ Balance fetch error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to fetch balance';
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      logout();
      navigate('/');
    } catch (error) {
      setToast({ message: 'Logout failed', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kodbank-light via-blue-50 to-gray-50">
      {toast && <Toast message={toast.message} type={toast.type} />}
      
      {animationTrigger === 'confetti' && <Confetti trigger={true} />}
      {animationTrigger === 'glow' && <GlowWave trigger={true} />}
      {animationTrigger === 'sparkle' && <ParticleSparkle trigger={true} />}

      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-kodbank-primary">KodBank</h1>
            <p className="text-gray-600 text-sm">Secure Banking Platform</p>
          </div>
          <Button variant="danger" onClick={handleLogout} className="w-auto px-8">
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Welcome Card */}
        <Card className="mb-8 animate-slide-up bg-gradient-to-r from-kodbank-primary to-kodbank-secondary text-white">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Welcome, {user.username}! 👋
            </h2>
            <p className="text-blue-100">
              We're glad to see you back. Check your account details below.
            </p>
          </div>
        </Card>

        {/* Account Info Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="animate-slide-up">
            <div className="text-center">
              <h3 className="text-gray-600 font-semibold mb-2">Account Holder</h3>
              <p className="text-2xl font-bold text-kodbank-primary">{user.username}</p>
            </div>
          </Card>

          <Card className="animate-slide-up">
            <div className="text-center">
              <h3 className="text-gray-600 font-semibold mb-2">Account Role</h3>
              <p className="text-2xl font-bold text-kodbank-primary">{user.role}</p>
            </div>
          </Card>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 animate-slide-up">
          <div className="text-center py-8">
            <h3 className="text-gray-600 font-semibold mb-6">Your Account Balance</h3>
            
            {!showBalance ? (
              <div>
                <p className="text-gray-500 mb-8">Click below to view your balance securely</p>
                <Button 
                  onClick={handleCheckBalance} 
                  loading={loading}
                  className="w-full md:w-64 mx-auto"
                >
                  Check Balance
                </Button>
              </div>
            ) : (
              <div className="animate-bounce">
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="animate-pulse-glow p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                    <p className="text-gray-600 mb-2">Your Balance is:</p>
                    <p className="text-5xl font-bold text-green-600 mb-2">
                      ₹ {balance?.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm text-gray-500">Indian Rupees</p>
                    
                    <Button 
                      variant="secondary"
                      onClick={() => {
                        setShowBalance(false);
                        setAnimationTrigger(null);
                      }}
                      className="mt-6"
                    >
                      Hide Balance
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Quick Info */}
        <Card className="animate-slide-up">
          <div className="bg-blue-50 border-l-4 border-kodbank-primary p-4 rounded">
            <h4 className="font-semibold text-kodbank-primary mb-2">💡 Tip</h4>
            <p className="text-gray-700 text-sm">
              Each time you check your balance, enjoy a premium celebration animation. 
              Confetti, glow waves, or particle sparkles will randomly appear!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
