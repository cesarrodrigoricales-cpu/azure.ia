const suscriptionKey = ""
const endpoint = ""

const url = `${endpoint}/vision/v3.2/analyze?visualFeatures=Description,Tags,Objects`   
const imageURL = 'https://spanish.xinhuanet.com/photo/2020-12/14/139583823_16077426919131n.jpg'

async function analizarConetenido(){
  try{
       
    console.log("Analizando imagen...")
    const response = await fetch(url,{
      method: 'POST',
      headers: {
        "Ocp-Apim-Subscription-Key": suscriptionKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({url: imageURL})
    })

    if(!response.ok){
      const dataError = await response.error
      throw new Error(dataError.error.message)
    }

    const data = await response.json()

    const description = data.description.captions[0].text
    const confianza = (data.description.captions[0].confidence * 100).toFixed(2)
    console.log(`Resumen: ${description} - Confianza : ${confianza}%`)

  const listaEtiquetas = data.tags.map(fila => `${fila.name} - ${(fila.confidence * 100).toFixed(2)}%`)
   listaEtiquetas.forEach(element =>{
      console.log(`${element}`)
    })

    console.log("Ubicacion de Objetos")
     data.objects.forEach(element=>{
      console.log(`${element.object} - x : ${element.rectangle.x}; y: ${element.rectangle.y}`)
     })   

  }catch(error){
    console.error(error.message)
  }
}

analizarConetenido()