
//#2c3e50
function hideloader(){
	var loader = document.getElementById('loader');
	//loader.style.display = 'none';
	loader.style.visibility = 'hidden';
}
function showarrow(){
	//var arrow = document.getElementById('arrow');
	var arrow = document.getElementById("arrow").getSVGDocument().getElementById("svg-arrow")
	arrow.style.visibility = 'visible'
}
function setcolour(){
	var arrow = document.getElementById("arrow").getSVGDocument().getElementById("svg-arrow")
	arrow.style.fill="white"
	arrow.style.opacity = 1.0
	arrow.style.visibility = 'visible'
}
function resetcolour(){
	var arrow = document.getElementById("arrow").getSVGDocument().getElementById("svg-arrow")
	arrow.style.fill="#2c3e50"
}

function cc(){
	alert('ARGBH!');
}

//setTimeout("hideloader()", 3000);
//$('#fountainG').delay(2000).fadeOut(400)
setTimeout("showarrow()", 4000);




//<script src="http://code.jquery.com/jquery-1.4.4.min.js" type="text/javascript"></script>