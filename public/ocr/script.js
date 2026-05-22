const previewBox = document.getElementById('previewBox')
const preview = document.getElementById('preview')
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

async function leerTexto() {
  const imageURL = document.getElementById('imageURL').value.trim()

  mostrarResultado('Procesando imagen, esto puede tardar unos segundos...')

  try {
    const res = await fetch('/api/ocr/extraer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageURL })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Error desconocido')

    mostrarResultado(data.texto || 'No se detectó texto en la imagen.')
  } catch (error) {
    mostrarResultado(`Error: ${error.message}`)
  }
}

function mostrarResultado(texto) {
  resultadoBox.style.display = 'block'
  resultadoBox.textContent = texto
}