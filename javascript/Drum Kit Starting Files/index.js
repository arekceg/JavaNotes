const drumSounds = {
  w: "./sounds/tom-1.mp3",
  a: "./sounds/tom-2.mp3",
  s: "./sounds/tom-3.mp3",
  d: "./sounds/tom-4.mp3",
  j: "./sounds/snare.mp3",
  k: "./sounds/crash.mp3",
  l: "./sounds/kick-bass.mp3",
  getSound: function (key) {
    return this[key];
  },
};

$(".set .drum").click(function () {
  playDrumSound($(this).text());
  animateDrum($(this));
});

$(document).keydown(function (event) {
  const pressedKey = event.key;
  playDrumSound(pressedKey);
  animateDrum($(".set .drum." + pressedKey));
});

function playDrumSound(drumChar) {
  const soundFile = drumSounds.getSound(drumChar);
  if (soundFile) {
    new Audio(soundFile).play();
  }
}

function animateDrum(drum) {
  drum.addClass("pressed");
  setTimeout(() => {
    drum.removeClass("pressed");
  }, 100);
}
