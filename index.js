require('dotenv').config();

const express=require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app=express();

app.post('/sms',(req,res)=>{
    const twiml = new MessagingResponse();
    twiml.message('Recibi tu mensaje node js');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
} )

app.listen(4000,()=>{
    console.log('Server on port 4000');
} )
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