import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingAnimation } from '../components/LoadingAnimation';

export function GeneratingPage() {
  const { stickerId } = useParams<{ stickerId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Gerando sua figurinha...');

  useEffect(() => {
    if (!stickerId) {
      navigate('/');
      return;
    }

    generateSticker();
  }, [stickerId]);

  const generateSticker = async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      setMessage('Gerando sua figurinha...');

      const response = await fetch(
        `${supabaseUrl}/functions/v1/generate-sticker`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({ stickerId }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessage('Finalizando...');
      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigate(`/resultado/${stickerId}?imageUrl=${encodeURIComponent(data.imageUrl)}`);
    } catch (error) {
      console.error('Error generating sticker:', error);
      setMessage('Erro ao gerar figurinha. Redirecionando...');

      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  return <LoadingAnimation message={message} />;
}
