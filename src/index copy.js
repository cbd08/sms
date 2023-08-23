require('dotenv').config();

const express=require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const admin=require('firebase-admin');
const a=require('../src/controllers/respuestas.controller');
const respuestasController=require('../src/controllers/mensajeria.controller');
const app=express();
const db = admin.database();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sms',(req,res)=>{

    console.log(req.body.Body);
    respuestasController.Flujo(req.body)
    .then(data => {
      enviarRespuesta(req,res,data);
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
} );

const enviarRespuesta=(req,res,texto)=>{
    const twiml = new MessagingResponse();
    twiml.message(texto);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());


    //*Seguir flujo con DNI
    if(texto=='Por favor, responda a los siguientes campos para poder registrarlo.'){
        respuestasController.ObtenerRespuestaXFlujo(req.body,4).then(data => {
            enviarMensaje(req,data);
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
    }

    //*Llamar al usuario
    if(texto=='Introduzca su contraseña en la llamada.'){

        console.log(req.body.emisor);
        console.log(req.body.receptor);
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
            .then(call => console.log(call.sid),

            respuestasController.ObtenerRespuestaXFlujo(req.body,4).then(data => {
                enviarMensaje(req,data);
                console.log(data);
              })
              )
            .catch(error => console.error(error));
    }

    //*Validacion EQUIFAX OK
    /*
    if(texto=='Por favor, responda a los siguientes campos para poder registrarlo.'){
        respuestasController.ObtenerRespuestaXFlujo(req.body,4).then(data => {
            enviarMensaje(req,data);
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
    }
    */
};

const enviarMensaje=(req,data)=>{
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;

    const client=require('twilio')(accountSid, authToken);

    client.messages.create({
        to: req.body.From,
        from: '+15075805071',
        body: data
    })
        .then(message => console.log(message.sid)); 
}

/*

const registrarRespuestaRecibida=(res,texto)=>{
    const twiml = new MessagingResponse();
    twiml.message(texto);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
}

const registrarRespuestaEnviada=(res,texto)=>{
    const twiml = new MessagingResponse();
    twiml.message(texto);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
}
*/



app.listen(4000,()=>{
    console.log('Server on port 4000');
} )

//./ngrok http 4000
/* Enviar Mensajes
require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client=require('twilio')(accountSid, authToken);

client.messages.create({
    to: process.env.MY_PHONE_NUMBER,
    from: '+15075805071',
    body: 'Test node js'
})
    .then(message => console.log(message.sid)); 
*/