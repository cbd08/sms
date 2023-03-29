const connFirebase=require('../database/connection');
const conexi0n=connFirebase.admin;

const db=conexi0n.database();

const registrarRespuesta=(rpta)=>{
    let valoresRecibidos={
        to: rpta.To,
        from : rpta.From,
        body: rpta.Body,
        status: rpta.SmsStatus,
        fechaCreacion: Date.now()
    }
    db.ref('respuesta').push(valoresRecibidos);
};

module.exports={
    registrarRespuesta,
};
