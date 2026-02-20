import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Toast from '../components/Toast';
import { authAPI } from '../utils/api';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('🔐 Attempting login for user:', formData.username);
      const response = await authAPI.login({
        username: formData.username,
        password: formData.password,
      });

      console.log('✓ Login API response:', response.data);
      
      // Update auth context with user data
      if (response.data.user) {
        login(response.data.user);
        console.log('✓ Auth context updated, user state set');
      }

      setToast({ message: '✓ Login successful! Redirecting to dashboard...', type: 'success' });
      
      // Navigate to dashboard immediately after setting auth state
      console.log('→ Navigating to dashboard...');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1000);
      
    } catch (error) {
      console.error('✗ Login error:', error);
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kodbank-light to-gray-50 flex items-center justify-center p-4">
      {toast && <Toast message={toast.message} type={toast.type} />}
      
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-kodbank-primary mb-2">KodBank</h1>
          <p className="text-gray-600">Modern Banking, Made Simple</p>
        </div>

        <Card>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 text-sm mt-2">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              required
            />

            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Button type="submit" loading={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <button
              onClick={() => navigate('/register')}
              className="text-kodbank-primary font-semibold hover:underline mt-2"
            >
              Register here
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
