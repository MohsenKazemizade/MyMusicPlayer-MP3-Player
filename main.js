var MusicPlayer = (() => {
  var currentTrack = 0;
  var isPlaying = false;
  var audio = new Audio();
  var tracks = [
    {
      title: "Another Love",
      artist: "Tom Odell",
      src: "./tracks/Tom_Odell_Another_Love.mp3",
      poster: "images/TomOdell-anotherloveposter.jpeg",
    },
    {
      title: "Daylight",
      artist: "David Kushner",
      src: "./tracks/David Kushner - Daylight.mp3",
      poster: "images/david kushner - daylight poster.jpg",
    },
    {
      title: "Goodbye (Epic Cover)",
      artist: "ARCANE feat. SORAH",
      src: "./tracks/ARCANE_ Goodbye _ EPIC COVER.mp3",
      poster: "images/ARCANE-goodbye poster.jpg",
    },
    {
      title: "Summertime Sadness (Slowed)",
      artist: "Lana Del Rey",
      src: "./tracks/lana_del_rey_summertime_sadness.mp3",
      poster: "images/lana del rey-summertime sadness poster.jpg",
    },
    {
      title: "The Search",
      artist: "NF",
      src: "./tracks/NF - The Search.mp3",
      poster: "images/NF-The Search poster.jpg",
    },
    {
      title: "Enemy",
      artist: "Imagine Dragons",
      src: "./tracks/Imagine Dragons - Enemy.mp3",
      poster: "images/imagine dragons- enemy poster.jpg",
    },
    {
      title: "Hymn for the Weekend",
      artist: "Coldplay",
      src: "./tracks/Coldplay - Hymn For The Weekend.mp3",
      poster: "images/coldplay- Hymn for the weekend poster.jpg",
    },
    {
      title: "U-Turn (Lili)",
      artist: "AaRON",
      src: "./tracks/AaRON - U-Turn Lili.mp3",
      poster: "images/aaron-u-turn-Lili track poster.jpg",
    },
  ];
  var progressFilledDIV = document.querySelector(".progress-filled");
  var progressBarDIV = document.querySelector(".progress-bar");
  var poster = document.getElementById("poster");
  var loadTrack = function (index) {
    audio.src = tracks[index].src;
    poster.src = tracks[index].poster;
    audio.load();
  };

  function playPauseTrack() {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    isPlaying = !isPlaying;
    return isPlaying;
  }

  function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    if (isPlaying) audio.play();
  }

  function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    if (isPlaying) audio.play();
  }

  function updateprogressFilled() {
    var progress = (audio.currentTime / audio.duration) * 100 || 0;
    progressFilledDIV.style.width = progress + "%";
  }

  function watchTrack(e) {
    var width = progressBarDIV.offsetWidth;
    var offsetX = e.offsetX;
    var duration = audio.duration;
    audio.currentTime = (offsetX / width) * duration;
  }

  progressBarDIV.addEventListener("click", watchTrack);
  audio.addEventListener("timeupdate", updateprogressFilled);

  return {
    init: function () {
      loadTrack(currentTrack);
    },
    playPauseTrack,
    prevTrack,
    nextTrack,
  };
})();

MusicPlayer.init();

var playButton = document.getElementById("play");
var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");

playButton.addEventListener("click", function () {
  var isPlaying = MusicPlayer.playPauseTrack();
  playButton.classList.toggle("active", isPlaying);
});
prevButton.addEventListener("click", MusicPlayer.prevTrack);
nextButton.addEventListener("click", MusicPlayer.nextTrack);
