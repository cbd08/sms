const DARespuestas=require('../database/respuestas.database');

const flujoSMS=(rpta)=>{

    let respuesta_a_enviar='';
    const respuestasSMS=require('../respuestas.json');

    if(rpta.Body==='Hola'){
        var valorObjServicio=respuestasSMS.filter(obj=>{return obj.flujo===1});
        valorObjServicio=valorObjServicio[0];
        
        DARespuestas.registrarRespuesta(rpta);

        respuesta_a_enviar=valorObjServicio.txt;
    }else if(rpta.Body==='1'){
        respuesta_a_enviar='Por favor, responda a los siguientes campos para poder registrarlo\nDNI:';
    }
    /*
    let newBody='Entro al controlador'+bodyTXT;
    return newBody;
    */
    return respuesta_a_enviar;
};

module.exports={
     flujoSMS,
};
