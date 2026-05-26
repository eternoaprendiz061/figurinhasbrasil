import { motion } from 'framer-motion';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Download, Plus, Share2, Home, Trophy, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Confetti } from '../components/Confetti';
import { supabase } from '../lib/supabase';
import type { Sticker } from '../types';

export function ResultPage() {
  const { stickerId } = useParams<{ stickerId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sticker, setSticker] = useState<Sticker | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!stickerId) {
      navigate('/');
      return;
    }

    loadSticker();
  }, [stickerId]);

  const loadSticker = async () => {
    try {
      const imageUrlParam = searchParams.get('imageUrl');

      if (imageUrlParam) {
        setImageUrl(imageUrlParam);
      }

      const { data } = await supabase
        .from('stickers')
        .select('*')
        .eq('id', stickerId)
        .maybeSingle();

      if (data) {
        setSticker(data);
        if (data.generated_image_url && !imageUrlParam) {
          setImageUrl(data.generated_image_url);
        }
      }
    } catch (error) {
      console.error('Error loading sticker:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sticker-${sticker?.full_name || 'cup'}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      window.open(imageUrl, '_blank');
    }
  };

  const handleShare = async () => {
    if (!imageUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Minha Figurinha Sticker Cup',
          text: 'Veja minha figurinha de futebol personalizada!',
          url: imageUrl,
        });
      } else {
        await navigator.clipboard.writeText(imageUrl);
        alert('Link copiado para a área de transferência!');
      }
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-green-500 border-r-yellow-500 border-b-blue-500 border-l-orange-500 animate-spin mx-auto mb-6" />
          <p className="text-gray-700 font-bold text-xl">Carregando figurinha...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {showConfetti && <Confetti />}

      {/* Floating shapes */}
      <div className="floating-shape floating-shape-1 w-96 h-96 bg-green-400 top-0 right-0" />
      <div className="floating-shape floating-shape-2 w-80 h-80 bg-yellow-400 top-1/3 left-0" />
      <div className="floating-shape floating-shape-3 w-72 h-72 bg-blue-400 bottom-0 right-1/3" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
        {/* Success badge */}
        <motion.div
          initial={{ scale: 0, rotate: -360 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 blur-2xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-5 rounded-full shadow-2xl">
              <Trophy className="w-14 h-14 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 mb-3">
            Parabéns! 🎉
          </h1>
          <p className="text-gray-700 text-xl font-medium">
            Sua figurinha está pronta
          </p>
        </motion.div>

        {/* Sticker card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.5 }}
          className="w-full max-w-sm mb-10"
        >
          <div
            className="relative bg-white rounded-3xl overflow-hidden shadow-2xl"
            style={{
              boxShadow: '0 0 40px rgba(34, 197, 94, 0.5), 0 0 80px rgba(234, 179, 8, 0.3), 0 0 120px rgba(59, 130, 246, 0.2)',
            }}
          >
            {/* Gradient border */}
            <div className="absolute inset-0 p-1 rounded-3xl bg-gradient-to-br from-green-400 via-yellow-400 to-blue-500">
              <div className="w-full h-full rounded-3xl bg-white" />
            </div>

            {/* Content */}
            <div className="relative">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
                <motion.img
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  src={imageUrl}
                  alt="Sua figurinha"
                  className="w-full h-full object-cover"
                />

                {/* Sparkles overlay */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.25,
                      }}
                      className="absolute"
                      style={{
                        top: `${15 + i * 10}%`,
                        left: `${10 + (i % 3) * 35}%`,
                      }}
                    >
                      <span className="text-2xl">
                        {['✨', '⭐', '💫', '🌟'][i % 4]}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
              </div>

              {/* Player info overlay */}
              {sticker && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent p-6 pt-16"
                >
                  <h2 className="text-2xl font-black text-gray-800 mb-2">
                    {sticker.full_name}
                  </h2>
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                      {sticker.age} anos
                    </span>
                    <span>•</span>
                    <span className="font-medium">{sticker.height}</span>
                    <span>•</span>
                    <span className="font-medium">{sticker.weight}</span>
                  </div>
                  <div className="mt-2 text-blue-600 font-bold flex items-center gap-2">
                    <span>🏆</span>
                    {sticker.country}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full max-w-sm space-y-4"
        >
          <Button
            onClick={handleDownload}
            size="lg"
            className="w-full shadow-glow-rainbow bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500 hover:from-green-600 hover:via-yellow-500 hover:to-blue-600"
          >
            <Download className="w-6 h-6" />
            Baixar figurinha
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleShare}
              variant="secondary"
              size="md"
              className="w-full"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar
            </Button>

            <Button
              onClick={() => navigate('/criar')}
              variant="outline"
              size="md"
              className="w-full border-2 border-green-300 text-green-600 hover:bg-green-50"
            >
              <Plus className="w-5 h-5" />
              Nova figurinha
            </Button>
          </div>

          <Button
            onClick={() => navigate('/')}
            variant="secondary"
            size="md"
            className="w-full"
          >
            <Home className="w-5 h-5" />
            Página inicial
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-auto pt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-5 py-2 rounded-full shadow-sm">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <p className="text-gray-600 text-sm font-medium">
              Obrigado por usar o Sticker Cup!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
