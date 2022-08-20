const cargarUsDB = require("./cargarUsDB");
const xlsx = require('xlsx');
const carreras = require("./carreras");

function registro(db,tabla,numero,msg){
    console.log(numero);
    if(msg.body.startsWith('.registro')){
        if(msg.body==='.registro'){
            msg.reply('🗃️Formato del mensaje:'+
            '\n.registro nombre,carrera'+
            '\n⚠️.carrera para ver las carreras disponibles');
        }else{
            var cantParm=msg.body.split(',');
            if(cantParm.length===2){
                var nombre = cantParm[0].replace('.registro ','');

                const workbook = xlsx.readFile('tablasCarreras.xlsx');
                const workbookSheets = workbook.SheetNames;

                var indice = workbookSheets.findIndex((elem)=>{
                    return elem===cantParm[1];
                });

                if(indice>=0){
                    cargarUsDB(db,['id','usuario','carrera','aprobadas','cursando'],tabla,
                    [numero,nombre,cantParm[1].toLowerCase(),'','']);
                    msg.reply('Registrado correctamente');
                }else{
                    msg.reply('Usa .carreras para ver las carreras disponibles'+
                    '\nRecorda escribir la carrera como aparece en la lista!');
                }
                
            }else{
                msg.reply('Recuerde:\n.registro nombre,carrera');
            }
        }
    }else{
        if(msg.body === '.carreras'){
            carreras(msg);
        }else{
            msg.reply('No estás registrado');
        }
    }
}

module.exports = registro;