let mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;

let pedidosCollection = mongoose.Schema({
    mail : { type : String },
    pedidos : [{ 
    platofuerte : { type : String },
    precio : { type : Number },
    fecha : { type : String }
    }]
});


let Pedido = mongoose.model( 'pedidos', pedidosCollection  );


let PedidosList = {
    getPedidos : function( mail){
        return Pedido.findOne( mail )
            .then( users => {
                return users;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    newPedido : function( newPedido ){
		return Pedido.create( newPedido )
				.then( user => {
					return user;
				})
				.catch( error => {
					throw Error(error);
				});
	}
};



module.exports = {
    PedidosList
};