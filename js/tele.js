var vids = ["video/clickcoin_crt.mp4", "video/tokenblaster_crt.mp4", "video/flappyrocket_crt.mp4", "video/cryptonoid_crt.mp4", "video/coinmatch_crt.mp4", "video/cryptohamster_crt.mp4", "video/2048coins_crt.mp4", "video/coinflip_crt.mp4", "video/drhamster_crt.mp4","video/tokensurfer_crt.mp4", "video/lamborider_crt.mp4", "video/enterthechainers_crt.mp4"];

var ndxVid;
var vid = document.getElementById("myVideoPlayer");

vid.onloadedmetadata = function() {
  	vidDuration = this.duration;
};

var div_video = document.getElementById("vplayer");
var div_tele = document.getElementById("tele");
var tracker = document.getElementById("myTrack");
var trackerNum = document.getElementById("trackNum");

var vidDuration;
var vidTracking = false;

function openvideo(iv)
	{
	let div_led = document.getElementById("led");
	let div_play = document.getElementById("play");
	let div_pause = document.getElementById("pause");
	let div_rew = document.getElementById("rew");
	let div_ff	= document.getElementById("ff");
	let div_power = document.getElementById("power");
	let div_teleback = document.getElementById("teleback");
	let div_volStick = document.getElementById("volSticker");
	let div_volume = document.getElementById("volume");
	let div_track = document.getElementById("track");
	let div_trackNum = document.getElementById("trackNum");

	div_video.style.visibility = "visible";
	div_tele.style.visibility = "visible";
	div_teleback.style.visibility = "visible";
	div_menu.style.visibility = "hidden";
	
	div_video.style.position = "absolute";
	div_tele.style.position = "absolute";
	div_led.style.position = "absolute";
	div_play.style.position = "absolute";
	div_pause.style.position = "absolute";
	div_rew.style.position = "absolute";
	div_ff.style.position = "absolute";
	div_power.style.position = "absolute";
	div_volume.style.position = "absolute";
	div_volStick.style.position = "absolute";	
	div_track.style.position = "absolute";
	div_trackNum.style.position = "absolute";

	posTele();
	
	div_led.style.top = 648;
	div_led.style.left = 628;
	div_power.style.top = 592;
	div_power.style.left = 618;
	div_play.style.top = 632;
	div_play.style.left = 228;
	div_pause.style.top = 632;
	div_pause.style.left = 278;
	div_rew.style.top = 632;
	div_rew.style.left = 328;
	div_ff.style.top = 652;
	div_ff.style.left = 328;
	div_volume.style.top = 660;
	div_volume.style.left = 418;
	div_volStick.style.top = 645;
	div_volStick.style.left = 448;
	div_track.style.top = 628;
	div_track.style.left = 418;
	div_trackNum.style.top = 583;
	div_trackNum.style.left = 448;	

	
	document.getElementById("vidsrc").src = vids[iv];
	ndxVid = iv;
	vid.load();

	vid.onloadedmetadata = function() {
		vidDuration = this.duration;
	};			

	vid.play();

	document.getElementById("myVolume").value = vid.volume * 100;
	}

function closeVid() {
    vid.pause();
	div_menu.style.visibility = "visible";
	document.getElementById("vplayer").style.visibility = "hidden";
	document.getElementById("tele").style.visibility = "hidden";
	document.getElementById("teleback").style.visibility = "hidden";
}

function playVid() {
    vid.play();
}

function pauseVid() {
    vid.pause();
}
function ffVid() {
	console.log('ffVid');
    vid.pause();
	ndxVid = (ndxVid < (vids.length - 1)) ? ndxVid+1 : 0;
	document.getElementById("vidsrc").src = vids[ndxVid];
	vid.load();
	vid.onloadedmetadata = function() {
		vidDuration = this.duration;
	};			
	vid.play();
}

function rewVid() {
	console.log('rewVid');
    vid.pause();
	ndxVid = (ndxVid > 0) ? ndxVid-1 : vids.length - 1;
	document.getElementById("vidsrc").src = vids[ndxVid];
	vid.load();
	vid.onloadedmetadata = function()
	{
		vidDuration = this.duration;
	};			
	vid.play();
}

function volVid(val) {
    vid.volume = val/100;
}

function setTrackVid(val,state) {
	vid.pause();
	vidTracking = state;
	console.log("track time: " + val);
	vid.currentTime = val;
}

function posTele()
{
	div_video.style.top = ((window.innerHeight/2)-240) + "px";
	div_video.style.left = ((window.innerWidth/2)-320) + "px";

	div_tele.style.top = ((window.innerHeight/2)-300) + "px";
	div_tele.style.left = ((window.innerWidth/2)-345) + "px";
}

vid.addEventListener('timeupdate', function() {
	if(vidTracking === false)
	{
		tracker.max = vidDuration;
		tracker.value = vid.currentTime;
	}   
	trackerNum.innerText = new Date(1000 * vid.currentTime).toISOString().substr(11, 8);
});
