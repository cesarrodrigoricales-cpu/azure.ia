const suscriptionKey = process.env.AZURE_KEY
const endpoint = process.env.AZURE_ENDPOINT
const url = `${endpoint}/language/:analyze-text?api-version=2023-04-01`

async function extraerDatos(texto) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Ocp-Apim-Subscription-Key": suscriptionKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      kind: 'EntityRecognition',
      analysisInput: {
        documents: [{
          id: "1",
          language: "es",
          text: texto
        }]
      }
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Error en: ${errorData.error.message}`)
  }

  const data = await response.json()
  const entidades = data.results.documents[0].entities

  return {
    entidades: entidades.map(e => ({
      texto: e.text,
      categoria: e.category,
      confianza: (e.confidenceScore * 100).toFixed(0) + '%'
    }))
  }
}

module.exports = { extraerDatos }