require('dotenv').config();
const express=require('express');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const respuestasController=require('../src/controllers/mensajeria.controller');
const app = express();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const postData={
  emisor:'+15075805071',
  receptor: '+51963739613',
  idFlujo: 4
}

client.calls
.create({
  url: 'https://apiregistro.adexperu.org.pe/procesar-digitos/2', // URL de acción del controlador de ASP.NET Core
  //url: 'https://localhost:7095/procesar-digitos', // URL de acción del controlador de ASP.NET Core
  method: 'GET', // Método HTTP utilizado para la solicitud
  //body: JSON.stringify(postData),
  //headers: { 'Content-Type': 'application/json' },
  to: '+51963739613', // Número de teléfono de destino
  from: '+15075805071' // Número de teléfono de origen (tu número de Twilio)
})
.then(call => console.log(call.sid))
.catch(error => console.error(error));
/*
client.calls
  .create({
    url: 'https://your-app-url.com/voice', // Reemplaza con la URL de tu aplicación TwiML
    to: '+1234567890', // Número de teléfono de destino
    from: '+1987654321', // Número de teléfono de Twilio
    method: 'GET' // Método de solicitud HTTP para obtener el TwiML (GET o POST)
  })
  .then(call => console.log(call.sid))
  .catch(error => console.error(error));
*/


/*
client.calls.create({
  url: 'http://ejemplo.com/voz', // URL del archivo TwiML que define la lógica de la llamada
  to: '+51963739613', // Número de teléfono de destino
  from: '+15075805071' // Número de teléfono de origen (tu número de Twilio)
}).then(call => console.log(call.sid))
.catch(error => console.error(error));
*/
app.listen(4000,()=>{
  console.log('Server on port 4000');
} )