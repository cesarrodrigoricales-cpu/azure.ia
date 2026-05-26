const express = require('express')
const router = express.Router()
const { responderPreguntas } = require('../services/preguntas')


router.post('/preguntas', async (req, res) => {

  try {
    const { pregunta, contexto } = req.body

    const resultado = await responderPreguntas(pregunta,contexto)

    res.json(resultado)

  }catch (error){
    console.error('Error:', error.message)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router