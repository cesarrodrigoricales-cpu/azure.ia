const msgs = document.getElementById('msgs')
const input = document.getElementById('preguntaInput')

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') enviarPregunta()
})

function toggleTheme() {
  const app = document.getElementById('app')
  const btn = document.getElementById('themeBtn')
  const isDark = app.classList.contains('dark')
  app.classList.toggle('dark', !isDark)
  app.classList.toggle('light', isDark)
  btn.textContent = isDark ? '🌙' : '☀️'
}

function agregarBurbuja(texto, tipo) {
  const msg = document.createElement('div')
  msg.className = `msg ${tipo}`
  msg.innerHTML = `
    <div class="avatar ${tipo}">${tipo === 'ai' ? '✦' : 'U'}</div>
    <div class="bubble ${tipo}">${texto}</div>
  `
  msgs.appendChild(msg)
  msgs.scrollTop = msgs.scrollHeight
  return msg
}

function mostrarTyping() {
  return agregarBurbuja(
    `<div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`,
    'ai'
  )
}

async function enviarPregunta() {
  const pregunta = input.value.trim()
  if (!pregunta) return

  input.value = ''
  agregarBurbuja(pregunta, 'user')
  const typing = mostrarTyping()

  const res = await fetch('/api/chat/enviar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pregunta })
  })

  const data = await res.json()
  console.log('respuesta del servidor:', data)
  typing.remove()
  agregarBurbuja(data.respuesta, 'ai')
}