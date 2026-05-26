require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.use('/api/ocr', require('./routes/ocrRoutes.js'))
app.use('/api/imagen', require('./routes/imageRoutes.js'))
app.use('/api/deteccion', require('./routes/deteccionRoutes.js'))
app.use('/api/extraccion', require('./routes/extraccionRoutes.js'))
app.use('/api/preguntas', require('./routes/preguntasRoutes.js'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})