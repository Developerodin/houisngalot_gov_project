'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  bypass?: boolean;
  onBypass?: () => void;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  bypass = false,
  onBypass,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium transition rounded-lg focus:outline-none focus:ring-2';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className="flex items-center gap-2">
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {children}
      </button>
      {bypass && onBypass && (
        <button
          onClick={onBypass}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
          type="button"
        >
          Skip
        </button>
      )}
    </div>
  );
}
