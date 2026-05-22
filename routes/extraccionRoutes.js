const express = require('express')
const router = express.Router()
const { extraerDatos } = require('../services/extraccion')

router.post('/analizar', async (req, res) => {
  try {
    const { texto } = req.body

    const resultado = await extraerDatos(texto)
    res.json(resultado)

  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router