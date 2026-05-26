console.log('SUPABASE AQUI:', supabase);
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Ruler, Scale, MapPin, ArrowLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { PhotoUpload } from '../components/PhotoUpload';
import { COUNTRIES } from '../lib/constants';
import { supabase } from '../lib/supabase';

interface FormData {
  fullName: string;
  age: string;
  height: string;
  weight: string;
  country: string;
  photo: File | null;
}

interface FormErrors {
  fullName?: string;
  age?: string;
  height?: string;
  weight?: string;
  country?: string;
  photo?: string;
}

export function FormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: '',
    height: '',
    weight: '',
    country: '',
    photo: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome é obrigatório';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.age) {
      newErrors.age = 'Idade é obrigatória';
    } else {
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 1 || age > 120) {
        newErrors.age = 'Idade deve estar entre 1 e 120';
      }
    }

    if (!formData.height.trim()) {
      newErrors.height = 'Altura é obrigatória';
    }

    if (!formData.weight.trim()) {
      newErrors.weight = 'Peso é obrigatório';
    }

    if (!formData.country) {
      newErrors.country = 'País é obrigatório';
    }

    if (!formData.photo) {
      newErrors.photo = 'Foto é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhotoChange = (photo: File | null) => {
    setFormData({ ...formData, photo });
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(photo);
    } else {
      setPhotoPreview('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);

  try {
    const fakeId = Date.now().toString();

    navigate(`/pagamento/${fakeId}`, {
      state: {
        fullName: formData.fullName,
        age: formData.age,
        height: formData.height,
        weight: formData.weight,
        country: formData.country,
        photoPreview,
      },
    });

  } catch (error) {
    console.error('Erro real:', error);
    alert('Erro ao enviar formulário.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-hero-gradient relative overflow-hidden">
      {/* Floating shapes */}
      <div className="floating-shape floating-shape-1 w-96 h-96 bg-green-400 top-0 left-0" />
      <div className="floating-shape floating-shape-2 w-80 h-80 bg-yellow-400 top-1/3 right-0" />
      <div className="floating-shape floating-shape-3 w-64 h-64 bg-blue-400 bottom-1/4 left-1/4" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-white/80 hover:bg-white text-gray-700 px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Voltar</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl mb-4"
          >
            ⚽
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 mb-3">
            Criar Figurinha
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Preencha seus dados para gerar sua figurinha personalizada
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 border border-white"
        >
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Photo section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="max-w-md mx-auto md:max-w-sm">
  <PhotoUpload
    value={formData.photo}
    onChange={handlePhotoChange}
    preview={photoPreview}
    error={errors.photo}
  />
</div>
            </motion.div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gradient-to-r from-green-200 via-yellow-200 to-blue-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-2xl">⚽</span>
              </div>
            </div>

            {/* Form fields */}
            {/* Form fields */}
<div className="grid md:grid-cols-2 gap-3 md:gap-4">
  
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
  >
    <Input
      label="Nome completo"
      value={formData.fullName}
      onChange={(value) => setFormData({ ...formData, fullName: value })}
      placeholder="Ex: João Silva"
      icon={<User className="w-5 h-5" />}
      error={errors.fullName}
    />
  </motion.div>

  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.25 }}
  >
    <Input
      label="Idade"
      type="number"
      value={formData.age}
      onChange={(value) => setFormData({ ...formData, age: value })}
      placeholder="Ex: 25"
      suffix="anos"
      error={errors.age}
    />
  </motion.div>

  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
  >
    <Input
      label="Altura"
      value={formData.height}
      onChange={(value) => setFormData({ ...formData, height: value })}
      placeholder="Ex: 1,75"
      icon={<Ruler className="w-5 h-5" />}
      error={errors.height}
    />
  </motion.div>

  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.35 }}
  >
    <Input
      label="Peso"
      value={formData.weight}
      onChange={(value) => setFormData({ ...formData, weight: value })}
      placeholder="Ex: 70"
      icon={<Scale className="w-5 h-5" />}
      suffix="kg"
      error={errors.weight}
    />
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="md:col-span-2"
  >
    <Select
      label="País"
      value={formData.country}
      onChange={(value) => setFormData({ ...formData, country: value })}
      options={COUNTRIES}
      placeholder="Selecione seu país"
      error={errors.country}
    />
  </motion.div>

</div>

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="w-full shadow-glow-rainbow bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500 hover:from-green-600 hover:via-yellow-500 hover:to-blue-600"
              >
                <Sparkles className="w-6 h-6" />
                Gerar minha figurinha
              </Button>
            </motion.div>

            {/* Help text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-gray-500 text-sm"
            >
                Sua figurinha será gerada após a confirmação do pagamento de R$ 9,90
            </motion.p>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
