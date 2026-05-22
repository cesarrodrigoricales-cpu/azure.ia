require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.use('/api/ocr',    require('./routes/ocrRoutes'))
app.use('/api/imagen', require('./routes/imageRoutes'))
//app.use('/api/analisis',    require('./routes/analisisRoutes'))
//app.use('/api/deteccion',   require('./routes/deteccionRoutes'))
app.use('/api/extraccion',  require('./routes/extraccionRoutes'))
//app.use('/api/preguntas',   require('./routes/preguntasRoutes'))
//app.use('/api/resumen',     require('./routes/resumenRoutes'))
//app.use('/api/sentimientos', require('./routes/sentimientosRoutes'))

app.listen(3000, () => console.log('Servidor en http://localhost:3000'))