// Buttons for Main Menu
const popOpen = new Audio("assets/sounds/MA_Stockboom_Sweet UI Device_Open.wav");
popOpen.volume = 0.1;
const popBack = new Audio("assets/sounds/MA_Stockboom_Sweet UI Device_Close.wav");
popBack.volume = 0.1;

function loadInstall() {
    popOpen.play();
    document.getElementById("menu").style.display = "none";
    document.getElementById("run").style.display = "none";
    document.getElementById("console").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("plugins").style.display = "none";

    document.getElementById("maininfo").style.display = "block";
    document.getElementById("install").style.display = "block";

    //
    document.getElementById("MainHeading").innerHTML = "Install Server"
    document.getElementById("MainSub").innerHTML = "Fill Details And Install Your PowerFull Server!"

    document.getElementById("back").innerHTML = "Back To Menu"
}

function loadRun() {
    popOpen.play();
    document.getElementById("menu").style.display = "none";
    document.getElementById("install").style.display = "none";
    document.getElementById("console").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("plugins").style.display = "none";

    document.getElementById("maininfo").style.display = "block";
    document.getElementById("run").style.display = "block";

    document.getElementById("MainHeading").innerHTML = "Run Server"
    document.getElementById("MainSub").innerHTML = "Fill Details And Run Your PowerFull Server!"

    document.getElementById("back").innerHTML = "Back To Menu"
}

function loadConsole() {
    popOpen.play();
    document.getElementById("menu").style.display = "none";
    document.getElementById("install").style.display = "none";
    document.getElementById("run").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("plugins").style.display = "none";

    document.getElementById("maininfo").style.display = "block";
    document.getElementById("console").style.display = "block";

    document.getElementById("MainHeading").innerHTML = "Server Console"
    document.getElementById("MainSub").innerHTML = "Take Control Over Your PowerFull Server!"

    document.getElementById("back").innerHTML = "Back To Menu"
}

function loadSettings() {
    popOpen.play();
    document.getElementById("menu").style.display = "none";
    document.getElementById("install").style.display = "none";
    document.getElementById("run").style.display = "none";
    document.getElementById("console").style.display = "none";
    document.getElementById("plugins").style.display = "none";

    document.getElementById("maininfo").style.display = "block";
    document.getElementById("settings").style.display = "block";

    document.getElementById("MainHeading").innerHTML = "LocalMiner Settings"
    document.getElementById("MainSub").innerHTML = "Take Control Over LocalMiner Settings"

    document.getElementById("back").innerHTML = "Back To Menu"
}
function loadPlugin() {
    popOpen.play();
    document.getElementById("menu").style.display = "none";
    document.getElementById("install").style.display = "none";
    document.getElementById("run").style.display = "none";
    document.getElementById("console").style.display = "none";
    document.getElementById("settings").style.display = "none";

    document.getElementById("maininfo").style.display = "block";
    document.getElementById("plugins").style.display = "block";

    document.getElementById("MainHeading").innerHTML = "LocalMiner Plugins"
    document.getElementById("MainSub").innerHTML = "Take Control Over Server Plugins"

    document.getElementById("back").innerHTML = "Back To Menu"
}

function loadMenu() {
    popBack.play()
    document.getElementById("console").style.display = "none";
    document.getElementById("install").style.display = "none";
    document.getElementById("run").style.display = "none";
    document.getElementById("maininfo").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("plugins").style.display = "none";

    document.getElementById("menu").style.display = "block";
    document.getElementById("MainHeading").innerHTML = "Menu"

    document.getElementById("back").innerHTML = "LocalMiner"
}


// Increment And Decrement Button on Run Page

function incrementNumber() {
    placeAudio.pause();
    placeAudio.currentTime = 0;
    placeAudio.volume = 0.1;
    placeAudio.play();
    const numberInput = document.getElementById("numberInput");
    numberInput.value = parseInt(numberInput.value) + 1;
}

function decrementNumber() {
    placeAudio.pause();
    placeAudio.currentTime = 0;
    placeAudio.volume = 0.1;
    placeAudio.play();
    const numberInput = document.getElementById("numberInput");
    if (parseInt(numberInput.value) < 1 || parseInt(numberInput.value) == 1) {
        numberInput.value = 1
    } else {
        numberInput.value = parseInt(numberInput.value) - 1;
    }

}



