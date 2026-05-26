import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { MOCK_STICKERS } from '../lib/constants';
import type { MockSticker } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % MOCK_STICKERS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % MOCK_STICKERS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + MOCK_STICKERS.length) % MOCK_STICKERS.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.7,
      rotate: direction > 0 ? 15 : -15,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 400 : -400,
      opacity: 0,
      scale: 0.7,
      rotate: direction < 0 ? 15 : -15,
    }),
  };

  return (
    <div className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {/* Floating shapes */}
      <div className="floating-shape floating-shape-1 w-96 h-96 bg-green-400 top-0 left-0" />
      <div className="floating-shape floating-shape-2 w-80 h-80 bg-yellow-400 top-1/4 right-0" />
      <div className="floating-shape floating-shape-3 w-64 h-64 bg-blue-400 bottom-1/4 left-1/4" />
      <div className="floating-shape floating-shape-1 w-72 h-72 bg-orange-400 bottom-0 right-1/3" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 container mx-auto px-4 py-4 md:py-12 flex flex-col items-center justify-start min-h-screen">
        
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-16 pt-4 md:pt-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-3 bg-white/90 px-6 py-3 rounded-full mb-4 shadow-lg"
          >
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-gray-700 font-bold">Figurinhas Brasil</span>
            <Sparkles className="w-5 h-5 text-green-500" />
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
              Crie sua Figurinha
            </span>
          </h1>
          <div className="flex justify-center gap-9 mt-1">
  <span className="text-2xl md:text-3xl animate-bounce">🇧🇷</span>
  <span className="text-2xl md:text-3xl animate-bounce delay-100">⚽</span>
  <span className="text-2xl md:text-3xl animate-bounce delay-200">🏆</span>
</div>

          <p className="text-lg md:text-2xl text-gray-700">
            Transforme sua foto em card de futebol
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="w-full max-w-lg mb-8 -mt-4 md:mt-0 relative">
          <div className="relative h-[420px] flex items-start justify-center">

            {/* Left */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-20 p-2 bg-white rounded-full shadow"
            >
              <ChevronLeft />
            </button>

            {/* Card */}
            <div className="relative w-72 h-[380px] md:w-80 md:h-[450px]">
              {MOCK_STICKERS.map((sticker, index) => (
                index === currentIndex && (
                  <motion.div
                    key={sticker.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute w-full h-full"
                  >
                    <StickerCard sticker={sticker} />
                  </motion.div>
                )
              ))}
            </div>

            {/* Right */}
            <button
              onClick={nextSlide}
              className="absolute right-0 z-20 p-2 bg-white rounded-full shadow"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 -mt-5">
            {MOCK_STICKERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full ${
                  i === currentIndex ? 'w-8 bg-green-500' : 'w-2 bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="w-full max-w-md">
          <Button
            onClick={() => navigate('/criar')}
            className="w-full text-lg bg-gradient-to-r from-green-500 via-yellow-300 to-blue-500"
          >
            Criar figurinha
          </Button>
          <p className="text-xs text-gray-500 text-center mt-3 opacity-80">
  As figurinhas serão criadas após o pagamento de R$ 4,99
</p>
        </div>
      </div>
    </div>
  );
}


function StickerCard({ sticker }: { sticker: MockSticker }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl border-4 border-green-500">
      <img
        src={sticker.image}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}