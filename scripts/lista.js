const xlsx = require('xlsx');

function lista(carrera,msg){
    const workbook = xlsx.readFile('tablasCarreras.xlsx');
    const workbookSheets = workbook.SheetNames;
    //console.log(workbookSheets);

    var indice = workbookSheets.findIndex((elem)=>{
        return elem===carrera;
    });
    console.log(indice);
    if(indice>=0){
        const sheet = workbookSheets[indice];
        const dataExcel = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
        //console.log(dataExcel);
        
        var materias = 'Las materias de la carrera '+carrera+' son:\n';
        for (const itemFila of dataExcel){
            //console.log(itemFila['codigo']+': '+itemFila['nombre']); //'(*) D0225 – D0226' checkear correlativas de D0225 o D0226 
            materias+='*'+itemFila['codigo']+'*: '+itemFila['nombre']+'\n';
        }
        materias+='\nLas optativas pueden no estar en la lista, siempre recordá revisar fuentes oficiales.'
        console.log(materias);
        msg.reply(materias);
    }else{
        var mens = carrera+' no es una carrera valida'+
        '\nUse _.carreras_ para ver las carreras disponibles'

        console.log(mens);
        msg.reply(mens);
    }
    
}

module.exports = lista;