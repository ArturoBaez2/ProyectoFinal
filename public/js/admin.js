console.log("FUNCIONA");


function watchForm2(){

	let nuevoC = document.getElementById('submitN');
		nuevoC.addEventListener('click', (event) =>{

			event.preventDefault();

			let cafeteria = document.getElementById('nuevoC').value;
			let platofuerte = document.getElementById('nuevoP').value;
			let descripcion = document.getElementById('nuevaD').value;
			let precio = document.getElementById('nuevoPrecio').value;


			if(cafeteria!=""&&platofuerte!=""&&descripcion!=""){

				let url = "/cafeterias-api/nuevo-platillo";
				
				let bodyJSON = {
					"cafeteria" : cafeteria,
					"platofuerte" : platofuerte,
					"descripcion" : descripcion,
					"precio" : precio
				}

				let settings = {
					method : "POST",
					body : JSON.stringify(bodyJSON),
					headers:{
    					'Content-Type': 'application/json'
  					}
				}
				fetch(url, settings)
					.then((response)=>{
						if(response.ok){
							return response.json();
					}

					throw new Error(response.statusText);
				})
				.then((responseJSON)=>{

					if ( cafeteria == 1){
						$('.listaJ').remove();
						cafeJ();
					}

					if ( cafeteria == 2){
						$('.listaC').remove();
						cafeC();
					}

					if ( cafeteria == 3){
						$('.listaP').remove();
						cafeP();
					}
						
					
				});
			}

			$('#nuevoC').val('');
			$('#nuevoP').val('');
			$('#nuevaD').val('');
			$('#nuevoPrecio').val('');
		});


	let actualizarC = document.getElementById('submitA');
		actualizarC.addEventListener('click', (event) =>{
			event.preventDefault();
			let id = document.getElementById('viejoId').value;


			let url = "/cafeterias-api/actualizar-platillo/"+document.getElementById('viejoId').value;

			let cafeteria = document.getElementById('actualizarC').value;
			let platofuerte = document.getElementById('actualizarP').value;
			let descripcion = document.getElementById('actualizarD').value;
			let precio = document.getElementById('actualizarPrecio').value;

			let bodyJSON = {

				"cafeteria" : cafeteria,
				"platofuerte" : platofuerte,
				"descripcion" : descripcion,
				"precio" : precio
			}

			let settings = {
				method : "PUT",
				body : JSON.stringify(bodyJSON),
				headers:{
    				'Content-Type': 'application/json'
  				}
			}
			fetch(url, settings)
				.then((response)=>{
					if(response.ok){
						return response.text();
				}
					throw new Error(response.statusText);
				})

				.then((responseJSON)=>{
					
					if ( cafeteria == 1){
						$('.listaJ').remove();
						cafeJ();
					}

					if ( cafeteria == 2){
						$('.listaC').remove();
						cafeC();
					}

					if ( cafeteria == 3){
						$('.listaP').remove();
						cafeP();
					}
				});

			$('#actualizarC').val('');
			$('#actualizarP').val('');
			$('#actualizarD').val('');
			$('#actualizarPrecio').val('');
		});

		let comBorrar = document.getElementById('submitE');
		comBorrar.addEventListener('click', (event) =>{

				let cafeteria = document.getElementById('eliminarC').value;

				let url = "/cafeterias-api/remover-platillo/"+document.getElementById('eliminarId').value;
				let settings = {
					method : "DELETE",
				}
				fetch(url, settings)
					.then((response)=>{
						if(response.ok){
							return response.json();
					}

					throw new Error(response.statusText);
				})
				.then((responseJSON)=>{
					if ( cafeteria == 1){
						$('.listaJ').remove();
						cafeJ();
					}

					if ( cafeteria == 2){
						$('.listaC').remove();
						cafeC();
					}

					if ( cafeteria == 3){
						$('.listaP').remove();
						cafeP();
					}
				});

			$('#eliminarC').val('');
			$('#eliminarId').val('');
			
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



function displayResultsJ(responseJSON){

	let listaJ = document.getElementById('listaJ');
	console.log(responseJSON);

	for(let i=0; i<responseJSON.length; i++){

		listaJ.innerHTML += `
		<li class="listaJ">
		<h2> ${responseJSON[i].platofuerte} </h2>
		<p> ${responseJSON[i].descripcion} </p>
		<p> Precio : $ ${responseJSON[i].precio} MXN </p>
		<p> Codigo de Cafeteria : ${responseJSON[i].cafeteria} </p>
		<p> ID : ${responseJSON[i].id} </p>
		</li>
	`
	} 

	
}

function displayResultsC(responseJSON){

	let listaC = document.getElementById('listaC');
	console.log(responseJSON);

	for(let i=0; i<responseJSON.length; i++){

		listaC.innerHTML += `
		<li class="listaC">
		<h2> ${responseJSON[i].platofuerte} </h2>
		<p> ${responseJSON[i].descripcion} </p>
		<p> Precio : $ ${responseJSON[i].precio} MXN </p>
		<p> Codigo de Cafeteria : ${responseJSON[i].cafeteria} </p>
		<p> ID : ${responseJSON[i].id} </p>
		</li>
	`
	} 

	
}

function displayResultsP(responseJSON){

	let listaP = document.getElementById('listaP');
	console.log(responseJSON);

	for(let i=0; i<responseJSON.length; i++){

		listaP.innerHTML += `
		<li class="listaP">
		<h2> ${responseJSON[i].platofuerte} </h2>
		<p> ${responseJSON[i].descripcion} </p>
		<p> Precio : $ ${responseJSON[i].precio} MXN </p>
		<p> Codigo de Cafeteria : ${responseJSON[i].cafeteria} </p>
		<p> ID : ${responseJSON[i].id} </p>
		</li>
	`
	} 

	
}

function watchForm(){

	$('#jubileo').click(function(e){
		$('.botonesC').addClass("visibility");
		$('#menuJ').addClass("show");
		menuJ();

	});

	$('.atras').click(function(e){
		event.preventDefault();
		$('.botonesC').removeClass("visibility");
		$('.listaJ').remove();
		$('#menuJ').removeClass("show");
	});

	$('#centrales').click(function(e){
		$('.botonesC').addClass("visibility");
		$('#menuC').addClass("show");
		menuC();

	});

	$('.atras').click(function(e){
		event.preventDefault();
		$('.botonesC').removeClass("visibility");
		$('.listaC').remove();
		$('#menuC').removeClass("show");
	});

	$('#personal').click(function(e){
		$('.botonesC').addClass("visibility");
		$('#menuP').addClass("show");
		menuP();

	});

	$('.atras').click(function(e){
		event.preventDefault();
		$('.botonesC').removeClass("visibility");
		$('.listaP').remove();
		$('#menuP').removeClass("show");
	});

	watchForm2();
}



function init(){

	watchForm();
}


init();
