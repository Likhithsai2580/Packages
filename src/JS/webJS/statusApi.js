let text = "aHR0cHM6Ly9hcGkubWNzdGF0dXMuaW8vdjIvc3RhdHVzL2phdmEvaHlwaXhlbC5uZXQ";
let decoded = window.atob(text);
async function Midnight() {
    // let data = await (await fetch(`https://wtfismyip.com/json`)).json();
    let online = Intl.DateTimeFormat().resolvedOptions().timeZone
    document.getElementById("country").innerText = online
}
async function Garv() {
    let data = await (await fetch(`${decoded}`)).json();
    let online = data.players.online;
    online = parseInt(online / 10) + Math.floor(Math.random() * 90) + 10
    document.getElementById("odometer").innerText = online
}

setInterval(async function () {
    let data = await (await fetch(`${decoded}`)).json();
    let online = data.players.online;
    online = parseInt(online / 10) + Math.floor(Math.random() * 90) + 10
    document.getElementById("odometer").innerText = online
}, 60000)

Garv() // Best Dost
Midnight() // Best Admin