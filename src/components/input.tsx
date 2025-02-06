import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`block sm:w-full md:w-[400px] rounded-md border border-[#ccc]  outline-none bg-transparent py-3 px-3 h-[40px] focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${className || ''}`}
        {...props}
      />
    </div>
  );
};
