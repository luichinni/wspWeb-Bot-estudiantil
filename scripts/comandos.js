const aprobadas = require("./aprobadas");
const cambio = require("./cambio");
const carreras = require("./carreras");
const lista = require("./lista");

function comandos(nombre,numero,msg,db,tabla,fila){
    if(msg.body === '.hola'){
        msg.reply('Hola '+ nombre);
    }else if(msg.body.startsWith('.cambio')){
        if(msg.body==='.cambio'){
            msg.reply('🗃️Formato del mensaje:'+
                '\n.cambio nombre_campo,valor'+
                '\nnombre_campo valido: usuario o carrera'+
                '\n⚠️No dejar espacio entre los campos de la coma');
        }else{
            cambio(db,tabla,msg,numero);
        }
    }else if(msg.body === '.lista'){
        lista(fila.carrera,msg);
    }else if(msg.body === '.carreras'){
        carreras(msg);
    }else if(msg.body === '.aprobadas'){
        aprobadas(msg,fila);
    }else if(msg.body.startsWith('.estado')){
        if(msg.body === '.estado'){

        }else{
            
        }
    }
}

module.exports = comandos;