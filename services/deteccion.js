//Estos datos son CONFIDENCIALES (BACKEND)
const suscriptionKey = process.env.AZURE_KEY
const endpoint = process.env.AZURE_ENDPOINT

const url = `${endpoint}/vision/v3.2/analyze?visualFeatures=Objects`



//const imageURL = `https://static.vecteezy.com/system/resources/previews/035/846/121/non_2x/man-job-entrepreneur-sitting-work-manager-office-modern-person-adult-smart-computer-desk-portrait-photo.jpg`

async function detectarObjetos(imagenURL){
  try{
    console.log("Iniciando la detección de objetos...")

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Ocp-Apim-Subscription-Key": suscriptionKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: imagenURL })
    })

    if (!response.ok){
      const errorData = await response.json()
      throw new Error(errorData.error.message)
    }

    //éxito...
    const data = await response.json()

    /*
    data.objects.forEach(obj => {
      const confianza = (obj.confidence * 100).toFixed(2)
      console.log(`Objeto identificado: ${obj.object} - Confianza: ${confianza}%`)

      //Ubicación - ¿en qué parte de la imagen está ese objeto?
      const rect = obj.rectangle
      console.log(`  Coordenadas del rectángulo:`)
      console.log(`  Inicio (superior, izquierdo): ${rect.x}, ${rect.y}`)
      console.log(`  Dimensiones (px): ${rect.w} ancho, ${rect.h} alto`)
    })
    */

    return data

  }catch(error){
    console.error(`Error en el servicio: ${error.message}`)
    throw error
  }
}

module.exports = {detectarObjetos}