require('dotenv').config();

const express=require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const admin=require('firebase-admin');
const a=require('../src/controllers/respuestas.controller');
//import { flujoSMS } from './controllers/respuestas.controller';
/*
//FireBase
var serviceAccount = require("../billetera-201814244-firebase-adminsdk-q2301-5f7aa84ce8.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://billetera-201814244-default-rtdb.firebaseio.com/'
})
//
*/
const app=express();
const db = admin.database();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sms',(req,res)=>{

    //let jsonMensajeRecibido=req.body;
    
    let valueController=a.flujoSMS(req.body);

    //console.log(valueController);
    /*
    let valoresRecibidos={
        to: req.body.To,
        from : req.body.From,
        body: req.body.Body,
        status: req.body.SmsStatus,
        fechaCreacion: Date.now()
    }
    */
    /*
    console.log(req.body);
    console.log(req.body['To']);
    console.log(req.body.From);
    console.log(req.body.body);
    */
    /*db.ref('respuesta').push(valoresRecibidos);*/

    const twiml = new MessagingResponse();
    //twiml.message('Recibi tu mensaje node js');
    twiml.message(valueController);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
} )



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