var elo_display = document.getElementById("elo");
var level_pic = document.getElementById("level-pic");
var copy_link_button = document.getElementById("copy-link");
var faceit_username = document.getElementById("faceit-nickname");
var border_radius = document.querySelector("[name='widget-border-radius']");
var background_color_picker = document.querySelector(
  "[name='widget-background-color']"
);
var text_color_picker = document.querySelector("[name='widget-text-color']");
var widget_background = document.getElementById("wrap");

function update_elo(username) {
  elo_display.innerText = "100";
  level_pic.src =
    "https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_1_svg.svg";
  var oReq = new XMLHttpRequest();
  oReq.open(
    "GET",
    "https://open.faceit.com/data/v4/players?nickname=" + username + "&game=cs2"
  );
  oReq.setRequestHeader("accept", "application/json");
  oReq.setRequestHeader(
    "Authorization",
    "Bearer 5dbe323f-3fb4-4bd6-8b9f-b5688d63ebee"
  );
  oReq.send();
  oReq.onload = function () {
    if (oReq.status == 404) {
      copy_link_button.setAttribute("disabled", true);
      copy_link_button.removeEventListener("click", get_widget_link);
      throw new Error("Couldn't find that player.");
    }
    elo = JSON.parse(oReq.responseText).games.cs2.faceit_elo;
    level_pic.src =
      "https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_" +
      JSON.parse(oReq.responseText).games.cs2.skill_level +
      "_svg.svg";
    elo_display.innerText = elo;
    copy_link_button.setAttribute("disabled", false);
    copy_link_button.addEventListener("click", get_widget_link, false);
    // TODO: MAKE IT POSSIBLE TO SHOW PROFILE PICTURE
    // console.log(JSON.parse(oReq.responseText).avatar);
  };
}

faceit_username.addEventListener("change", update_widget_info, false);
background_color_picker.addEventListener("input", update_widget_style, false);
text_color_picker.addEventListener("input", update_widget_style, false);
border_radius.addEventListener("input", update_widget_style, false);

function update_widget_info() {
  update_elo(faceit_username.value);
}

function update_widget_style() {
  widget_background.style.background = background_color_picker.value;
  widget_background.style.borderRadius = border_radius.value + "px";
  elo_display.style.color = text_color_picker.value;
}

function get_widget_link() {
  // navigator.clipboard.writeText(
  //   "https://jelolul.github.io/faceit-tracker/widget?user=" +
  //     faceit_username.value +
  //     "&game=cs2"
  // );
  var text_color_value = text_color_picker.value;
  var background_color_value = background_color_picker.value;
  var border_radius_value = border_radius.value;

  text_color_value = text_color_value.replace("#", "");
  background_color_value = background_color_value.replace("#", "");
  border_radius_value = border_radius_value + "px";

  navigator.clipboard.writeText(
    "http://127.0.0.1:3000/widget?user=" +
      faceit_username.value +
      "&game=cs2&background-color=" +
      background_color_value +
      "&text-color=" +
      text_color_value +
      "&border-radius=" +
      border_radius_value
  );
}
