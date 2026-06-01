const express = require('express')
const router = express.Router()
const { enviarPregunta } = require('../services/chat')

router.post('/enviar', async (req, res) => {
  try {
    const { pregunta } = req.body
    const resultado = await enviarPregunta(pregunta)
    res.json(resultado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router