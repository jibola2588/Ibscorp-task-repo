import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}    

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  size = 'md',
  disabled,
  className = '',
  ...props
}) => {
  let variantClasses = '';
  let sizeClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-blue-600 hover:bg-blue-700 text-white';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-200 hover:bg-gray-300 text-gray-800';
      break;
    case 'danger':
      variantClasses = 'bg-red-600 hover:bg-red-700 text-white';
      break;
  }

  switch (size) {
    case 'sm':
      sizeClasses = 'px-2 py-1 text-sm';
      break;
    case 'md':
      sizeClasses = 'px-4 py-2';
      break;
    case 'lg':
      sizeClasses = 'px-6 py-3 text-lg';
      break;
  }

  return (
    <button
      className={`rounded-md font-medium ${variantClasses} ${sizeClasses} ${className}`.trim()}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          loading
        </div>
      ) : (
        children
      )}
    </button>
  );
};
