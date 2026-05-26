const resultadoBox = document.getElementById('resultado')

async function hacerPregunta() {

  const contexto = document.getElementById('texto').value.trim()
  const pregunta = document.getElementById('pregunta').value.trim()

  if (!pregunta || !contexto) {
    mostrarResultado('Completa todos los campos')
    return
  }
  mostrarResultado('Analizando pregunta...')
  try {
    const res = await fetch('/api/preguntas/preguntas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pregunta,
        contexto
      })
    })
    const data = await res.json()
    mostrarResultado(
      `Respuesta: ${data.respuesta}\n\n` +
      `Confianza: ${data.confianza}%`
    )
  } catch (error) {
    console.error(error)
    mostrarResultado(
      `Error: ${error.message}`
    )
  }
}

function mostrarResultado(texto) {
  resultadoBox.style.display = 'block'
  resultadoBox.textContent = texto
}