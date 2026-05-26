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
          email: 'teste@test.com',
          first_name: body.fullName || 'Cliente',
        },
      },
    })

    const data = payment.point_of_interaction?.transaction_data

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: payment.id,
        qr_code: data?.qr_code || '',
        qr_code_base64: data?.qr_code_base64 || '',
      }),
    }
  } catch (error) {
    console.error('ERRO MP:', error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Erro ao criar pagamento',
      }),
    }
  }
}