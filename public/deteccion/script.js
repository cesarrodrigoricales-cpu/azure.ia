const previewBox   = document.getElementById('previewBox')
const preview      = document.getElementById('preview')
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
  
async function detectarObjetos() {

  const imageURL = document.getElementById('imageURL').value.trim()

  mostrarResultado('Analizando...')

  try {

    const res = await fetch('/api/deteccion/detectar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imageURL })
    })

    const data = await res.json()

    let resultado = ''

    data.objects.forEach(obj => {

      resultado += `Objeto: ${obj.object}\n`
      resultado += `Confianza: ${(obj.confidence * 100).toFixed(2)}%\n`

      resultado += `Posición:\n`
      resultado += `X: ${obj.rectangle.x}\n`
      resultado += `Y: ${obj.rectangle.y}\n`
      resultado += `Ancho: ${obj.rectangle.w}\n`
      resultado += `Alto: ${obj.rectangle.h}\n\n`

    })

    mostrarResultado(resultado)

  } catch(error) {

    console.error(error)
    mostrarResultado(`Error: ${error.message}`)

  }
}

function mostrarResultado(texto) {
  resultadoBox.style.display = 'block'
  resultadoBox.textContent = texto
}