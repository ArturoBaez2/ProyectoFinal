function init(){
	myVar = setTimeout(showPage1,3000);
}

function showPage1(){
	$("#loader1")[0].style.display = "none";
  	$("#myDiv1")[0].style.display = "block";
  	$("#loader2")[0].style.display = "block";
    $("#terminando")[0].style.background = "yellow";
  	myVar = setTimeout(showPage2,3000);
}

function showPage2(){
	$("#loader2")[0].style.display = "none";
  	$("#myDiv2")[0].style.display = "block";
  	$("#loader3")[0].style.display = "block";
  	myVar = setTimeout(showPage3,3000);
}

function showPage3(){
	$("#loader3")[0].style.display = "none";
  $("#listo")[0].style.background = "#10FC0C";
  	$("#myDiv3")[0].style.display = "block";
}

$(init());