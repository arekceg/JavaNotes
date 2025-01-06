const values = ["CLICKED", "CLOCKED"];

$("p").each(function () {
  const paragraph = $(this);
  paragraph.data("index", 0);

  paragraph.click(() => {
    const index = parseInt(paragraph.data("index"));
    paragraph.text(values[index]);
    paragraph.css("color", values[index] === "CLICKED" ? "red" : "");
    paragraph.data("index", (index + 1) % values.length);
  });
});

$("#update-li").click(() => {
  // const listElement = document.querySelector("ul").lastElementChild;
  // const isClicked = listElement.dataset.clicked === "true";

  // listElement.style.fontSize = isClicked ? "1rem" : "100px";
  // listElement.innerHTML = isClicked ? "NOT CLICKED" : "CLICKED";
  // listElement.dataset.clicked = !isClicked;
  // listElement.css("color", "red");
  emphasizeLastElements();
  appendNewElement();

  function appendNewElement() {
    const newElement = $("<li>NEW ELEMENT</li>");
    newElement.addClass("removable");
    newElement.hide();
    $("ul:first").prepend(newElement);
    newElement.fadeIn("slow");
  }

  function emphasizeLastElements() {
    const listElement = $("ul li:last-child");
    const isClicked = listElement.data("clicked") === true;
    listElement.css("font-size", isClicked ? "1rem" : "100px");
    listElement.text(isClicked ? "CLICKED" : "NOT_CLICKED");
    listElement.data("clicked", !isClicked);
  }
});

$(document).on("mouseenter", ".removable", function () {
  $(this).fadeOut();
});

document.querySelector("li").style.fontSize = "50px";

$("li").click(function (e) {
  e.preventDefault();
  $(this).css("color", "blue");
  $(this).animate({ fontSize: "100px" }).animate({ fontSize: "1rem" });
});

$(document).keydown(function (e) {
  const header = $("h1");
  header.text(e.key);
  header.css("color", "black");
});

$("h1").mouseover(function () {
  $(this).css("color", "red");
  $(this).text("changing header");
});
