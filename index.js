var token;

let express = require( 'express' );
let morgan = require( 'morgan' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let uuid = require("uuid");

let jsonParser = bodyParser.json();

let jwt = require('jsonwebtoken');

let { UserList } = require( './model' );
let { CartaList } = require( './model1' );
let { PedidosList } = require( './model2' );

let { DATABASE_URL, PORT } = require( './config' );

let app = express();

let todaCarta;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    if (req.method === "OPTIONS") {
      return res.send(204);
    }
    next();
  });

app.use( express.static( 'public' )); 
app.use( morgan( 'dev' ) );

let usuarios =[ {
	
	mail : "usuario1@hotmail.com",
	nombre : "Alex",
	password : 1234,
	admin : true
},
{
	mail : "usuario2@hotmail.com",
	nombre : "Esquivel",
	password : 2345,
	admin : false
},
{	
	mail : "usuario3@hotmail.com",
	nombre : "Jorge",
	password : 3456,
	admin : false
}
];

app.post('/cafeterias-api/usuarioLogin', jsonParser, (req,res) => {
	//console.log(req.body);

	let mailFind = req.body.mail;
	let password = req.body.password;
	
	if( mailFind == '' || password == ''){
		res.statusMessage = "Llenar todos los campos";
		res.status(400).send();
	}

	//console.log( mailFind );
	//console.log( password );
	
	//Version sin mongo
	//let user = usuarios.find( (element) => {
	//	if( mail == element.mail && password == element.password){
	//		return element;
	//	}
	//});
	//console.log(user);

	UserList.getUser( { mail : mailFind } )
		.then( user => {
			console.log( user );
			if( password == user.password ){
				let tokenN = jwt.sign( {
					mail : user.mail,
					nombre : user.nombre,
					password : user.password,
					admin : user.admin
				}, 'secret', {
        			expiresIn : 60 * 5
    			});
    			
    			token = tokenN;
    			console.log(token);
				return res.status(200).json( { tokenN, admin : user.admin } );
			}
			else{
				res.statusMessage = "No se encontro el usuario";
				return res.status(402).send();
			}
		})
		.catch( error => {
			console.log(error);
			res.statusMessage = "Error con el servidor";
			return res.status(500).send();
		});

	//Version sin mongo
	//if( user != undefined ){
	//	let token = jwt.sign( user, 'secret', {
    //    expiresIn : 60
    //	});
	//	return res.status(200).json( {token} );
	//} else{
	//	res.statusMessage = " Usuario o contrasena invalios "
	//	return res.status(400).send();
	//}
	
});

app.post('/cafeterias-api/usuarioSignup', jsonParser, (req,res) => {
	console.log(req.body);

	let mailAdd = req.body.mail;
	let passwordAdd = req.body.password;
	let nombreAdd = req.body.nombre;
	
	console.log( mailAdd );
	console.log( passwordAdd );
	console.log( nombreAdd );
	
	if( mailAdd == '' || passwordAdd == '' || nombreAdd == ''){
		res.statusMessage = "Llenar todos los campos";
		res.status(400).send();
	}

	//Version sin mongo
	//let user = usuarios.find( (element) => {
	//	if( mailAdd == element.mail ){
	//		return element;
	//	}
	//});

	UserList.getUser( { mail : mailAdd } )
		.then( user => {
			if( user != null){
				res.statusMessage = " Favor de proporcionar otro mail "
				return res.status(400).send();
			}
		})
		.catch( error =>{
			console.log(error);
			res.statusMessage = "Error con el servidor";
			return res.status(500).send();
		});

	//if( user != undefined ){
	//	res.statusMessage = " Favor de proporcionar otro mail "
	//	return res.status(400).send();
	//} 

	let nuevoUsuario = {
		mail : mailAdd,
		nombre : nombreAdd,
		password : passwordAdd,
		admin : false
	}
	
	//usuarios.push(nuevoUsuario);
	//console.log(usuarios);

	UserList.newUser( nuevoUsuario )
		.then( user => {
			return res.status(200).json(nuevoUsuario);
		})
		.catch( error => {
			console.log( error );
			res.statusMessage = "Error con el servidor";
			return res.status(500).send();
		});

	//return res.status(200).json(nuevoUsuario);

});

app.post('/cafeterias-api/validate', jsonParser, (req,res) => {
	let mensaje = req.body.mensaje;

	let tokenN = req.headers.authorization;
	console.log(token);
    tokenN = token.replace('Bearer ', '');

    jwt.verify( token, 'secret', ( err, user) => {
        if( err ){
            res.statusMessage = "Token no valido";
            return res.sendStatus( 400 );
        }

        console.log(user);
        return res.status(200).json(user);
    });

});

/////////////////////
/////////////////////

app.get('/cafeterias-api/menu', (req,res) => { // req trae la infomración que trae del content ( si tiene headers, etc)... res es para mandar una respuesta 

	CartaList.getAll()
		.then( carta =>{

			todaCarta = carta;
			return res.status( 200 ).json( carta );
		})
		.catch( error =>{
			console.log(error);
			res.statusMessage= " Fallo el servidor";
			return res.status(400).send();
		});
		
	//res.status( 200 ).json( menu );

});

app.get('/cafeterias-api/getByCafeteria', ( req, res ) => {

    let cafeteria = req.query.cafeteria;

    console.log(cafeteria);


    let result = todaCarta.filter( ( elemento ) => {
        if ( elemento.cafeteria == cafeteria ){
            return elemento;
        }
    });

    if( result ){
        return res.status( 200 ).json( result );
    }
    else{
        res.statusMessage = "ESTA OPCION NO ES UNA CAFETERIA VALIDO";
        return res.status( 404 ).send();
    }

});

app.post('/cafeterias-api/nuevo-platillo',jsonParser,(req,res)=>{

		let objeto = req.body;

		let Ncafeteria = req.body.cafeteria;
		let Nplatofuerte = req.body.platofuerte;
		let Nprecio = req.body.precio;
		let Ndescripcion = req.body.descripcion;

		if (Nplatofuerte == '' || Nprecio == '' || Ndescripcion == '' || Ncafeteria == ''){

		res.statusMessage = "infomración de platillo incompleta (REVISAR FORMA)";
		return res.status(406).json({});

		}else if( (Ncafeteria <= 0) || (Ncafeteria >= 4)){

			res.statusMessage = "EL ID NO COINCIDE CON ALGUNA CAFETERIA";
			return res.status(406).json({});
			
		}else{

			objeto.id = uuid.v4();
			console.log(objeto);
			
			let newPlato = {

				cafeteria : Ncafeteria,
				platofuerte : Nplatofuerte,
				precio : Nprecio,
				descripcion : Ndescripcion,
				id: uuid.v4()
			}

			CartaList.create( newPlato )
        		.then( CartaList => {
            	return res.status( 200 ).json( CartaList );
        	})
        		.catch( error => {
            	console.log(error);
            	res.statusMessage = "Hubo un error de conexion con la BD."
            	return res.status( 500 ).send();
        	});
		}	

});

app.delete('/cafeterias-api/remover-platillo/:id',jsonParser, (req,res)=> {

		 let idBorrar = req.params.id;
		 let objRemove = { id : idBorrar};

		

		CartaList.remove(objRemove) 
    			.then( CartaList => {
            	return res.status( 201 ).json( CartaList );
        	})
        		.catch( error => {
            	res.statusMessage = "Error en conexión con la base de datos";
            	return res.status( 500 ).json( error );
        });



		
	
});

app.put('/cafeterias-api/actualizar-platillo/:id',jsonParser, (req,res)=> {

		 let idActualizar = req.params.id;
		 console.log(idActualizar);

		 if (idActualizar == undefined){

		 	res.statusMessage = "No ha enviado id en request";
		 	return res.status(406).json({})

		 }
	
		let idObjeto = req.params.id;
		let Aplatofuerte = req.body.platofuerte;
		let Adescripcion = req.body.descripcion;
		let Aprecio = req.body.precio;
		let Acafeteria = req.body.cafeteria;


		if ( idActualizar != idObjeto){

			res.statusMessage = "El id de REQUEST no coincide con id de Parametro(Objeto)";
		 	return res.status(409).json({})

		}


		if ( Aplatofuerte == undefined && Adescripcion == undefined && Aprecio == undefined && Acafeteria == undefined){

			res.statusMessage = "Campos de Objeto VACIOS!";
		 	return res.status(406).json({})
		}
		
		let actPlato = {

				cafeteria : Acafeteria,
				platofuerte : Aplatofuerte,
				precio : Aprecio,
				descripcion : Adescripcion,
				id: idObjeto
			}

		let actId = { id : idObjeto };

		CartaList.update(actId, actPlato) 
   		.then( CartaList => {
            	return res.status( 201 ).json( CartaList );
        	})
        	.catch( error => {
            	res.statusMessage = "Error en conexión con la base de datos";
            	return res.status( 500 ).json( error );
        	});
		
	
});

app.get('/cafeterias-api/getpedidos/:mail', ( req, res ) => {

    let mailGet = req.params.mail;

    //console.log(mailGet);

    PedidosList.getPedidos( { mail: mailGet} )
    	.then( pedidos => {
    		return res.status(201).json( pedidos );
    	})
    	.catch( error => {
    		console.log(error);
    		res.statusMessage="Error en la conexión con la base de datos";
    		return res.status(500).json( error );
    	});

});

app.post('/cafeterias-api/postpedido/:mail', jsonParser,( req, res ) => {

    let mailGet = req.params.mail;
    console.log(req.body);
    let platillo = req.body.platofuerte;
    let price = req.body.precio;
    let date = "20/01/20";

    let objP = { 
    	mail : mailGet,
    	pedidos : [{
    		platofuerte : platillo,
    		precio : price,
    		fecha : date
    	}] 
    }
    
    PedidosList.newPedido( objP )
    	.then( newPedido => {
    		return res.status(200).json(newPedido);
    	})
    	.catch( error => {
    		console.log(error);
    		res.statusMessage=" Falla en el servidor";
    		return res.status(500).send();
    	});
    

});

let server;

function runServer(port, databaseUrl){
	return new Promise( (resolve, reject ) => {
		mongoose.connect(databaseUrl, response => {
			if ( response ){
				return reject(response);
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing the server');
				server.close( err => {
					if (err){
						return reject(err);
					}
					else{
						resolve();
					}
				});
			});
		});
}

runServer( PORT, DATABASE_URL );

module.exports = { app, runServer, closeServer }
//app.listen(8080,() => {
//	console.log("Servidor corriendo en puerto 8080");
//});