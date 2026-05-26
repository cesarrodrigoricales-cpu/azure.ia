const express = require('express')
const router = express.Router()
const { leerTexto } = require('../services/ocr')

router.post('/extraer', async (req, res) => {
  try {
    const { imageURL } = req.body
    console.log('imageURL recibida:', imageURL)

    const resultado = await leerTexto(imageURL)
    res.json(resultado)

  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router