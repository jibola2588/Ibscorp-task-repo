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
          <sup className="text-red-600 ml-1" aria-hidden="true">*</sup>
          <span className="sr-only">(Required)</span>
        </label>
      )}
      <input
        className={`block w-full rounded-md border border-[#ccc]  outline-none bg-transparent py-3 px-3 h-[40px] focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${className || ''}`}
        {...props}
      />
    </div>
  );
};
