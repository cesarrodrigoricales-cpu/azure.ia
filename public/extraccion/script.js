async function extraerDatos() {
  const texto = document.getElementById('texto').value.trim()
  const resultado = document.getElementById('resultado')

  if (!texto) return mostrarError('Escribe un texto primero.')

  const checkboxes = document.querySelectorAll('.filtros input:checked')
  const filtros = Array.from(checkboxes).map(c => c.value)

  if (!filtros.length) return mostrarError('Selecciona al menos una categoría.')

  resultado.innerHTML = '<p class="procesando">Procesando...</p>'

  try {
    const res = await fetch('/api/extraccion/analizar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error)

    // Filtra solo las categorías seleccionadas
    const filtradas = data.entidades.filter(e => filtros.includes(e.categoria))

    if (!filtradas.length) {
      resultado.innerHTML = '<p class="procesando">No se encontraron resultados para las categorías seleccionadas.</p>'
      return
    }

    resultado.innerHTML = filtradas.map(e => `
      <div class="entidad">
        <span class="texto">${e.texto}</span>
        <span class="categoria">${e.categoria}</span>
        <span class="confianza">${e.confianza}</span>
      </div>
    `).join('')

  } catch (error) {
    mostrarError(error.message)
  }
}

function mostrarError(msg) {
  document.getElementById('resultado').innerHTML = `<p class="error">❌ ${msg}</p>`
}