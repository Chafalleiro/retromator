/**
 *  @file slides.js
 *  @brief $(Scripts for a slide proyectos simulator)
 */
 
/*****************************************************************************
Function to get an array lenght.
*****************************************************************************/
function getLength(arr) {
    return Object.keys(arr).length;
}

/*****************************************************************************
Global vars
*****************************************************************************/
var img_count, imgLoaded, imgDirt, imgDamage = 0;
var sw_effects = [true,true];
var sw_on = false;
var countdown = 0;
var file_names = [];
var ses_names = [];
var files;
var imageType = /^image\//;
var sliEffects = document.createElement("AUDIO");
var sliTrack = document.createElement("AUDIO");
var sliFan = document.createElement("AUDIO");
var sliClicks = document.createElement("AUDIO");
	sliClicks.setAttribute("src","snd/boton.mp3");
var sliSwitch = document.createElement("AUDIO");
	sliSwitch.setAttribute("src","snd/switch.mp3");
var sliPow = document.createElement("AUDIO");
	sliPow.setAttribute("src","snd/switch_plastic.mp3");
var sldAct = document.getElementById("slideActive");
var sldDirt = document.getElementById("slideDirt");
var sldDmg = document.getElementById("slideDmg");
var prScrn = document.getElementById("prScreen");
var swtchs = document.getElementById("switches");
var sliNdx, cLoad = 0; //Slide index is global since is messy to put it in event functions
var where;
//************* Arrays with the images ****************************************
var mySlides = ["slides/alc_001.JPG", "slides/alc_002.JPG", "slides/alc_003.JPG", "slides/alc_004.JPG", "slides/alc_005.JPG", "slides/alc_006.JPG", "slides/alc_007.JPG", "slides/alc_008.JPG", "slides/alc_009.JPG", "slides/pony_1.jpg", "slides/pony_2.jpg", "slides/IMG_20170415_223034.jpg"];

var dirt = ["slides/dedazo1.png", "slides/dedazo2.png", "slides/dedazo3.png", "slides/dedazo4.png", "slides/dedazo5.png", "slides/dedazo6.png", "slides/dedazo7.png", "slides/pelo.png", "slides/pelo1.png", "slides/pelo2.png"];
var damage = ["slides/Texture1.png", "slides/Texture2.png", "slides/Texture3.png", "slides/Texture4.png", "slides/Texture6.png", "slides/Texture8.png", "slides/Texture9.png", "slides/Texture10.png", "slides/Texture11.png", "slides/Texture13.png", "slides/Texture15.png"];



//	console.trace(this);

var sliLen = getLength(mySlides);

//************* Load slide images ****************************************

var aniframes = [];  // Hold images.
var drtframes = [];  // Hold images.
var dmgframes = [];  // Hold images.

function imageLoads(arrImg,arrSrc,cnt)
{
	for(var i = 0; i < getLength(arrSrc); i++) {
		arrImg[i] = new Image();                 // Create an offscreen image
		arrImg[i].id = "image_" + i;
		arrImg[i].onload =  function() // Store image size and asociated data
		{
			cnt++; //For some reason mixes loading of cache and sources the first time doubling the count
		}
		arrImg[i].src = arrSrc[i];    // Tell it what URL to load
	}

}
imageLoads(aniframes,mySlides,imgLoaded);
imageLoads(drtframes,dirt,imgDirt);
imageLoads(dmgframes,damage,imgDamage);

//************* Adjuts images ****************************************
function calcSize(nH, nW, mH, mW){
	if(nH)
	{
	var cH = Math.trunc(mH * 0.65);
	var ratio = cH/nH;
	var cW = Math.trunc(nW*ratio);
	if (cW >= (mW*0.90))
	{
		cW = Math.trunc(mW*0.85);
		var ratio = cW/nW;
		var cH = Math.trunc(nH*ratio);
	}
	return {
        calcW: cW,
		calcH: cH
    };
	}
	else{console.log("No image")}
}
//************* Start Proyector ****************************************
function startProyector()
{
//************* Check if  images were loaded ****************************************
const itFrame = setInterval(frame, 100); // Suposedly check loaded images
function frame()
{
	if(sliLen > imgLoaded) //If sources array is greater than the number of loaded images, keep loading.
	{
		document.getElementById("slideActive").textContent  = "LOADING SLIDES..."
		cLoad = false;
	}
	else
	{
		(sliLen  == imgLoaded || imgLoaded == 2*sliLen)
		clearInterval(itFrame);
		//document.getElementById("slideActive").textContent = "";
		imgLoaded = sliLen; //For some reason mixes loading of cache and sources the first time doubling the count.
		cLoad = true;
		document.getElementById("controls").style.visibility = "visible";
		document.getElementById("slideCart").style.visibility = "visible";
		document.getElementById("switches").style.visibility = "visible";
		document.getElementById("controls").style.opacity = "100%";
		document.getElementById("slideCart").style.opacity = "100%";
		document.getElementById("switches").style.opacity = "100%";
		sw_on = true;
		showSlide(0);
	}
}
	document.getElementById("projector").style.visibility = "visible";
	document.getElementById("projector").style.opacity = "100%";

	sliFan.setAttribute("src","snd/encenderptoyectorvideo.mp3");
	sliFan.autoplay = true;
	
	sliTrack.setAttribute("src","snd/meterdiaposcaja.mp3");
	sliTrack.loop = true;
	sliTrack.autoplay = true;
	
	const myTimeout = setTimeout(function (){stopLoadingSound(sliTrack);}, 5000);

	const fanTimeout = setTimeout(function (){stopLoadingSoundAndStartOtherTrack(sliFan,"snd/ventiladorproyectorvideo.mp3");}, 150);
	
	sliEffects.setAttribute("src","snd/cambioDiapo.mp3");
	sliEffects.autoplay = false;

}
//************* Sound helpers ****************************************
function stopLoadingSound(sndToStop) {
  	sndToStop.pause();
}

function stopLoadingSoundAndStartOtherTrack(sndToStop, trackToLoad) {
  	sndToStop.pause();
	sndToStop.setAttribute("src",trackToLoad);
	sndToStop.autoplay = true;
	sndToStop.loop = true;
	sndToStop.load();
}
//************* Slides functions ****************************************
function showSlide(sli)
{
	sliNdx = sli;
	if(cLoad) //Suposedly all images are loaded
	{
		reposition();
	}
	else
	{
		console.log("LOADING STILL IN PROGRESS.");
	}
}
//************* Resize and reposition ****************************************
function reposition()
{
	if (sw_on)
	{
	prScrn.height = Math.trunc(window.innerHeight * 0.95); //Screen proyector sizes
	prScrn.width = Math.trunc(window.innerWidth * 0.75);
	scrnHRatio = prScrn.height / 900;  //Screen proyector scale

	sldAct.style.visibility = "visible";
	sldAct.style.backgroundImage  = "url('"+aniframes[sliNdx].src+"')";  //Load slide image

	//Slides sizes and positions
	sldAct.style.height = calcSize(aniframes[sliNdx].naturalHeight,aniframes[sliNdx].naturalWidth, prScrn.height, prScrn.width).calcH+"px";
	sldAct.style.width = calcSize(aniframes[sliNdx].naturalHeight,aniframes[sliNdx].naturalWidth, prScrn.height, prScrn.width).calcW+"px";
	sldAct.style.top = Math.trunc((prScrn.height - calcSize(aniframes[sliNdx].naturalHeight,aniframes[sliNdx].naturalWidth, prScrn.height, prScrn.width).calcH)/2);
	sldAct.style.left = Math.trunc((prScrn.width - calcSize(aniframes[sliNdx].naturalHeight,aniframes[sliNdx].naturalWidth, prScrn.height, prScrn.width).calcW)/2);

	document.getElementById("rectA").setAttribute("height",sldAct.style.height); //Clipping path sizing
	
	var clip_1 = document.getElementById("clippingArea");
	clip_1.setCurrentTime(0)

	var w = sldAct.style.width + ";0;";
	var mov_1 = document.getElementById("xClip");  //Clipping path positioning animation
	mov_1.setAttribute("dur","0.3s");
	mov_1.setAttribute("begin","0s");
	mov_1.setAttribute("values","0;0;");
	mov_1.setAttribute("repeatCount","1");
	
	w = "0;0;5;0;100;" + parseInt(sldAct.style.width) + ";"
	var mov_2 = document.getElementById("wClip");
	mov_2.setAttribute("dur","0.3s");
	mov_2.setAttribute("begin","0s");
	mov_2.setAttribute("values",w);
	mov_2.setAttribute("repeatCount","1"); 

	document.getElementById("opA").setAttribute("begin","0s");  //Blurring and opacity svg animations
	document.getElementById("opA").setAttribute("repeatCount","1");
	document.getElementById("opA").setAttribute("dur","0.55s");
	document.getElementById("opA").setAttribute("values","0 0;0 0.5; 0 0.5;0 0.8;");

	document.getElementById("blA").setAttribute("begin","0s");
	document.getElementById("blA").setAttribute("repeatCount","1");
	document.getElementById("blA").setAttribute("dur","0.75s");
	document.getElementById("blA").setAttribute("values","15;7;5;20;0;");
		
	var animSVG = document.getElementById("combini");
	animSVG.setCurrentTime(0); //Start the animation
	rndRes();
	}
}
//************* Move out the slide ****************************************
function moveOut(sender)
{
	
	blVal = 0;
	sldAct.addEventListener("transitionend", transEnd);
	where = sender.id
	sldAct.style.top = prScrn.style.top - 1;
	sldAct.style.left = -(parseInt(sldAct.style.width));
	var clip_1 = document.getElementById("clippingArea");

	var w = parseInt(sldAct.style.width) + ";0;";
	var mov_1 = document.getElementById("xClip");
	mov_1.setAttribute("values",w);
	
	var mov_2 = document.getElementById("wClip");
	mov_2.setAttribute("values",w);

	document.getElementById("opA").setAttribute("dur","0.55s");
	document.getElementById("blA").setAttribute("dur","0.75s");
	document.getElementById("blA").setAttribute("fill","freeze");
	document.getElementById("opA").setAttribute("values","0 0.8;0 0.3; 0 0;");
	document.getElementById("blA").setAttribute("values","15;7;5;20;0;");
		
	var animSVG = document.getElementById("combini");
	animSVG.setCurrentTime(0);
	clip_1.setCurrentTime(0);

	sliEffects.load();
	sliEffects.autoplay = true;

}
//************* Move in the slide ****************************************
function transEnd() {
	if(where == "ff")
	{
		document.getElementById("ffL").style.opacity = "1";
		document.getElementById("ffL").addEventListener("transitionend", ffEnd);
		sliNdx = (sliNdx < (imgLoaded - 1)) ? sliNdx+1 : 0;
	}
	else
	{
		document.getElementById("rwL").style.opacity = "1";
		document.getElementById("rwL").addEventListener("transitionend", rwEnd);
		sliNdx = (sliNdx > 0) ? sliNdx-1 : imgLoaded - 1;
	}
	sldAct.removeEventListener("transitionend", transEnd);
	reposition();
}
//************* Remote effects ****************************************
function rwEnd() {
	document.getElementById("rwL").style.opacity = "0";	
	document.getElementById("rwL").removeEventListener("transitionend", rwEnd);
}
function ffEnd() {
	document.getElementById("ffL").style.opacity = "0";	
	document.getElementById("ffL").removeEventListener("transitionend", ffEnd);
}

function hightlightme(item,action) {
	if(action === "on")
	{
	item.parentElement.style.opacity = "1";
	item.style.opacity = "1";
	item.style.visibility = "visible";
	}
	else
	{
	item.style.fill = "none";
	item.style.opacity = "0"
	}
}
//************* Add images to the slider cart ****************************************
function dodrop(event)
{
	var dt = event.dataTransfer;
	files = dt.files;
	var nBytes =	0;
	var count = files.length;
	var sOutput;
	var npf = 0;
	var answer = false;
	for (var i = 0; i < files.length; i++) {if (!imageType.test(files[i].type)) {npf++;}else{img_count++;file_names.push(files[i].name);}}
	countdown = img_count;
	output("\nTotal file Count: " + count + "\n" + "Non processable files: " + npf + "\n");

	for (var i = 0; i < files.length; i++)
	{
		if (imageType.test(files[i].type))
			{
			var reader = new FileReader();
			reader.onload = function(e){
				imgLoaded++;
				aniframes.push(new Image());				
				aniframes[imgLoaded - 1].src = e.target.result;
				};
			reader.readAsDataURL(files[i]);
			}
	}
}
function output(text) //Dump info about the files loaded
{
	document.getElementById("output").textContent += text;
	//dump(text);
}
//************* Control the blurring ****************************************

var sw_down = false;
var blVal = 0;
var mi;
function blurring(where)
{
	const itMouse = setInterval(mouseCheck, 10);
	mi = where.id;
	function mouseCheck()
	{
		if(sw_down)
		{
		if(mi == "bl"){blVal += 0.05;}
		else{blVal -= 0.05;}
		setBlur(blVal);
		}
		else
		{
			clearInterval(itMouse);
		}
	}
}
function setBlur(blVal)
{
	//It's not just changing the filter value, we need to alter the animations too.
	document.getElementById("blA").setAttribute("fill","remove");
}
function changeBlur(where)
{
	sw_down=true;
	document.getElementById("combini").setCurrentTime(0);
	blurring(where);
}
function stopBlur(where)
{
	sw_down=false;
}
//************* Random defects ****************************************
/*
function getRndInteger(min, max)
{//Shamelesly from https://www.w3schools.com/js/tryit.asp?filename=tryjs_random_function2
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
*/
function rndRes()
{
	sldDirt.style.visibility = "hidden";
	sldDmg.style.visibility = "hidden";
	
	if (getRndInteger(0, 10) === 5 ){rndBlur();}
	if ((getRndInteger(0, 10) === 5) && sw_effects[0]){rndDirt();}
	if ((getRndInteger(0, 10) === 5) && sw_effects[1]){rndDmg();}
}
//Random blur
function rndBlur()
{
	blVal = getRndInteger(0, 20);
	setBlur(blVal);
}
//Random dirt
function rndDirt()
{
	var drtNdx = getRndInteger(0, 9);
	var drtTra = getRndInteger(0, 359);
	var scale = Math.random() + 0.2;

	sldDirt.style.visibility = "visible";
	sldDirt.src = dirt[drtNdx];
	sldDirt.style.height = scale * sldDirt.naturalHeight;
	sldDirt.style.width = scale * sldDirt.naturalWidth;
	sldDirt.style.transform = "rotate(" + drtTra + "deg)";	
	sldDirt.style.top = sldAct.style.top + 50;
	sldDirt.style.left = sldAct.style.left + 10;

}
//Random damage
function rndDmg()
{
	var dmgNdx = getRndInteger(0, 10);

	sldDmg.style.visibility = "visible";
	sldDmg.src = damage[dmgNdx];
	sldDmg.style.height = sldAct.style.height;
	sldDmg.style.width = sldAct.style.width;
	sldDmg.style.top = 0;
	sldDmg.style.left = 0;
}
//Random Effect
function rndEff(which)
{
	console.log ("effect which " + which)
	sliClicks.load();
	sliClicks.autoplay = true;

	if(which === 0){rndDirt()}
	else{rndDmg();}
}

//Switch random effects
function swDmg(which)
{

	sliSwitch.load();
	sliSwitch.autoplay = true;
	var  effNam = ["slideDirt","slideDmg"];
	var swChng = document.getElementById("sw_"+which);
	
	if (sw_effects[which])
	{
		document.getElementById(effNam[which]).style.opacity = "0%";
		document.getElementById(effNam[which]).style.visibility = "hidden";		
		sw_effects[which] = false;
		swChng.src = "slides/switch_"+ which +"_a.png";
	}
	else
	{
		document.getElementById(effNam[which]).style.visibility = "visible";
		document.getElementById(effNam[which]).style.opacity = "100%";
		sw_effects[which] = true;
		swChng.src = "slides/switch_"+ which +"_b.png";
	}
}
//************* Switch off ****************************************
function powerOff()
{


	sliPow.load();
	sliPow.autoplay = true;
	sliFan.pause();
	sw_on = false;
	document.getElementById("powBut").src= "slides/switch_off.png";
	
	sldAct.style.visibility = "hidden";
	sldDmg.style.visibility = "hidden";
	sldDirt.style.visibility = "hidden";

	document.getElementById("projector").style.opacity = "0%";
	document.getElementById("controls").style.opacity = "0%";
	document.getElementById("slideCart").style.opacity = "0%";
	document.getElementById("switches").style.opacity = "0%";

	document.getElementById("controls").style.visibility = "hidden";
	document.getElementById("slideCart").style.visibility = "hidden";
	document.getElementById("switches").style.visibility = "hidden";
	document.getElementById("projector").style.visibility = "hidden";
	document.getElementById("projector").style.visibility = "hidden";
}