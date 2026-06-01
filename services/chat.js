const endPointURL = process.env.AZURE_ENDPOINT_CHAT
const token = process.env.AZURE_TOKEN

async function enviarPregunta(pregunta) {
  const configuracion = {
    model: 'Phi-4',
    messages: [
      { role: 'user', content: pregunta + ', dame una respuesta corta' }
    ]
  }

  const response = await fetch(endPointURL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(configuracion)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Error en: ${errorData.error?.message || response.statusText}`)
  }

  const data = await response.json()

  if (!data.choices || data.choices.length === 0) {
    throw new Error('No se encontró contenido para la respuesta')
  }

  return {
    respuesta: data.choices[0].message.content
  }
}

module.exports = { enviarPregunta }