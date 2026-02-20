import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  loading = false,
  className = ''
}) => {
  const variants = {
    primary: 'bg-kodbank-primary text-white hover:bg-kodbank-secondary',
    secondary: 'bg-gray-200 text-kodbank-primary hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`w-full px-4 py-3 rounded-lg font-semibold transition duration-300 ${variants[variant]} ${className} ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
