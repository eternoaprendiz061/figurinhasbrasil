import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  shape: 'circle' | 'square' | 'star';
}

export function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#22c55e', '#eab308', '#3b82f6', '#f97316', '#ec4899', '#a855f7'];
    const shapes: Array<'circle' | 'square' | 'star'> = ['circle', 'square', 'star'];
    const newParticles: Particle[] = [];

    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 300,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.6,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
            scale: particle.scale,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 150,
            x: particle.x + (Math.random() - 0.5) * 300,
            rotate: particle.rotation + 1080,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 0.8,
            ease: [0.33, 1, 0.68, 1],
          }}
          className={`absolute ${particle.shape === 'circle' ? 'w-3 h-3 rounded-full' : particle.shape === 'square' ? 'w-3 h-3 rounded-sm' : 'w-4 h-4'}`}
          style={{
            backgroundColor: particle.color,
            boxShadow: `0 0 10px ${particle.color}50`,
          }}
        >
          {particle.shape === 'star' && (
            <span className="text-white text-xs">✦</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
