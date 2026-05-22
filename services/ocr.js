const suscriptionKey = process.env.AZURE_KEY
const endpoint = process.env.AZURE_ENDPOINT
const url = `${endpoint}/vision/v3.2/read/analyze`

async function leerTexto(imageURL) {  // ← recibe imageURL como parámetro
  // PARTE 1 - Enviar imagen a Azure
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Ocp-Apim-Subscription-Key": suscriptionKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: imageURL })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Error en: ${errorData.error.message}`)
  }

  // PARTE 2 - Esperar resultado
  const operationLocation = response.headers.get('operation-location')
  let result = null

  while (true) {
    const checkResponse = await fetch(operationLocation, {
      headers: { "Ocp-Apim-Subscription-Key": suscriptionKey }
    })

    result = await checkResponse.json()

    if (result.status === 'succeeded') break
    if (result.status === 'failed') throw new Error('Error analizando datos...')

    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // PARTE 3 - Extraer texto
  const lineas = []
  result.analyzeResult.readResults.forEach(page => {
    page.lines.forEach(line => {
      lineas.push(line.text)
    })
  })

  return { texto: lineas.join('\n') }  
}

module.exports = { leerTexto }  