const comandos = require("./comandos");
const registro = require("./registro");

function validUsers (db,tabla,numero,msg){
    let sql = `SELECT * FROM ${tabla}`;
    db.all(sql,[], async (err,rows) => {
        if(err) return console.log(err);
        var valido = false;
        //console.log(rows);
        if (rows.length === 0){
            console.log('registro '+numero);
            registro(db,tabla,parseInt(numero),msg);
        }else{
            for(i in rows){
                //console.log('\nrow: '+parseInt(rows[i].id)+'\nnum: '+parseInt(numero));
                    if (parseInt(rows[i].id) === parseInt(numero)){
                        valido = true;
                        var nombre = rows[i].usuario;
                        comandos(nombre,numero,msg,db,tabla,rows[i]);
                        //console.log('valido');
                    }
                    if((valido === false && rows[i].id===rows[rows.length-1].id)){
                        console.log('registro '+numero);
                        registro(db,tabla,parseInt(numero),msg);
                    }
                //console.log(valido);
            }
        }
    });
}

module.exports = validUsers;