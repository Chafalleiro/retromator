/*<!-- BLUE COLOR
				0	0.15	0	0	0
				0	0.5	0	0	0
				0	1	1	0	0
				1	1	1	1	0 
 -->
<!-- YELLOW COLOR
				0	1	0	0	0
				0	1	0	0	0
				0	0	0	0	0
				0	0	0	1	0
 -->
<!-- GREEN COLOR
				0	0	0	0	0
				0	1	0	0	0
				0	0	0	0	0
				0	0	0	1	0
 --> 
 <!-- RED COLOR
				0	1	0	0	0
				0	0.25	0	0	0
				0	0.25	0	0	0
				0	1	0	1	0
 --> 
<!-- GRAY COLOR
				0	1	0	0	0
				0	1	0	0	0
				0	1	0	0	0
				1	1	0	1	0
 --> 
<!-- ORIGINAL COLOR
				1	0	0	0	0
				0	1	0	0	0
				0	0	1	0	0
				0	0	0	1	0
 -->
		*/
//Change the color of the selected feColorMatrix. Must have an id attribute.
var colorAnt = "originalC";

function setColor(wich, rootEl, color)
{
	var arrColors = {}
	arrColors['blueC'] = "0 0.15 0 0 0 0 0.5 0 0 0 0 1 1 0 0 1 1 1 1 0";
	arrColors['yellowC'] = "0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0";
	arrColors['greenC'] = "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0";
	arrColors['redC'] = "0 1 0 0 0 0 0.25 0 0 0 0 0.25 0 0 0 0 1 0 1 0";
	arrColors['grayC'] = "0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 1 0 1 0";
	arrColors['originalC'] = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0";

	var arrIcons = {}
	arrIcons['blueC'] = "img/favicon_blue.png";
	arrIcons['yellowC'] = "img/favicon_yel.png";
	arrIcons['greenC'] = "img/favicon_green.png";
	arrIcons['redC'] = "img/favicon_red.png";
	arrIcons['grayC'] = "img/favicon_gray.png";
	arrIcons['originalC'] = "img/vga.png";

	colorAnt = color;
	
	document.getElementById(wich).setAttribute("dur","0.75s");
	document.getElementById(wich).setAttribute("fill","freeze");
	document.getElementById(wich).setAttribute("begin","0s");
	document.getElementById(wich).setAttribute("repeatCount","1");
	
	var colrT = arrColors[colorAnt] + "; " + arrColors['grayC'] + "; " + arrColors[color];
	
	document.getElementById(wich).setAttribute("values",colrT);

	var animSVG = document.getElementById(rootEl);
	animSVG.setCurrentTime(0);

	document.head || (document.head = document.getElementsByTagName('head')[0]);
//https://gist.github.com/mathiasbynens/428626
	var link = document.createElement('link'),
		oldLink = document.getElementById('dynamic-favicon');
	link.id = 'dynamic-favicon';
	link.rel = 'shortcut icon';
	link.href = arrIcons[color];
	if (oldLink) {
		document.head.removeChild(oldLink);
	}
	document.head.appendChild(link);
}
//function getRndInteger(min, max)
function loadColor()
{
var arrCnames = ['blueC', 'yellowC', 'greenC', 'redC', 'grayC', 'originalC'];
setColor('colA','svg-root',arrCnames[getRndInteger(0, 5)]);
}