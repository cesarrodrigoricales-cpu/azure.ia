const subscriptionKey = process.env.AZURE_KEY
const endpoint = process.env.AZURE_ENDPOINT

const url = `${endpoint}/language/:query-text?api-version=2021-10-01`

async function responderPreguntas(pregunta, contextoAnalizar) {

  try {

       /*
     const contextoAnalizar = `
     El manga tuvo 519 capítulos impresos recopilados en 42 volúmenes tankōbon. Dos años después de su lanzamiento, Toei Animation estrenó una adaptación anime que abarcó aproximadamente la primera mitad de la obra. Una vez concluida su transmisión en 1989 por el canal Fuji Television en Japón, Toei estrenó una continuación titulada Dragon Ball Z, la cual incorporó el contenido restante del manga. Un tercer anime producido por el mismo estudio se estrenó en 1996. Denominado Dragon Ball GT, posee un argumento inédito en cuya redacción no participó Toriyama.
     */

    /*
    const pregunta = "¿Cómo se llama la continuación de Dragon Ball?"
     */

    const cuerpoPeticion = {
      question: pregunta,
      records: [
        {
          id: "doc1",
          text: contextoAnalizar
        }
      ]
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cuerpoPeticion)
    })

    const data = await response.json()

    const respuesta = data.answers[0].answer
    const confianza = (data.answers[0].confidenceScore * 100).toFixed(2)

    return {
      respuesta,
      confianza
    }

  } catch (error) {

    console.log(error.message)
    throw error

  }
}

module.exports = { responderPreguntas }