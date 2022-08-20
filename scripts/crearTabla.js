function crearTabla (db,campos){
    let sql = `CREATE TABLE IF NOT EXISTS ${campos[0]}(id INTEGER PRIMARY KEY`;
    for(i in campos){
        if(campos[i]!==campos[0]){
            sql+=`,`+campos[i];
        }
    }
    sql+=`)`;
    //console.log('creando tabla');
    db.run(sql);
    //console.log('tabla creada');
    //console.log(sql);
}

module.exports = crearTabla;