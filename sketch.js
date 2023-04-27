const vp = document.querySelector('.video-container'),
  tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

let playlist = [
  "M8td2qd49Wk", //live
  "D5X1vz7-lnI", //recorded video
  "V9T9i8Pi0P8", //live
  "D5X1vz7-lnI", //recorded video
]

let timeout = 10; //in seconds

let playhead = 0;
let duration;
let volume = 0;

let timer = 10;
let divisions = 10;

let w = 640;
let h = 360;

function setup() {
  let cnv = createCanvas(w, h);
  cnv.id("animation");
  cnv.parent("video-foreground");
  divisions = width/timer;
}

function draw() {
  background(0);
  // if (frameCount%30==0)
  // console.log(player.getCurrentTime());
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
  rect(0,0,divisions*timer,10);
  text(timer, width/2, height/2);
  if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer --;
  }
  
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: h,
    width: w,
    videoId: playlist[0],
    playerVars: {
      'version': 3,
      'controls': 1,
      // 'start': 0,
      // 'end': 10,
      'modestbranding': 1
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(e) {
  e.target.playVideo();
  e.target.setVolume(volume);
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
  timer = 10;
}
