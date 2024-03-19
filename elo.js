const url = new URLSearchParams(window.location.search);
const nickname = url.get("user");
const game = url.get("game");
const background_color = url.get("background-color");
const text_color = url.get("text-color");
const border_radius = url.get("border-radius");

var elodisplay = document.getElementById("elo");
var levelpic = document.getElementById("level-pic");
var widget = document.getElementById("wrap");

widget.style.background = "#" + background_color;
widget.style.borderRadius = border_radius;
elodisplay.style.color = "#" + text_color;

updateelo();
setInterval(updateelo, 20000);
function updateelo() {
  var oReq = new XMLHttpRequest();
  oReq.open(
    "GET",
    "https://open.faceit.com/data/v4/players?nickname=" +
      nickname +
      "&game=" +
      game
  );
  oReq.setRequestHeader("accept", "application/json");
  oReq.setRequestHeader(
    "Authorization",
    "Bearer 5dbe323f-3fb4-4bd6-8b9f-b5688d63ebee"
  );
  oReq.send();
  oReq.onload = function () {
    elo = JSON.parse(oReq.responseText).games.cs2.faceit_elo;
    levelpic.src =
      "https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_" +
      JSON.parse(oReq.responseText).games.cs2.skill_level +
      "_svg.svg";
    elodisplay.innerText = elo;
  };
}
