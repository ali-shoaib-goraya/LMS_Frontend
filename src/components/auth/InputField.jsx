import React from 'react';

function InputField({ label, name, type = 'text', value, onChange, error }) {
  return (
    <div className="mb-3">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`
            block w-full px-3 py-2 
            text-sm
            rounded-md border 
            transition-colors duration-200
            ${
              error
                ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
            }
          `}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default InputField;