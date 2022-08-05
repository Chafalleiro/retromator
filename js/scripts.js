var div_menu = document.getElementById("menu");
var div_content = document.getElementById("content");

startTime();

function showWin(wich,vis)
{
	document.getElementById(wich).style.visibility = vis;
	posWindows();
}

function posWindows()
{
	elem = document.getElementsByClassName("windows");
	for (let i = 0; i < elem.length; i++)
	{
		elem[i].style.top = 100;
		elem[i].style.left = 50;
		elem[i].style.width = 	(window.innerWidth - 200)+"px";
		
		if(elem[i].scrollHeight >= elem[i].offsetHeight && elem[i].offsetHeight < window.innerHeight)
		{
			elem[i].style.height = "10px";
			while(elem[i].scrollHeight >= elem[i].offsetHeight)
			{
				elem[i].style.height = (parseInt(elem[i].style.height) + 10) + "px";
			}
		}
		if (elem[i].offsetHeight >= window.innerHeight)
		{
			elem[i].style.height = (window.innerHeight - 175)  + "px";
		}		
	}
}

function locateBox(elem,mTop,mLeft)
{
	document.getElementById(elem).style.top = mTop + "px";
	document.getElementById(elem).style.left = mLeft + "px";
}

function resizeBox(elem,mTop,mLeft,mBottom,mRight)
{
	locateBox(elem,mTop,mLeft);
	document.getElementById(elem).style.height = (window.innerHeight - mBottom)+"px";
	document.getElementById(elem).style.width = (window.innerWidth - mRight)+"px";
}

function startTime() {
  const today = new Date();
  let y = today.getFullYear();
  let M = today.getUTCMonth() + 1;
  let d = today.getDate();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  M = checkTime(M);
  d = checkTime(d);
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock').innerHTML =  y + "/" + M + "/" + d + " " + h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
