import React from 'react';

// Design System Component Library for MaykasKitchen

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'base' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'base',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost'
  };
  const sizeClasses = {
    sm: 'btn-sm',
    base: '',
    lg: 'btn-lg'
  };
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  className = '',
  onClick
}) => {
  const classes = [
    'card',
    interactive ? 'card-interactive' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`input ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-gray-500 text-sm mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'body-large' | 'body-base' | 'body-small';
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className = '',
  as: Component = 'p'
}) => {
  const variantClasses = {
    h1: 'heading-1',
    h2: 'heading-2',
    h3: 'heading-3',
    'body-large': 'body-large',
    'body-base': 'body-base',
    'body-small': 'body-small'
  };
  
  // Default HTML elements for semantic variants
  const defaultElements = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    'body-large': 'p',
    'body-base': 'p',
    'body-small': 'p'
  };
  
  const Element = Component === 'p' ? defaultElements[variant] : Component;
  
  return (
    <Element className={`${variantClasses[variant]} ${className}`}>
      {children}
    </Element>
  );
};

// Loading States
interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '1rem'
}) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded ${className}`}
      style={{ width, height }}
      role="status"
      aria-label="Loading..."
    />
  );
};

// Badge Component
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'base';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'base',
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-primary-100 text-primary-700 border-primary-200',
    secondary: 'bg-gray-100 text-gray-700 border-gray-200',
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200'
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    base: 'px-3 py-1 text-sm'
  };
  
  const classes = [
    'inline-flex items-center font-medium rounded-full border',
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');
  
  return <span className={classes}>{children}</span>;
};

// Rating Component
interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'base' | 'lg';
  readonly?: boolean;
  onChange?: (rating: number) => void;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'base',
  readonly = true,
  onChange
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    base: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`Rating: ${value} out of ${max} stars`}>
      {[...Array(max)].map((_, i) => (
        <button
          key={i}
          type="button"
          className={`${sizeClasses[size]} ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'}`}
          onClick={() => !readonly && onChange?.(i + 1)}
          disabled={readonly}
          aria-label={`${i + 1} star${i + 1 === 1 ? '' : 's'}`}
        >
          <svg
            viewBox="0 0 20 20"
            fill={i < value ? 'currentColor' : 'none'}
            stroke="currentColor"
            className={i < value ? 'text-yellow-400' : 'text-gray-300'}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.643 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z"
            />
          </svg>
        </button>
      ))}
    </div>
  );
};

// Export all components
export const DesignSystem = {
  Button,
  Card,
  Input,
  Typography,
  Skeleton,
  Badge,
  Rating
};

export default DesignSystem;