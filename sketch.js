const vp = document.querySelector('.video-container'),
  tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

let playlist = [
  "nvIUF4zTgmE", //live
  "D5X1vz7-lnI", //recorded video
  "w1BtU5tbii0", //live
  "IIqtuupvdWg", //recorded video
];

let playlistA = [
  "nvIUF4zTgmE", //live
  "D5X1vz7-lnI", //recorded video
  "w1BtU5tbii0", //live
  "IIqtuupvdWg", //recorded video
];

let playlistB = [
  "nvIUF4zTgmE", //live
  "D5X1vz7-lnI", //recorded video
  "w1BtU5tbii0", //live
  "IIqtuupvdWg", //recorded video
];

let timeout = 15; //in seconds
let timer;
let playhead = 0;
let duration;
let volume = 0;

let w = 980;
let h = 585;

let framerate = 30;

let debug = false;
let tablet = 1;

function setup() {
  //  w = displayWidth
  // h = displayHeight
  let params = getURLParams();
  if (params.tablet) {
    console.log(params.tablet);
    tablet = params.tablet;
  }
  
  playlist = playlistA;
  if (tablet == 2) {
    playlist = playlistB;
  }

  if (debug)
    console.log(w + "x" + h);
  let cnv = createCanvas(w, h);
  cnv.id("animation");
  cnv.parent("video-foreground");
  timer = timeout;
  frameRate(framerate);
  pixelDensity(1);
  // setTimeout(function(){ location.reload(true); }, 300000);
}

function draw() {
  background(0);
  // if (frameCount%30==0)
  // console.log(player.getCurrentTime());
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255, 0,0);
  // rect(0, 10, (1 - timer / timeout) * width, 10);
  rect(0, height - 10, (1 - timer / timeout) * width, 10);
  // text(int(timer), width/2, height/2);
  if (timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    timer -= 1.0 / framerate;
  }
  if (debug) {

    text(width + "x" + height, width / 2, height / 2);
    if (tablet == 1) {
      fill(255, 0, 0, 120);
    } else {
      fill(0, 255, 0, 120);
    }
    ellipse(width / 2, height / 2, 50, 50);

    fill(255, 120);
    rect(0, 0, width, height);
  }
}

function onYouTubeIframeAPIReady() {
  if (debug) {
    console.log("ready");
    console.log(w + "x" + h);
  }

  player = new YT.Player('player', {
    height: h,
    width: w,
    videoId: playlist[0],
    playerVars: {
      'version': 3,
      'controls': 0,
      'disablekb': 1,
      'enablejsapi': 1,
      'fs': 0,
      'modestbranding': 1,
      'autoplay': 1,
      'origin': 'https://late.art.br',
      'rel': 0
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
  timer = timeout;
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}