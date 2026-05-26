import { motion } from 'framer-motion';
import type { ChangeEvent, ReactNode } from 'react';

interface InputProps {
  label: string;
  type?: 'text' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  icon?: ReactNode;
  suffix?: string;
}

export function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  icon,
  suffix,
}: InputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <label className="block text-sm font-bold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-5 py-3.5 bg-white border-2 ${error ? 'border-red-400' : 'border-gray-200 focus:border-green-400'} rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all shadow-sm hover:shadow-md ${icon ? 'pl-12' : ''} ${suffix ? 'pr-14' : ''}`}
        />
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1"
        >
          <span>⚠️</span>
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
