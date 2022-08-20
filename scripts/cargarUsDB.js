function cargarUsDB (db,campos,tabla,data){
    let sql = `INSERT INTO ${tabla}(`;

    for(i in campos){
        if (i<(campos.length-1)){
            sql+=campos[i]+`,`;
        }else{
            sql+=campos[i];
        }
    }
    sql+=`) VALUES (`; // INSERT INTO nombreTAbla(id,nombre,carrera)
    for(i in campos){
        if (i<(campos.length-1)){
            sql+=`?`+`,`;
        }else{
            sql+=`?`;
        }
    }
    sql+=`)`;

    db.run(sql,data,(err) => {
        if (err) {
            console.log('No se pudo cargar el usario'); 
            return true;
        }
        console.log('Usuario Cargado');
        //console.log(sql);
        return false;
    });
}

module.exports = cargarUsDB;