const xlsx = require('xlsx');

function aprobadas(msg,fila){
    const workbook = xlsx.readFile('tablasCarreras.xlsx');
    const workbookSheets = workbook.SheetNames;
    //console.log(workbookSheets);
    var indice = workbookSheets.findIndex((elem)=>{
        return elem===fila.carrera;
    });

    var aprobadasArr = fila.aprobadas.split('-');

    //console.log(aprobadasArr.length);
    //console.log(aprobadasArr);
    
    if(aprobadasArr[0]!==''){
        const sheet = workbookSheets[indice];
        const dataExcel = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
        var mens = 'Aprobadas: \n';

        for (const materia of aprobadasArr){
            for (const itemFila of dataExcel){
                //console.log(itemFila['codigo']+': '+itemFila['nombre']); //'(*) D0225 – D0226' checkear correlativas de D0225 o D0226 
                if(itemFila['codigo'] === materia){
                    mens += '*'+materia+'*: '+itemFila['nombre']+'\n';
                }
            }
        }
        msg.reply(mens);
    }else{
        msg.reply('Aun no tenes materias aprobadas')
    }
}

module.exports = aprobadas;