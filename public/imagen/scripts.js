   const previewBox  = document.getElementById('previewBox')
        const preview     = document.getElementById('preview')
        const resultadoBox = document.getElementById('resultado')
        
function previsualizarImagen() {
  const url = document.getElementById('imageURL').value.trim()
  const img = document.getElementById('preview')

    if (url) {
     img.src = url
     img.style.display = 'block'
   } else {
     img.style.display = 'none'
   }
}
  
  async function analizarImagen() {
  try {

    const imageURL = document.getElementById('imageURL').value.trim()

    mostrarResultado('Analizando...')

    const res = await fetch('/api/imagen/analizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageURL })
    })

    if (!res.ok) {
      const texto = await res.text()
      console.error(texto)

      mostrarResultado('Error del servidor')
      return
    }

    const data = await res.json()

    mostrarResultado(
      `Descripción: ${data.descripcion}\n\n` +
      `Confianza: ${data.confianza}\n\n` +
      `Etiquetas: ${data.etiquetas.join(', ')}`
    )

  } catch (error) {
    console.error(error)
    mostrarResultado('Ocurrió un error')
  }
}

  function mostrarResultado(texto) {
      resultadoBox.style.display = 'block'
      resultadoBox.textContent = texto
  }