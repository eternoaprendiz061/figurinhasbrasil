import { supabase } from '../../src/lib/supabase'

export async function handler(event: any) {
  try {
    const body = JSON.parse(event.body)

    // ID do pagamento vindo do Mercado Pago
    const paymentId = body.data?.id

    if (!paymentId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No payment id' }),
      }
    }

    // 🔥 pega sticker pendente
    const { data: sticker } = await supabase
      .from('stickers')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!sticker) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Sticker not found' }),
      }
    }

    // chama geração da figurinha
    const imageUrl = await generateSticker(sticker)

    // salva resultado
    await supabase
      .from('stickers')
      .update({
        status: 'done',
        image_url: imageUrl,
      })
      .eq('id', sticker.id)

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    }
  } catch (error) {
    console.error(error)

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook error' }),
    }
  }
}