function barrelCheck(ele,wich)
{
	console.log("for "+ document.getElementById(ele).id + " the filter " + wich.id + " is now " + wich.checked)
	if (wich.checked){document.getElementById(ele).style.filter = "url(#SphereMapTest) url(#contrast) url(#brightness) url(#colorfill)";}
	else {document.getElementById(ele).style.filter = "url(#contrast) url(#brightness) url(#colorfill)";}
}

function getRndInteger(min, max)
{//Shamelesly from https://www.w3schools.com/js/tryit.asp?filename=tryjs_random_function2
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var moveSlider = function(slider, direction) {
	var value = slider.value;
	var circle = document.getElementById("despMap");
	circle.setAttributeNS(null, "scale", value);
}
var moveSMT = function(slider, direction) {
	var value = slider.value;
	var circle = document.getElementById("SphereMapTest");
	circle.setAttributeNS(null, direction, value);
}
var moveRoot = function(slider, direction) {
	var value = slider.value;
	var circle = document.getElementById("svg-root");
	circle.setAttributeNS(null, direction, value);
}
var changeSource = function(vidURL) {
	var newVid = vidURL.value;
	document.getElementById("tubVid").src = newVid;
}

var brcon = function(slider,what) {
	var value = slider.value;

	var myId =what+"R";
	document.getElementById(myId).setAttributeNS(null, "slope", value);	
	myId =what+"G";
	document.getElementById(myId).setAttributeNS(null, "slope", value);	
	myId =what+"B";
	document.getElementById(myId).setAttributeNS(null, "slope", value);
	if(what == "con")
	{
		var myIntercept= -(0.5 * value) + 0.5;	
		myId =what+"R";
		document.getElementById(myId).setAttributeNS(null, "intercept", myIntercept);
		myId =what+"G";
		document.getElementById(myId).setAttributeNS(null, "intercept", myIntercept);
		myId =what+"B";
		document.getElementById(myId).setAttributeNS(null, "intercept", myIntercept);
	}
}
