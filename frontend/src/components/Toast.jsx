import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`fixed top-6 right-6 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg animate-slide-up z-50`}>
      {message}
    </div>
  );
};

export default Toast;
