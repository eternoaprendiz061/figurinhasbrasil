import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function handler(event: any) {
  try {
    const { fullName, country, age, photoUrl } = JSON.parse(event.body)

    const prompt = `
Transforme a imagem enviada em uma figurinha estilo álbum de futebol.

REGRAS:
- mantenha 100% a identidade da pessoa
- use a imagem como base principal
- substitua apenas o estilo para figurinha

ESTILO:
- figurinha colecionável de futebol
- moldura oficial de álbum
- brilho premium
- fundo vibrante estilo Copa do Mundo
- estilo cartoon realista

DADOS:
Nome: ${fullName}
Idade: ${age}
País: ${country}
`

    // 🔥 baixar imagem corretamente
    const imageRes = await fetch(photoUrl)
    const imageBuffer = await imageRes.arrayBuffer()

    const file = new File([imageBuffer], "photo.png", {
      type: "image/png",
    })

    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: file,
      prompt,
      size: "1024x1024",
    })

    const imageBase64 = response.data?.[0]?.b64_json

    if (!imageBase64) {
      throw new Error("OpenAI não retornou imagem")
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        image: `data:image/png;base64,${imageBase64}`,
      }),
    }
  } catch (error: any) {
    console.error("ERRO GENERATE STICKER:", error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Erro ao gerar figurinha",
      }),
    }
  }
}