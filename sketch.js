const vp = document.querySelector('.video-container'),
  tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

let playlist = [
  "FGc8x9uP67A", //live
  "D5X1vz7-lnI", //recorded video
  "V9T9i8Pi0P8", //live
  "dS1S7LMeEFU", //recorded video
]

let timeout = 10; //in seconds
let timer;

let playhead = 0;
let duration;
let volume = 90;



let w = 640;
let h = 360;

function setup() {
  let cnv = createCanvas(w, h);
  cnv.id("animation");
  cnv.parent("video-foreground");
  timer = timeout;
}

function draw() {
  background(0);
  // if (frameCount%30==0)
  // console.log(player.getCurrentTime());
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
  rect(0,0,timer/timeout*width,10);
  text(int(timer), width/2, height/2);
  if ( timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer -= 1/60;
  } 
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: h,
    width: w,
    videoId: playlist[0],
    playerVars: {
      'version': 3,
      'controls': false,
      // 'start': 0,
      // 'end': 10,
      'modestbranding': 1,
      'autoplay': 1
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(e) {
  e.target.mute();
  e.target.playVideo();
  // e.target.unMute();
  // e.target.setVolume(volume);
  duration = e.target.getDuration();
  setTimeout(updateDisplay.bind(this, e), 1000);
  setTimeout(loopVideo, timeout * 1000);
}

function updateDisplay(e) {
  vp.style.display = 'block';
}


function loopVideo() {
  // console.log(player.getCurrentTime());
  setTimeout(loopVideo, timeout * 1000);
  // console.log(player.getPlayerState());
  //   getPlayerState():Number
  // Returns the state of the player. Possible values are:
  // -1 – unstarted
  // 0 – ended
  // 1 – playing
  // 2 – paused
  // 3 – buffering
  // 5 – video cued

  playhead++;
  let nextVideoId = playlist[playhead % playlist.length];
  player.loadVideoById(nextVideoId);
  console.log(nextVideoId);
  timer = timeout;
}

function touchStarted() {
  console.log("Touch");
  fill(255,0,0);
  player.unMute();
  player.setVolume(volume);
}


