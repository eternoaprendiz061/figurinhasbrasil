import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Copy, Check, CreditCard } from 'lucide-react'
import { Button } from '../components/Button'
import { supabase } from '../lib/supabase'

interface StickerData {
  fullName: string
  country: string
  photoPreview: string
}

export function PaymentPage() {
  const { stickerId } = useParams<{ stickerId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const stickerData = location.state as StickerData | null

  const [loading, setLoading] = useState(true)
  const [payment, setPayment] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!stickerId) {
      navigate('/')
      return
    }

    createPayment()
  }, [])

  // 🔥 CHECAGEM DE STATUS (NOVO)
  useEffect(() => {
    if (!payment) return

    const interval = setInterval(async () => {
      try {
        const { data } = await supabase
          .from('payments')
          .select('status')
          .eq('id', payment.id)
          .maybeSingle()

        if (data?.status === 'approved') {
          navigate('/sucesso')
        }
      } catch (err) {
        console.error('Erro status payment:', err)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [payment])

  const createPayment = async () => {
    try {
      const response = await fetch('/.netlify/functions/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: stickerData?.fullName || 'Cliente',
        }),
      })

      const data = await response.json()

      console.log('PAYMENT:', data)

      if (data.error) {
        throw new Error(data.error)
      }

      setPayment({
        id: data.paymentId || data.id,
        pixCode: data.pixCode || data.qr_code || '',
        qrCode: data.qrCode
          ? data.qrCode
          : data.qr_code_base64
          ? `data:image/png;base64,${data.qr_code_base64}`
          : null,
      })
    } catch (error) {
      console.error('Erro ao criar pagamento:', error)
      alert('Erro ao criar pagamento')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!payment?.pixCode) return

    try {
      await navigator.clipboard.writeText(payment.pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (error) {
      console.error('Erro ao copiar:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando pagamento...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 max-w-md mx-auto">

      <button onClick={() => navigate('/criar')} className="mb-4">
        ← Voltar
      </button>

      <div className="text-center mb-6">
        <CreditCard className="mx-auto mb-2" />
        <h1 className="text-2xl font-bold">Pagamento via Pix</h1>
        <p className="text-green-600 font-bold">R$ 4,99</p>
      </div>

      {stickerData && (
        <div className="bg-white p-3 rounded mb-4 flex gap-2 items-center">
          <img src={stickerData.photoPreview} className="w-12 h-12 rounded" />
          <div>
            <p>{stickerData.fullName}</p>
            <p className="text-sm text-gray-500">{stickerData.country}</p>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded mb-4 text-center">
        {!payment ? (
          <p>Gerando pagamento...</p>
        ) : payment.qrCode ? (
          <img src={payment.qrCode} className="w-48 mx-auto" />
        ) : (
          <p>QR Code não disponível</p>
        )}
      </div>

      <div className="bg-white p-3 rounded mb-4">
        <p className="text-sm mb-2">Código Pix:</p>

        <div className="flex gap-2">
          <input
            value={payment?.pixCode || ''}
            readOnly
            className="flex-1 text-xs border p-2"
          />

          <Button onClick={handleCopy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </div>
      </div>

      <p className="text-center text-sm">
        Pague e receba sua figurinha ⚡
      </p>
    </div>
  )
}