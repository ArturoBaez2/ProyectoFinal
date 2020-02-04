let mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;

let userCollection = mongoose.Schema({
    mail : { type : String },
    nombre : { type: String },
    password : { type: String },
    admin : { type: Boolean },
});


let User = mongoose.model( 'usuarios', userCollection  );


let UserList = {
    getAll : function(){
        return User.find()
            .then( users => {
                return users;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    getUser : function( userMail ){
        return User.findOne( userMail )
            .then( user => {
                return user;
            })
            .catch( error => {
                throw Error( error );
            });
    },
    newUser : function( newUser ){
		return User.create( newUser )
				.then( user => {
					return user;
				})
				.catch( error => {
					throw Error(error);
				});
	}
};



module.exports = {
    UserList
};