const shell = require('electron').shell;
'use strict';
const fs = require('fs');

function openad1() {
    shell.openExternal('https://ads.localm.eu.org/ads1.html');
}
function openad2() {
    shell.openExternal('https://ads.localm.eu.org/ads2.html');
}

function docs() {
    shell.openExternal('https://localminer.gitbook.io/localxdocs');
}

function discord() {
    shell.openExternal('https://github.com/LocalMiner/Installer/blob/main/discord.md');
}

function github() {
    shell.openExternal('https://github.com/localminer');
}

function donate() {
    shell.openExternal('https://ads.localm.eu.org/paywall.html?pa=sigmachad@ibl&am=99&ms=LocalMinerDonation');
}

function website() {
    shell.openExternal('https://localm.eu.org');
}




function login() {
    shell.openExternal('https://discord.com/api/oauth2/authorize?client_id=964384185802436648&redirect_uri=http%3A%2F%2Flogin.localm.eu.org%2Fauth%2Fdiscord&response_type=token&scope=identify%20guilds%20guilds.join%20guilds.members.read');
    myLoop()
    let CheckLoop = [
        ".",
        "..",
        "...",

        ".",
        "..",
        "...",

        ".",
        "..",
        "...",

        ".",
        "..",
        "...",
    ]
    let i = 0;

    function myLoop() {

        setTimeout(function () {
            document.getElementById("text02").innerHTML = `Waiting for login `+ CheckLoop[i];
            i++;
            if (i < 12) {
                myLoop();
            }
            if (i == 12) {
                i = 0;
                myLoop();
            }
        }, 1000)
    }
}

function openfiles(x){
    shell.openPath(`${x}`)
}