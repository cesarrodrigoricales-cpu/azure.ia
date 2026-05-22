//Detección de imágenes

const suscriptionKey = process.env.AZURE_KEY
const endpoint = process.env.AZURE_ENDPOINT

//La URL describe las funcionalidades que deseamos aprovechar
const url = `${endpoint}/vision/v3.2/analyze?visualFeatures=Categories,Description,Color`

//Imagen que analizaremos
//const imageURL = `https://images.pexels.com/videos/7655554/pexels-photo-7655554.jpeg`
//const imageURL = `https://img.magnific.com/fotos-premium/amigos-felices-corriendo-campo-contra-arboles_7186-4118.jpg`

//Esta funcionalidad requiere ejecutase como promesa
async function analizarImagen(imageURL){
  try{
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Ocp-Apim-Subscription-Key": suscriptionKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: imageURL })
    })

    if (!response.ok){
      const errorData = await response.json()
      throw new Error(`Error en: ${errorData.error.message}`)
    }

    //Logramos recibir un resultado favorable
    const data = await response.json()
    const confianza = (data.description.captions[0].confidence * 100).toFixed(2)

    //Muestra todos los datos
    //console.log(data.description)
    
    return{
         descripcion: data.description.captions[0].text,
         confianza: `${confianza} %`,
         etiquetas: data.description.tags
    }



  }catch(error){
    console.error(`Error analizando imagen: ${error.message}`)
  }
}


module.exports = { analizarImagen }  