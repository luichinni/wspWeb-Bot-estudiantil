const xlsx = require('xlsx');

function carreras(msg){
    const workbook = xlsx.readFile('tablasCarreras.xlsx');
    const workbookSheets = workbook.SheetNames;
    //console.log(workbookSheets);

    var mens = 'Las carreras disponibles son:\n';
    for(i in workbookSheets){
        mens += workbookSheets[i]+'\n';
    }
    mens += '\nSi tu carrera no aparece contactate enviando una peticion con .pedir junto a tu carrera (Esto todavia no funcion ajsja)';
    msg.reply(mens);
}

module.exports = carreras;