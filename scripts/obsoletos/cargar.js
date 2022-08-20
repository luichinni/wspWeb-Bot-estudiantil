const fs = require("fs");

function cargar(path){
    //console.log(path);
    var aux=[]; var materias=[]; var correlativas=[]; var infor=[];
    if(fs.existsSync(path)){
        infor = fs.readFileSync(path, {encoding: "utf8"}).toString().replace(/\r\n/g,'\n').split("\n");
        //console.log(infor);
        for(i in infor){
            //console.log(infor[i]);
            aux=infor[i].toString().split(",");
            //console.log(aux);
            materias[i]=aux[0];
            //console.log(materias[i]);
            correlativas[i]=aux[1];
            //console.log(correlativas[i]);
        }
        console.log("Plan de estudio cargado");
        //console.log(materias);
        //console.log({'mat':materias,'cor':correlativas});
        return {'mat':materias,'cor':correlativas};
    }
}

module.exports = cargar;