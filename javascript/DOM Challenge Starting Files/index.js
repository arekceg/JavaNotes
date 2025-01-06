document.querySelector("li a").style.fontSize = "50px";

document.querySelector("button").addEventListener("click", function () {
  document.querySelector("h1").innerHTML= "<ul><li>This is a list now</li></ul>"
});

document.querySelector("#checkbox").addEventListener("change", function () {
  const button = document.querySelector("button");
  button.classList.toggle("invisible");
  document.querySelector("h1").classList.toggle("huge");
});
