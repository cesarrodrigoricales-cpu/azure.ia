const express = require('express')
const router = express.Router()
const { detectarObjetos } = require('../services/deteccion')

router.post('/detectar', async (req, res) => {
  try {
    const { imageURL } = req.body
    console.log('imageURL recibida:', imageURL)  

    const resultado = await detectarObjetos(imageURL)
    console.log('resultado:', resultado)          
    res.json(resultado)

  } catch (error) {
    console.error('Error:', error.message)       
    res.status(500).json({ error: error.message })
  }
})

module.exports = router