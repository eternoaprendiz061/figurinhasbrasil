import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface LoadingAnimationProps {
  message?: string;
}

export function LoadingAnimation({ message = 'Gerando sua figurinha...' }: LoadingAnimationProps) {
  return (
    <div className="fixed inset-0 bg-hero-gradient flex flex-col items-center justify-center z-40 overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute w-96 h-96 bg-green-400/20 rounded-full blur-3xl top-0 left-0 animate-float" />
      <div className="absolute w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl top-1/4 right-0 animate-float-reverse" />
      <div className="absolute w-64 h-64 bg-blue-400/20 rounded-full blur-3xl bottom-1/4 left-1/4 animate-float" />

      <div className="relative">
        {/* Rainbow spinner */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-40 h-40 rounded-full border-8 border-transparent border-t-green-500 border-r-yellow-500 border-b-blue-500 border-l-orange-500 animate-spin" />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="bg-gradient-to-br from-green-500 via-yellow-400 to-blue-500 p-6 rounded-full shadow-2xl"
            >
              <Trophy className="w-16 h-16 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              x: Math.cos((i * Math.PI) / 6) * 120,
              y: Math.sin((i * Math.PI) / 6) * 120,
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeOut',
            }}
            className="absolute top-1/2 left-1/2"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <span className="text-3xl">
              {['✨', '⭐', '💫', '🌟'][i % 4]}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center px-4"
      >
        <motion.h2
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 mb-6"
        >
          {message}
        </motion.h2>

        {/* Loading dots */}
        <div className="flex items-center justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className={`w-4 h-4 rounded-full ${['bg-green-500', 'bg-yellow-500', 'bg-blue-500'][i]}`}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mt-6 font-medium"
        >
          Isso pode levar alguns segundos...
        </motion.p>
      </motion.div>
    </div>
  );
}
