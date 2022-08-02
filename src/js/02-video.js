import throttle from 'lodash.throttle';

const iframe = document.querySelector("iframe");
const player = new Vimeo.Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

getCurrentTimeFn();

player.on("play", function () {
  console.log("played the video!");
});

player.getVideoTitle().then(function (title) {
  console.log("title:", title);
});

player.on("timeupdate", throttle(onCurrentTime, 1000));

function onCurrentTime(event) {
  localStorage.setItem(STORAGE_KEY, event.seconds);
}

function getCurrentTimeFn() {
  if (localStorage.getItem(STORAGE_KEY)) {
    player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
  }
}