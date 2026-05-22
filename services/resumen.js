const suscriptionKey = ""
const endpoint = ""

const URL = `${endpoint}/language/analyze-text/jobs?api-version=2023-04-01`

async function resumirTexto() {
  const documentoLargo = "Yo os las entrego tales como son, en su frescor de carne y de rosa. Sólo existe un método honrado y lógico de traducción: la «literalidad», una literalidad impersonal, apenas atenuada por un leve parpadeo y una ligera sonrisa del traductor. Ella crea, sugestiva, la más grande potencia literaria. Ella produce el placer de la evocación. Ella es la garantía de la verdad. Ella es firme e inmutable, en su desnudez de piedra. Ella cautiva el aroma primitivo y lo cristaliza. Ella separa y desata... Ella fija"

  const cuerpoPeticion = {
    displayName: "La invasion de Europa Occidental",
    analysisInput: {
      documents: [{ id: "1", language: "es", text: documentoLargo }]
    },
    tasks: [{
      kind: "ExtractiveSummarization",
      taskName: "Resumen_invasion",
      parameters: { sentenceCount: 2 }
    }]
  }

  try {
    console.log("Enviando documento largo a Azure...")

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        "Ocp-Apim-Subscription-Key": suscriptionKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cuerpoPeticion)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Error en: ${errorData.error.message}`)
    }

    const URLSeguimiento = response.headers.get('operation-location')
    console.log("Trabajo aceptado, procesando...")

    let resultadoFinal = null  

    while (true) {
      const respuestaSeguimiento = await fetch(URLSeguimiento, {
        headers: { "Ocp-Apim-Subscription-Key": suscriptionKey }
      })

      resultadoFinal = await respuestaSeguimiento.json()  

      if (resultadoFinal.status === 'succeeded') { break } 
      if (resultadoFinal.status === 'failed') {
        throw new Error('El servidor no pudo completar el proceso')
      }

      await new Promise(resolve => setTimeout(resolve, 2000))
    }//fin While

    console.log("Resumen generado por la IA")
    const tareaFinalizada = resultadoFinal.tasks.items[0]        
    const frasesResumen = tareaFinalizada.results.documents[0].sentences   

    console.log(`Tarea finalizada: ${tareaFinalizada}`)
    frasesResumen.forEach((frase,indice) => {
      console.log(`${indice}- ${frase.text}`)
    })

  } catch (error) {
    console.error(error.message)
  }
}

resumirTexto()