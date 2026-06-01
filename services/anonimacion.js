
const suscriptionKey = process.env.AZURE_KEY
const endpoint = process.env.AZURE_ENDPOINT

const url =`${endpoint}/language/:analyze-text?api-version=2023-04-01`

async function anonimazarDatos(){
  try{
     const texto = `Hola, mi nombre es Juan Carlos Peresz con DNI 45455656. mi número de telefono es 9561123123 y vivo en Av. miraflores 748,Arequipa. Pueden escribirme a juancarlos@gamil.com`
     const documentoAnonimizar = {
      kind: 'PiiEntityRecognition',
      analysisInput: {
        document: [{
           id: " 1 ",
           language: "es",
           text: texto
        }]
      },
      parameters: {
        redactionPolicy:{
          policyKind: 'CharacterMask',
          redactionCharacter: '*'
        }
      }
     } 
    
     
  
    }catch(error){
    console.error(error.message)
  }
}

anonimazarDatos()
