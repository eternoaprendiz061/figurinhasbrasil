import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { ChangeEvent } from 'react';

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; flag: string }>;
  placeholder?: string;
  error?: string;
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder = 'Selecione...',
  error,
}: SelectProps) {
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
        <select
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
          className={`w-full px-5 py-3.5 bg-white border-2 ${error ? 'border-red-400' : 'border-gray-200 focus:border-green-400'} rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all appearance-none cursor-pointer shadow-sm hover:shadow-md`}
        >
          <option value="" disabled className="text-gray-400">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-800">
              {option.flag} {option.value}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none" />
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
