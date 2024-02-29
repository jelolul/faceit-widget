const url = new URLSearchParams(window.location.search);
const nickname = url.get("user");

var elodisplay = document.getElementById("elo");
var levelpic = document.getElementById("levelpic");

updateelo();
setInterval(updateelo, 20000);
function updateelo() {
  var oReq = new XMLHttpRequest();
  oReq.open(
    "GET",
    "https://open.faceit.com/data/v4/players?nickname=jelolul" + "&game=cs2"
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
