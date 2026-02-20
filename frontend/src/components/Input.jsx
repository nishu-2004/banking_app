import React from 'react';

const Input = ({ 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange, 
  error = '',
  name = '',
  required = false 
}) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-kodbank-primary transition ${
          error ? 'border-red-500' : 'border-gray-200'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Input;
