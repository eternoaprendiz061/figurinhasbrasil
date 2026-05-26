import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';
import { useRef, useState } from 'react';

interface PhotoUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  preview?: string;
  error?: string;
}

export function PhotoUpload({ value, onChange, preview, error }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (files: FileList | null) => {
    if (files && files[0]) {
      onChange(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleChange(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <label className="block text-sm font-bold text-gray-700 mb-2">
        Sua Foto 📸
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleChange(e.target.files)}
        className="hidden"
      />

      {value || preview ? (
        <div className="relative group">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full aspect-[3/4] rounded-2xl overflow-hidden border-4 border-green-400 bg-gradient-to-br from-green-50 to-blue-50 shadow-lg"
            style={{
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(234, 179, 8, 0.2)',
            }}
          >
            <img
              src={preview || (value ? URL.createObjectURL(value) : '')}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {/* Success overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent pointer-events-none" />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemove}
            className="absolute top-3 right-3 p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
      ) : (
        <motion.button
          type="button"
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full aspect-[3/4] rounded-2xl border-3 ${isDragging ? 'border-green-500 bg-green-50' : error ? 'border-red-400' : 'border-dashed border-gray-300 hover:border-green-400'} bg-gradient-to-br from-gray-50 to-green-50 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer shadow-sm hover:shadow-md`}
          style={{ borderWidth: '3px' }}
        >
          <motion.div
            animate={isDragging ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
            className="p-5 bg-gradient-to-br from-green-400 to-blue-400 rounded-full shadow-lg"
          >
            {isDragging ? (
              <ImageIcon className="w-10 h-10 text-white" />
            ) : (
              <Camera className="w-10 h-10 text-white" />
            )}
          </motion.div>
          <div className="text-center px-4">
            <p className="text-gray-700 font-bold text-lg">
              {isDragging ? 'Solte a imagem aqui!' : 'Clique ou arraste sua foto'}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              PNG, JPG até 10MB
            </p>
          </div>
        </motion.button>
      )}

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
