const express = require('express')
const router = express.Router()
const { analizarImagen } = require('../services/imagen')

router.post('/analizar', async (req, res) => {
  try {
    const { imageURL } = req.body
    console.log('✅ imageURL recibida:', imageURL)  // ← agrega esto

    const resultado = await analizarImagen(imageURL)
    console.log('✅ resultado:', resultado)          // ← agrega esto
    res.json(resultado)

  } catch (error) {
    console.error('❌ Error:', error.message)        // ← agrega esto
    res.status(500).json({ error: error.message })
  }
})

module.exports = router