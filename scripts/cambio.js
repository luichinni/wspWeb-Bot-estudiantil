function cambio(db,tabla,msg,numero){
    var parametros = msg.body.replace('.cambio ','').split(',');
    //console.log(parametros);
    if(parametros[0]==='aprobadas'){
        msg.reply('No se puede cambiar ese campo');
    }else if(parametros[0]!=='aprobadas' && parametros.length === 2){
        var sql = `UPDATE ${tabla} SET ${parametros[0]} = '${parametros[1]}' WHERE id = ${numero};`;
        //console.log(sql);
        db.run(sql,(err)=>{
            if(err) { console.log(err); msg.reply('Hubo un error, intente nuevamente');}else{
                msg.reply('Usuario cambiado con exito a '+parametros[1]);
            }
            
        });
    }else{
        msg.reply('No es un comando valido');
    }
}

module.exports = cambio;