document.getElementById("reroll").addEventListener("click", () => {
  function getDiceImage(rolledNumber) {
    return "./images/dice" + rolledNumber + ".png";
  }

  function roll() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function updateWinner(winnerNumber) {
    const winneNotificator = document.querySelector("h1");
    winneNotificator.textContent = "Player" + winnerNumber + " won!";
  }

  function setDraw() {
    document.querySelector("h1").textContent = "Draw!";
  }

  var firstRoll = roll();
  var secondRoll = roll();
  var firstDice = getDiceImage(firstRoll);
  var secondDice = getDiceImage(secondRoll);
  document.querySelector(".img1").setAttribute("src", firstDice);
  document.querySelector(".img2").setAttribute("src", secondDice);
  firstRoll > secondRoll
    ? updateWinner(1)
    : firstRoll < secondRoll
    ? updateWinner(2)
    : setDraw();
});
