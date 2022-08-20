const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
//const fs = require("fs");
const sqlite3 = require("sqlite3");
//const cargar = require("./scripts/cargar");
//const cargarU = require("./scripts/cargarU");
const crearTabla = require("./scripts/crearTabla");
//const cargarUsDB = require("./scripts/cargarUsDB");
const validUsers = require("./scripts/validUsers");
//const lista = require("./scripts/lista");
//const path = './carreras/';
const pathDB = './userData.db';
//const pathUsers = './regUsers.txt';

//var carreras={}; var validUsers = {};

const db = new sqlite3.Database(pathDB,sqlite3.OPEN_READWRITE,(err)=>{
    if (err) return console.log(err.message);
});

crearTabla(db,['users','usuario','carrera','aprobadas','cursando']);
//cargarUsDB(db,['id','usuario','carrera','aprobadas'],'users',[5492216387633,'shein','lic.sistemas','a']);


/*
try{
    fs.readdirSync(path).forEach(file => {
        var arrs = cargar(path+file);
        //console.log(arrs);
        var nom = file.split('.')[0];
        carreras[nom]=arrs;
        //console.log(arrs);
    });
}catch{
    console.log('Fallo al cargar carreras');
}

try{
    var arrs = cargarU(pathUsers); //devuelve {'codigo usuario': true/false}
    validUsers = arrs;
    console.log(validUsers);
}catch{
    console.log('Fallo al cargar los usuarios')
}
*/

const client = new Client({
    authStrategy: new LocalAuth()
})

client.on('qr', qr =>{
    qrcode.generate(qr,{small:true});
});


client.on("ready", () => {
    console.log("Bot Activo!");
});

//validUsers(db,'users',5492216387633,'hola');

/*sql = `SELECT * FROM sqlite_master WHERE name='users' AND type='table'`;
db.get(sql,[],(err,tabla)=>{
    if(err){
        console.log(err);
    }
        console.log('dato: '+tabla);
});*/

//lista('fisicamedica','');

client.on("message_create", (msg) => {
    //console.log('entró');
    var numero=msg.from.split('@')[0];
    //console.log(numero);
    if(numero.length!==13){
        numero=numero.split('-')[0];
    }
    //console.log(numero);

    if (msg.body.startsWith('.')){
        
        //console.log(numero);
        validUsers(db,'users',numero,msg);


        /*if(vali){
            var nombre = getNombre(db,'users',numero);
            if(msg.body==='.hola'){
                msg.reply('Hola '+nombre);
            }
            console.log(nombre+" existe");
        }else{
            if(msg.body==='.registro'){
                msg.reply('🗃️Formato del mensaje:'+
                '\n.registro nombre,carrera'+
                '\n⚠️.carrera para ver las carreras disponibles');
            }else if(msg.body.startsWith('.registro')){
                var cantParm=msg.body.split(',');
                if(cantParm.length===2){
                    var nombre = cantParm[0].replace('.registro ','');
                    var existe = false;
                    existe=cargarUsDB(db,['id','usuario','carrera','aprobadas'],'users',
                    [numero[0],nombre,cantParm[1],'']);
                    if(existe){
                        msg.reply('Hubo un error al intentar registrarte');
                    }
                }
            }
        }*/
    }
});


client.initialize();