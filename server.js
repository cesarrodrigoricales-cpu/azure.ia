require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.use('/api/ocr', require('./routes/ocrroutes.js'))
app.use('/api/imagen', require('./routes/imageroutes.js'))
app.use('/api/deteccion', require('./routes/deteccionroutes.js'))
app.use('/api/extraccion', require('./routes/extraccionroutes.js'))
app.use('/api/preguntas', require('./routes/preguntasroutes.js'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})