import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export function SuccessPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold mb-2">
          Pagamento aprovado!
        </h1>

        <p className="text-gray-600 mb-6">
          Sua figurinha está sendo gerada automaticamente ⚡
        </p>

        <button
          onClick={() => navigate('/')}
          className="bg-green-500 text-white px-6 py-2 rounded-xl"
        >
          Voltar ao início
        </button>
      </motion.div>
    </div>
  )
}