const xlsx = require('xlsx');

function estado(numero,db,tabla,msg,fila){
    const workbook = xlsx.readFile('tablasCarreras.xlsx');
    const workbookSheets = workbook.SheetNames;
    //console.log(workbookSheets);
    var indice = workbookSheets.findIndex((elem)=>{
        return elem===fila.carrera;
    });
    
    var pasaje = msg.body.replace('.estado ','').split(',');

    if(pasaje.length!==0){
        if(pasaje[0].includes('aprobar')===true){
            const sheet = workbookSheets[indice];
            const dataExcel = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
            var appr = '';
            if (fila.aprobadas !== '' && fila.aprobadas !== undefined){
                appr = fila.aprobadas+'-';
            }
            var noVal = 'Materias no validas: \n';

            for (const materia of pasaje){
                var valida = false;
                for (const itemFila of dataExcel){
                    //console.log(itemFila['codigo']+': '+itemFila['nombre']); //'(*) D0225 – D0226' checkear correlativas de D0225 o D0226 
                    if(materia.includes(itemFila['codigo'])===true){
                        appr+=materia+'-';
                        valida=true;
                    }
                }
                if(materia.includes('aprobada')&&valida===false){
                    noVal+=materia+' ';
                }
            }
            if (appr[appr.length-1]==='-'){
                appr[appr.length-1]='';
            }
            var sql = `UPDATE ${tabla} SET aprobadas = '${appr}' WHERE id = ${numero};`;
            db.run(sql,(err)=>{
                if(err) { console.log(err); msg.reply('Hubo un error, intente nuevamente');}else{
                    msg.reply('Aprobados registrados correctamente');
                }
            });
            msg.reply(mens);
        }else if(pasaje[0].includes('cursando')===true){
            const sheet = workbookSheets[indice];
            const dataExcel = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
            var appr = '';
            var noVal = 'Materias no validas: \n';

            for (const materia of pasaje){
                var valida = false;
                for (const itemFila of dataExcel){
                    //console.log(itemFila['codigo']+': '+itemFila['nombre']); //'(*) D0225 – D0226' checkear correlativas de D0225 o D0226 
                    if(materia.includes(itemFila['cursando'])===true){
                        appr+=materia+'-';
                        valida=true;
                    }
                }
                if(materia.includes('cursando')&&valida===false){
                    noVal+=materia+' ';
                }
            }
            appr[appr.length-1]='';
            var sql = `UPDATE ${tabla} SET cursando = '${appr}' WHERE id = ${numero};`;
            db.run(sql,(err)=>{
                if(err) { console.log(err); msg.reply('Hubo un error, intente nuevamente');}else{
                    msg.reply('Cursadas registradas correctamente');
                }
            });
            msg.reply(mens);
        }else if(pasaje[0]==='desaprobar'){

        }
        
    }else{
        msg.reply('Comando invalido, intente nuevamente'+
        '\nRecuerde usar .lista para ver los codigos de las materias');
    }
}

module.exports = estado;