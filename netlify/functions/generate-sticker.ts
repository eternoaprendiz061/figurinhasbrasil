import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function handler(event: any) {
  try {
    const { fullName, country, age, photoUrl } = JSON.parse(event.body)

    const prompt = `
Transforme a imagem enviada do usuário em uma figurinha estilo álbum de futebol.

REGRAS PRINCIPAIS:
- mantenha a identidade da pessoa da imagem enviada
- mantenha exatamente o estilo da figurinha de referência
- substitua apenas o personagem

ESTILO:
- figurinha colecionável de futebol
- moldura oficial de álbum
- brilho premium
- fundo vibrante Copa do Mundo
- estilo cartoon realista

DADOS:
Nome: ${fullName}
Idade: ${age}
País: ${country}
`

    const imageBuffer = await fetch(photoUrl).then(r => r.arrayBuffer())

    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: imageBuffer,
      prompt,
      size: "1024x1024",
    })

    const imageBase64 = response.data[0].b64_json

    return {
      statusCode: 200,
      body: JSON.stringify({
        image: `data:image/png;base64,${imageBase64}`,
      }),
    }
  } catch (error) {
    console.error(error)

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao gerar figurinha" }),
    }
  }
}