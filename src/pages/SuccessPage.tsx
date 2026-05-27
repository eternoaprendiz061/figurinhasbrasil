import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function SuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const stickerData = location.state

  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    generateSticker()
  }, [])

  const generateSticker = async () => {
    try {
      const res = await fetch('/.netlify/functions/generate-sticker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: stickerData?.fullName,
          country: stickerData?.country,
          photoUrl: stickerData?.photoPreview,
        }),
      })

      const data = await res.json()

      console.log('STICKER:', data)

      setImage(data.image)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-6">Gerando figurinha ⚡</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">

      {image && (
        <>
          <img src={image} className="w-80 rounded-xl mb-4" />

          <a
            href={image}
            download="figurinha.png"
            className="bg-green-500 text-white px-6 py-2 rounded-xl"
          >
            Baixar figurinha
          </a>
        </>
      )}

      <button
        onClick={() => navigate('/')}
        className="mt-6 text-gray-500"
      >
        Voltar
      </button>
    </div>
  )
}