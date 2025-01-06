const colors = ["blue", "green", "red", "yellow"];
var colorSequence = [];
var currentStepIndex = 0;

$("body").keydown(() => {
  if (colorSequence.length === 0) {
    updateHeader("Good Luck");
    $("body").removeClass("game-over");
    triggerNextColor();
  }
});

$(document).on("click", ".btn.clickable", function () {
  pressButton($(this));
  const buttonColor = $(this).attr("id");
  const expectedColor = colorSequence[currentStepIndex];
  console.log(
    "Selected color: " + buttonColor + " | Expected color : " + expectedColor
  );
  if (expectedColor !== buttonColor) {
    fail();
    return;
  }
  if (currentStepIndex >= colorSequence.length - 1) {
    setTimeout(() => {
      currentStepIndex = 0;
      triggerNextColor();
    }, 500);
  }
  currentStepIndex++;

  function fail() {
    new Audio("./sounds/wrong.mp3").play();
    updateHeader("Fail! Press A key to restart");
    currentIndex = 0;
    colorSequence = [];
    $(".btn.clickable").removeClass("clickable");
    $("body").addClass("game-over");
  }
});

function updateHeader(msg) {
  $("h1").text(msg);
}

function triggerNextColor() {
  $(".btn.clickable").removeClass("clickable");
  let nextColor = getNextColor();
  colorSequence.push(nextColor);
  console.log(
    "New color: " +
      nextColor +
      " | Current colors : " +
      colorSequence.toString()
  );
  const button = $("." + nextColor);
  pressButton(button);
  $(".btn").addClass("clickable");

  function getNextColor() {
    let nextColor;
    do {
      nextColor = getRandomColor();
    } while (
      colorSequence.length >= 1 &&
      nextColor === colorSequence[colorSequence.length - 1]
    );
    return nextColor;

    function getRandomColor() {
      const index = Math.floor(Math.random() * colors.length);
      const color = colors[index];
      return color;
    }
  }
}

function pressButton(button) {
  button.addClass("pressed");
  playAudio(button.attr("id"));

  setTimeout(() => {
    button.removeClass("pressed");
  }, 100);

  function playAudio(nextColor) {
    const audioPath = "./sounds/" + nextColor + ".mp3";
    new Audio(audioPath).play();
  }
}
