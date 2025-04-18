window.$ = window.jQuery = require('jquery');
const fishAudio = new Audio("assets/sounds/fish.mp3");
const stoneAudio = new Audio("assets/sounds/MA_Stockboom_Sweet UI Device_Select.wav");
const placeAudio = new Audio("assets/sounds/MA_Stockboom_Sweet UI Device_Button.wav");
const VillagerAudio = new Audio("assets/sounds/Villager_accept2.ogg");

$("#fish").mouseenter(function () {
    fishAudio.volume = 0.1;
    fishAudio.play();
});
$("#fish").mouseleave(function () {
    fishAudio.pause();
    fishAudio.currentTime = 0;
});




$(".squarebox").mouseenter(function () {
    stoneAudio.volume = 0.1;
    stoneAudio.play();
});
$(".squarebox").mouseleave(function () {
    stoneAudio.pause();
    stoneAudio.currentTime = 0;
});

$(".avatar").mouseenter(function () {
    VillagerAudio.volume = 0.1;
    VillagerAudio.play();
});
$(".avatar").mouseleave(function () {
    VillagerAudio.pause();
    VillagerAudio.currentTime = 0;
});

$("#footer_body").click(function () {
    navigator.clipboard.writeText(document.getElementById("footer_body").innerHTML)
    stoneAudio.volume = 0.1;
    stoneAudio.play();
});



