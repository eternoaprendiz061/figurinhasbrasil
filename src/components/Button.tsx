import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden';

  const variants = {
    primary: 'bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500 hover:from-green-600 hover:via-yellow-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95',
    secondary: 'bg-white/90 hover:bg-white text-gray-800 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 border-2 border-gray-200',
    outline: 'bg-transparent hover:bg-white/20 text-gray-700 border-2 border-gray-300 hover:border-green-400 transform hover:scale-105 active:scale-95',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />

      <span className="relative flex items-center gap-2">
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {children}
      </span>
    </motion.button>
  );
}
