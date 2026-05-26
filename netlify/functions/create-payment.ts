import { MercadoPagoConfig, Payment } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

export async function handler(event: any) {
  try {
    const body = JSON.parse(event.body)

    const payment = await new Payment(client).create({
      body: {
        transaction_amount: 4.99,
        description: 'Figurinha personalizada',
        payment_method_id: 'pix',
        payer: {
          email: 'zxwellzika@gmail.com',
          first_name: body.fullName || 'Cliente',
        },
      },
    })

    console.log('MP RESPONSE:', JSON.stringify(payment, null, 2))

    const pix = payment?.point_of_interaction?.transaction_data

    return {
      statusCode: 200,
      body: JSON.stringify({
        paymentId: payment.id,
        pixCode: pix?.qr_code ?? '',
        qrCode:
          pix?.qr_code_base64
            ? `data:image/png;base64,${pix.qr_code_base64}`
            : '',
      }),
    }
  } catch (error: any) {
    console.error('ERRO MP COMPLETO:', error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error?.message || 'Erro ao criar pagamento',
      }),
    }
  }
}