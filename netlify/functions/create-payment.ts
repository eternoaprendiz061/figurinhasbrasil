export async function handler(event: any) {
  try {
    const body = JSON.parse(event.body || '{}')

    const response = await fetch(
      'https://api.mercadopago.com/v1/payments',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction_amount: 4.99,
          description: 'Figurinha personalizada',
          payment_method_id: 'pix',
          payer: {
            email: 'teste@test.com',
            first_name: body.fullName || 'Cliente',
          },
        }),
      }
    )

    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: data.id,
        qr_code: data.point_of_interaction?.transaction_data?.qr_code,
        qr_code_base64:
          data.point_of_interaction?.transaction_data?.qr_code_base64,
      }),
    }
  } catch (error) {
    console.error('ERRO:', error)

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao criar pagamento' }),
    }
  }
}