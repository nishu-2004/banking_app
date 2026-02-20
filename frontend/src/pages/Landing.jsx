import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-kodbank-light via-blue-50 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo & Title */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-kodbank-primary to-kodbank-secondary rounded-full mx-auto flex items-center justify-center text-4xl font-bold text-white">
              🏦
            </div>
          </div>
          <h1 className="text-5xl font-bold text-kodbank-primary mb-4">KodBank</h1>
          <p className="text-xl text-gray-600 mb-2">Modern Banking, Made Simple</p>
          <p className="text-gray-500">Secure, Fast, and Reliable Financial Services</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-bold text-gray-800 mb-2">Secure</h3>
            <p className="text-gray-600 text-sm">Bank-level encryption and security</p>
          </Card>

          <Card className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-bold text-gray-800 mb-2">Fast</h3>
            <p className="text-gray-600 text-sm">Instant transactions and quick processing</p>
          </Card>

          <Card className="text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-bold text-gray-800 mb-2">Smooth</h3>
            <p className="text-gray-600 text-sm">Beautiful UI with premium experience</p>
          </Card>
        </div>

        {/* CTA Buttons */}
        <Card className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Get Started</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Button 
                variant="primary"
                onClick={() => navigate('/register')}
              >
                Create Account
              </Button>
            </div>
            <div className="flex-1">
              <Button 
                variant="secondary"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            Join thousands of customers who trust KodBank for their banking needs
          </p>
        </Card>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm">
          <p>🎊 Experience premium celebration animations when checking your balance!</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
