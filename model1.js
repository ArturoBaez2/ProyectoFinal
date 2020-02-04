let mongoose = require( 'mongoose' );
let uuid = require("uuid");

mongoose.Promise = global.Promise;

let idN = uuid.v4();

let cartaCollection = mongoose.Schema({
    cafeteria : { type : Number },
    platofuerte : { type: String },
    precio : { type: Number },
    descripcion : { type: String },
    id : { type : String,
           data : idN }
},
{
    collection : 'carta'
});

let Carta = mongoose.model( 'carta', cartaCollection  );

let CartaList = {
    getAll : function(){
        return Carta.find()
            .then( carta => {
                console.log(carta);
                return carta;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    create : function ( newPlato ){
        return Carta.create( newPlato )
        .then( carta => {
            return carta;
        })
        .catch( error => {
            throw Error( error );
        });
    },
    update : function (actId, actPlato){
        return Carta.updateOne(actId , actPlato)
            then( carta => {
                return carta;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    remove : function( removePlato ){
        return Carta.deleteOne(removePlato)
            then( carta => {
                return carta;
            })
            .catch( error => {
                throw Error( error );
            });
    }
};



module.exports = {
    CartaList
};