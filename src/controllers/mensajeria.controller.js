
const fetch = require('node-fetch');

const Flujo=(rpta)=>{

    const postData={
        emisor:rpta.From,
        receptor: rpta.To,
        body: rpta.Body
    }
    console.log(postData);
    return fetch('http://localhost:8081/SMS/Mensaje/', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' },
      })
  .then(response => response.json())
};

const ObtenerRespuestaXFlujo=(rpta,idflujo)=>{

    const postData2={
        emisor:rpta.To,
        receptor: rpta.From,
        idFlujo: idflujo
    }
    console.log(postData2);
    return fetch('http://localhost:8081/SMS/FlujoAdicional/', {
        method: 'POST',
        body: JSON.stringify(postData2),
        headers: { 'Content-Type': 'application/json' },
      })
  .then(response => response.json())
};

const ObtenerRespuestaXFlujoTEST=(rpta,idflujo)=>{

    const postData2={
        emisor:rpta.From,
        receptor: rpta.To,
        idFlujo: idflujo
    }
    console.log(postData2);
    return fetch('http://apiregistro.adexperu.org.pe/SMS/FlujoAdicional/', {
        method: 'POST',
        body: JSON.stringify(postData2),
        headers: { 'Content-Type': 'application/json' },
      })
  .then(response => response.json())
};

module.exports={
    Flujo,
    ObtenerRespuestaXFlujo,
};
