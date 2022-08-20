const fs = require("fs");

function cargarU (path){
    var infor=[]; var lista={}; var aux=[];
    if(fs.existsSync(path)){
        infor=fs.readFileSync(path, {encoding: "utf8"}).toString().replace(/\r\n/g,'\n').split("\n");
        for(i in infor){
            aux=infor[i].toString().split(' | ');
            lista[aux[0]]=aux[1]=='true';
        }
        return lista;
    }
}

module.exports = cargarU;