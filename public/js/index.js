var token;
var usuario;

//module.exports = { passToken };
//export let token;
function fetchNews(){
  url ="https://newsapi.org/v2/top-headlines?q=movies&apiKey=dc391d8a09a64390a2cb92c59d79825c"
  $.ajax({
    url : url,
    method : "GET",
    dataType : "json",
    success : function( responseJSON ){
      //console.log(responseJSON);
      newsShow(responseJSON);
    },
    error : function( err ){
      console.log( err );
    }
  });
}

function newsShow(responseJSON){
  $('.homeNewsul')[0].innerHTML +=`
    <li class="listaN">
    <fieldset>
    <h2> ${responseJSON.articles[0].title} </h2>
    <p> ${responseJSON.articles[0].description} </p>
    <img src="${responseJSON.articles[0].urlToImage}" alt="Imagen de noticia" class="imagenews"/>

    </fieldset>
    </li>
  `;

   $('.homeNewsul')[0].innerHTML +=`
    <li class="listaN">
    <fieldset>
    <h2> ${responseJSON.articles[1].title} </h2>
    <p> ${responseJSON.articles[1].description} </p>
    <img src="${responseJSON.articles[1].urlToImage}" alt="Imagen de noticia" class="imagenews"/>
    </fieldset>
    </li>
  `;
}

function openTab(event,content){
	var i, tabcontent, tablinks;
	//console.log(content);
  tabcontent = $(".tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = $(".tablinks");
  //console.log(tablinks);
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  //console.log(`'#${content}'`);
  //let lol = $(`#${content}`);
  //console.log(lol);
  $(`#${content}`)[0].style.display = "block";
  event.currentTarget.className += " active";
}

function watchForm(){
  
  fetchNews();


  $('#signupForm').submit( (event) => {
    event.preventDefault();
    
    let mail = $(event.target).find('#signupMail').val();
    let password = $(event.target).find('#signupPassword').val();
    let name = $(event.target).find('#signupName').val();
    
    //console.log(mail);
    //console.log(password);
    //console.log(name);
    
    userSignup( mail, name, password );

    $(event.target).find('#signupMail')[0].value='';
    $(event.target).find('#signupPassword')[0].value='';
    $(event.target).find('#signupName')[0].value='';
    
  });

  $('#loginForm').submit( (event) => {
    event.preventDefault();
    
    let mail = $(event.target).find('#loginMail').val();
    let password = $(event.target).find('#loginPassword').val();
    
    //console.log(mail);
    //console.log(password);
    
    userLogin( mail, password );

    $(event.target).find('#loginMail')[0].value='';
    $(event.target).find('#loginPassword')[0].value='';

  });

  $('#ordenar').on('click', (event) => {
    //validate();
    if( usuario == true){
        window.location.href = "admin.html";
        console.log(token);
      } else{
        window.location.href = "usuario.html";
        console.log(token);
      }
    //console.log(usuario);
  });
}

function userLogin(mailS,passwordS){
  url = "http://localhost:8080/cafeterias-api/usuarioLogin";
  //console.log(mailS);
  //console.log(passwordS);
  $.ajax({
    url : url,
    method : "POST",
    dataType : "json",
    headers : {
      "Content-Type" : "application/json"
    },
    data : JSON.stringify( 
      { mail : mailS, 
      password : passwordS } 
      ),
    success : function( responseJSON ){
      //console.log(responseJSON);
      getToken(responseJSON);

    },
    error : function( err ){
      console.log( err );
    }
  });
}

function userSignup(mailS, nameS, passwordS){
  url = "http://localhost:8080/cafeterias-api/usuarioSignup";
  //console.log(mailS);
  //console.log(nameS);
  //console.log(passwordS);

  $.ajax({
    url : url,
    method : "POST",
    dataType : "json",
    headers : {
      "Content-Type" : "application/json"
    },
    data : JSON.stringify( 
      { mail : mailS, 
        nombre: nameS, 
        password : passwordS } ),
    success : function( responseJSON ){
      console.log(responseJSON);
    },
    error : function( err ){
      console.log( err );
    }
  });
}

function getToken(newToken){
  token = newToken;
  usuario = newToken.admin;
  console.log(usuario);

  $('#order')[0].style.visibility = "visible" ;
  //console.log(token);
}

function passToken(token){
  return token;
}

function validate(){
  url = "http://localhost:8080/cafeterias-api/validate";
  $.ajax({
    url : url,
    method : "POST",
    dataType : "json",
    headers : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer "+ token.token
    },
    body : JSON.stringify({ mensaje : "Hola?"}),
    success : function( responseJSON ){
      console.log(responseJSON);
      usuario = responseJSON.admin;
      console.log(usuario);
      if( usuario == true){
        window.location.href = "admin.html";
        console.log(token);
      } else{
        window.location.href = "usuario.html";
        console.log(token);
      }

    },
    error : function( err ){
      console.log( err );
    }
  });
}

function init(){

	watchForm();
}



$( init() );