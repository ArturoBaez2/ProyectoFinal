var token;
var usuario;


console.log("SI JALO");

function validate(){
  url = "/cafeterias-api/validate";
  $.ajax({
    url : url,
    method : "POST",
    dataType : "json",
    headers : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer "+ token
    },
    body : JSON.stringify({ mensaje : "Hola?"}),
    success : function( responseJSON ){
      console.log(responseJSON);
      usuario = responseJSON;
      console.log(usuario);
      getPedidos(responseJSON.mail);
    },
    error : function( err ){
      console.log( err );
    }
  });
}

function getPedidos( mail ){
	url = "/cafeterias-api/getpedidos/"+mail;
	 $.ajax({
	    url : url,
	    method : "GET",
	    dataType : "json",
	    success : function( responseJSON ){
	      console.log(responseJSON);
	      pedidos=responseJSON;
	      //console.log(pedidos);
	    },
	    error : function( err ){
	      console.log( err );
	    }
	});
}

function postPedido( mail , objP ){
	url = "/cafeterias-api/postpedido/"+mail;
  	$.ajax({
	    url : url,
	    method : "POST",
	    dataType : "json",
	    headers : {
	      "Content-Type" : "application/json",
	    },
	    data : JSON.stringify(objP),
	    success : function( responseJSON ){
	     	console.log(responseJSON);
	    },
	    error : function( err ){
	      console.log( err );
    }
  });
}

function pedidosSet(responseJSON){
	pedidos = responseJSON;

}


function infoU(){
	$('#infoUl')[0].innerHTML =`
		<li >
		<h2>Usuario: ${usuario.nombre}</h2>
		<p>Mail: ${usuario.mail} </p>
		</li>
	`
}

function pedidosU(){
	console.log(pedidos);
	for(let i=0; i < pedidos.pedidos.length; i++){
		
		$('#infoPe')[0].innerHTML +=`
		<li >
		<h2>Platillo: ${pedidos.pedidos[i].platofuerte}</h2>
		<p>Precio: ${pedidos.pedidos[i].precio} </p>
		<p>Fecha: ${pedidos.pedidos[i].fecha} </p>
		</li>
	`;
	}
	

}

//FUNCIONES PARA OBTENER LAS OPCIONEEEES DEL MENUUUUUUUUUUUU 

function menuJ(){

	let search = 1;
	let url = '/cafeterias-api/getByCafeteria?cafeteria='+ search;
				let settings = {
					method : "GET"
				}
				fetch(url, settings)
					.then(response => {
						if(response.ok){
							return response.json();
						}
					})
					.then(responseJSON => {
						displayResultsJ(responseJSON);
					});				

}

function cafeJ(){

	let url = '/cafeterias-api/menu';

	let settings = {
		method : "GET"
	}
	fetch(url, settings)
		.then(response => {
			if(response.ok){
				return response.json();
			}
		})
		.then(responseJSON => {
			menuJ(responseJSON);
		});
}

function menuC(){

	let search = 2;
	let url = '/cafeterias-api/getByCafeteria?cafeteria='+ search;
				let settings = {
					method : "GET"
				}
				fetch(url, settings)
					.then(response => {
						if(response.ok){
							return response.json();
						}
					})
					.then(responseJSON => {
						displayResultsC(responseJSON);
					});	


}

function cafeC(){

	let url = '/cafeterias-api/menu';

	let settings = {
		method : "GET"
	}
	fetch(url, settings)
		.then(response => {
			if(response.ok){
				return response.json();
			}
		})
		.then(responseJSON => {
			menuC(responseJSON);
		});
}

function menuP(){

	let search = 3;
	let url = '/cafeterias-api/getByCafeteria?cafeteria='+ search;
				let settings = {
					method : "GET"
				}
				fetch(url, settings)
					.then(response => {
						if(response.ok){
							return response.json();
						}
					})
					.then(responseJSON => {
						displayResultsP(responseJSON);
					});	



}

function cafeP(){

	let url = '/cafeterias-api/menu';

	let settings = {
		method : "GET"
	}
	fetch(url, settings)
		.then(response => {
			if(response.ok){
				return response.json();
			}
		})
		.then(responseJSON => {
			menuP(responseJSON);
		});
}

//DESPLEGAR EL MENU EN PANTALLA 

function displayResultsJ(responseJSON){

	let listaJ = document.getElementById('listaJ');
	console.log(responseJSON);

	for(let i=0; i<responseJSON.length; i++){

		listaJ.innerHTML += `

		<li class="listaM">
		<fieldset>
		<h2> ${responseJSON[i].platofuerte} </h2>
		<p> ${responseJSON[i].descripcion} </p>
		<span> Precio : $ </span> <span>${responseJSON[i].precio}</span>
		<button type="submit" class="otro"> Ordenar </button>
		</fieldset>
		</li>
	`
	} 

	$('.otro').click(function(e){
		e.preventDefault();
		let h2 = $(e.target).siblings('h2')[0].textContent;
		let p1 = $(e.target).siblings('span')[1].textContent;
		let mail = pedidos.mail;
		let objP = { platofuerte : h2, precio : p1 };
		postPedido( mail , objP );
		console.log(mail);
		window.location.href = "./standby.html";
		
	});

	
}

function displayResultsC(responseJSON){

	let listaJ = document.getElementById('listaC');
	console.log(responseJSON);

	for(let i=0; i<responseJSON.length; i++){

		listaJ.innerHTML += `

		<li class="listaM">
		<fieldset>
		<h2> ${responseJSON[i].platofuerte} </h2>
		<p> ${responseJSON[i].descripcion} </p>
		<span> Precio : $ </span> <span>${responseJSON[i].precio}</span>
		<button type="submit" class="nuevo"> Ordenar </button>
		</fieldset>
		</li>
	`
	} 

	$('.nuevo').click(function(e){
		e.preventDefault();
		let h2 = $(e.target).siblings('h2')[0].textContent;
		let p1 = $(e.target).siblings('span')[1].textContent;
		let mail = pedidos.mail;
		let objP = { platofuerte : h2, precio : p1 };
		postPedido( mail , objP );
		console.log(p1);
		window.location.href = "./standby.html";
		
	});
	
}

function displayResultsP(responseJSON){

	let listaJ = document.getElementById('listaP');
	console.log(responseJSON);

	for(let i=0; i<responseJSON.length; i++){

		listaJ.innerHTML += `
		<li class="listaM">
		<fieldset>
		<h2> ${responseJSON[i].platofuerte} </h2>
		<p> ${responseJSON[i].descripcion} </p>
		<span> Precio : $ </span> <span>${responseJSON[i].precio}</span>
		<button type="submit" class="stand"> Ordenar </button>
		</fieldset>
		</li>
	`
	} 

	$('.stand').click(function(e){
		e.preventDefault();
		let h2 = $(e.target).siblings('h2')[0].textContent;
		let p1 = $(e.target).siblings('span')[1].textContent;
		let mail = pedidos.mail;
		let objP = { platofuerte : h2, precio : p1 };
		postPedido(mail , objP);
		console.log(p1);
		window.location.href = "./standby.html";
		
	});
	
}



//FUNCIOOOOOOON INIT

function init(){
	var pedidos;

	validate();

	$('.jubileo').click(function(e){
		console.log("MENU JUBILEO");
		$('.todasCafeterias').addClass("visibility");
		$('#menuJ').addClass("show");
		cafeJ();

	});

	$('.atras').click(function(e){
		event.preventDefault();
		$('.todasCafeterias').removeClass("visibility");
		$('.listaM').remove();
		$('#menuJ').removeClass("show");
	});




	$('.centrales').click(function(e){
		console.log("MENU centrales");
		$('.todasCafeterias').addClass("visibility");
		$('#menuC').addClass("show");
		cafeC();


	});

	$('.atras').click(function(e){
		event.preventDefault();
		$('.todasCafeterias').removeClass("visibility");
		$('.listaM').remove();
		$('#menuC').removeClass("show");
	});





	$('.cafeteriaPersonal').click(function(e){
		console.log("MENU cafeteriaPersonal");
		$('.todasCafeterias').addClass("visibility");
		$('#menuP').addClass("show");
		cafeP();


	});

	$('.atras').click(function(e){
		event.preventDefault();
		$('.todasCafeterias').removeClass("visibility");
		$('.listaM').remove();
		$('#menuP').removeClass("show");
	});




	$('#ajustes').click(function(e){

		console.log("AJUSTES");
		$('#pedidos').toggleClass("show");
		$('#info').toggleClass("show");
		
	});

	$('#info').click(function(e){

		$('#infoU').toggleClass("show");
		infoU();
		
	});

	$('#pedidos').click(function(e){

		$('#infoPedidos').toggleClass("show");
		pedidosU();
		
	});


}

init();
