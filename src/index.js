const {app,BrowserWindow,ipcMain} = require('electron')
const path = require('node:path');
const electronLocalshortcut = require('electron-localshortcut');
const fs = require('fs');
const DiscordRPC = require('discord-rpc')
const fetch = require('node-fetch')
const {
  download
} = require("electron-dl");

let window
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('localm', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('localm');
}


app.on('ready', () => {
  window = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1180,
    height: 768,
    minWidth: 1170,
    minHeight: 768,
    title: "LocalMiner",
    icon: __dirname + '\\logo.ico',
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    frame: false,
    titleBarOverlay: {
      color: "#1f2937a4",
      symbolColor: "#fff",
    },
    webPreferences: {
      // devTools: false,
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    }
  })
  window.loadURL('file://' + __dirname + '/login.html');
  try {
    ipcMain.on("download", (event, info) => {
      console.log(info);
      info.properties.onProgress = status => window.webContents.send("download progress", status);
      download(BrowserWindow.getFocusedWindow(), info.url, info.properties)
        .then(dl => window.webContents.send("download complete", dl.getSavePath()));
    });
  } catch (error) {
    console.log(error)
  }
  



  // NEW SHORTCUTS
  electronLocalshortcut.register(window, 'Ctrl+Shift+K', () => {
    window.loadURL('file://' + __dirname + '/app.html');
  });


})

const getTheLock = app.requestSingleInstanceLock();

if (!getTheLock) {
  app.quit()
} else {
  app.on('second-instance', (_event, argv, _workingDirectory) => {
    if (window) {
      const deeplinkingUrl = argv.find((arg) =>
        arg.startsWith('localm://')
      );

      const token = deeplinkingUrl.replace('localm://', '');
      if (window.isMinimized()) window.restore()
      window.focus()
      if (token.includes("mascot")) {
        SaveLocalFile("v");
        window.loadURL('file://' + __dirname + '/app.html');
      }
      if (token.includes("suhani")) {
        SaveLocalFile("n");
        window.loadURL('file://' + __dirname + '/app.html');
      }
      // localm://suhani/date/id/avatar/bashName >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      function SaveLocalFile(x) {
        let yourfuckingtime = `${token.split("/")[1]} ${x}`;
        let yourfuckingid = `${token.split("/")[2]}`
        let yourfuckingavatar = `${token.split("/")[3]}`
        let yourfuckingusername = `${token.split("/")[4]}`
        let lastfuckingchange = new Date();
        yourfuckingtime = btoa(yourfuckingtime)
        yourfuckingtime = btoa(yourfuckingtime)
        yourfuckingtime = btoa(yourfuckingtime)



        let localx = {
          "lastchange": lastfuckingchange,
          "time": yourfuckingtime,
          "id": yourfuckingid,
          "avatar": yourfuckingavatar,
          "username": yourfuckingusername,
        }

        storeLocalxLocation = __dirname
        storeLocalxLocation = storeLocalxLocation.split('LocalMiner')[0]
        storeLocalxLocation = storeLocalxLocation.replace('file:///', '')
        storeLocalxLocation = storeLocalxLocation.replaceAll('/', '//') + "LocalMiner//mainPs.localx"
        fs.writeFileSync(`${storeLocalxLocation}`, JSON.stringify(localx), 'utf-8', function (err) {
          if (err) throw err;
          console.log('Localx File created Successfully');
        });

        fs.writeFileSync(`${storeLocalxLocation}`, JSON.stringify(localx), 'utf-8', function (err) {
          if (err) throw err;
          console.log('Localx File created Successfully');
        });
      }


    }
  })
}


app.setAsDefaultProtocolClient('localm');

app.on('open-url', function (event, url) {
  // event.preventDefault()
  // deeplinkingUrl = url
})

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//D I S C O R D   R P C 

async function FetchStatus() {
  const status = await fetch('https://cdn.localm.eu.org/api/RPC.json');
  const data = await status.json();
  return data;
}

const clientId = '964384185802436648';

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({
  transport: 'ipc'
});
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !window) {
    return;
  }

  try {
  const gameid = await window.webContents.executeJavaScript('document.getElementById("MainHeading").innerHTML');
  let Showip = await window.webContents.executeJavaScript('document.getElementById("Showip").value;');
  let ipadd = await window.webContents.executeJavaScript('document.getElementById("display3").innerHTML;');


  // console.log(gameid,Showip,ipadd)
  var d = await FetchStatus();
  var healer = d.Status;
  var title = d.Title;
  var largetext = d.largeImageText;

  var smalltext = d.smallImageText;
  var blabel = d.button;


  // console.log(healer)
  let babel1 = [{
    "label": "Play With Me!",
    "url": `https://mcsrvstat.us/server/${encodeURIComponent(ipadd)}`
  }, {
    "label": "Host Now!",
    "url": "https://healerop.gumroad.com/l/localm-win"
  }]
  if (gameid.includes("Install") && Showip == "false") {
    rpc.setActivity({
      details: title,
      state: 'Installing Server ⬇️',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/209cc810-a432-4c94-8afe-1d9915322cca.gif?raw=true',
      smallImageText: smalltext,
      buttons: blabel,
      instance: false,
    });
  } else if (gameid.includes("Install") && Showip == "true") {
    rpc.setActivity({
      details: title,
      state: 'Installing Server ⬇️',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/209cc810-a432-4c94-8afe-1d9915322cca.gif?raw=true',
      smallImageText: smalltext,
      buttons: babel,
      instance: false,
    });
  }else if (gameid.includes("Plugins") && Showip == "true") {
    rpc.setActivity({
      details: title,
      state: 'Installing Plugins ⬇️',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/209cc810-a432-4c94-8afe-1d9915322cca.gif?raw=true',
      smallImageText: smalltext,
      buttons: babel1,
      instance: false,
    });
  }else if (gameid.includes("Plugins") && Showip == "false") {
    rpc.setActivity({
      details: title,
      state: 'Installing Plugins ⬇️',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/209cc810-a432-4c94-8afe-1d9915322cca.gif?raw=true',
      smallImageText: smalltext,
      buttons: babel,
      instance: false,
    });
  } else if (gameid.includes("Run") && Showip == "false") {
    rpc.setActivity({
      details: title,
      state: 'Booting Server 📶',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/d5bd0a9b-b545-4928-bfc3-1bf1b84a184b.gif?raw=true',
      smallImageText: smalltext,
      buttons: blabel,
      instance: false,
    });
  } else if (gameid.includes("Run") && Showip == "true") {
    rpc.setActivity({
      details: title,
      state: 'Booting Server 📶',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/d5bd0a9b-b545-4928-bfc3-1bf1b84a184b.gif?raw=true',
      smallImageText: smalltext,
      buttons: babel1,
      instance: false,
    });
  } else if (gameid.includes("Settings") && Showip == "false") {
    rpc.setActivity({
      details: title,
      state: 'Changing Settings ⚙️',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/a3b23c33-d4be-4c82-8faf-15a1dfde49fe.gif?raw=true',
      smallImageText: smalltext,
      buttons: blabel,
      instance: false,
    });
  } else if (gameid.includes("Settings") && Showip == "true") {
    rpc.setActivity({
      details: title,
      state: 'Changing Settings ⚙️',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/a3b23c33-d4be-4c82-8faf-15a1dfde49fe.gif?raw=true',
      smallImageText: smalltext,
      buttons: babel1,
      instance: false,
    });
  } else if (gameid.includes("Console") && Showip == "false") {
    rpc.setActivity({
      details: title,
      state: 'Checking Console 📝',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/1261-hackerbongocat.gif?raw=true',
      smallImageText: smalltext,
      buttons: blabel,
      instance: false,
    });
  } else if (gameid.includes("Console") && Showip == "true") {

    rpc.setActivity({
      details: title,
      state: 'Checking Console 📝',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/1261-hackerbongocat.gif?raw=true',
      smallImageText: smalltext,
      buttons: babel1,
      instance: false,
    });
  } else if (gameid.includes("Menu") && Showip == "true") {
    rpc.setActivity({
      details: title,
      state: 'Watching Main Menu',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/a52ae49c-d06a-4341-ae0e-2d38e14e286a.gif?raw=true',
      smallImageText: smalltext,
      buttons: babel1,
      instance: false,
    });
  } else if (gameid.includes("Menu") && Showip == "false") {
    rpc.setActivity({
      details: title,
      state: 'Watching Main Menu',
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/a52ae49c-d06a-4341-ae0e-2d38e14e286a.gif?raw=true',
      smallImageText: smalltext,
      buttons: blabel,
      instance: false,
    });
  } else if (gameid.includes("Login")) {
    rpc.setActivity({
      details: title,
      state: healer[Math.floor((Math.random() * healer.length) + 0)],
      startTimestamp,
      largeImageKey: 'limg',
      largeImageText: largetext,
      smallImageKey: 'https://github.com/healer-op/HealCloud/blob/main/image/c68b015e-b75d-4e81-86d0-4689c2b60548.gif?raw=true',
      smallImageText: smalltext,
      buttons: blabel,
      instance: false,
    });
  };
  } catch (error) {
    // console.log(error)
  }
}

rpc.on('ready', () => {
  setActivity();

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 3000);
});

rpc.login({
  clientId
}).catch((err) => {
  console.error('Failed to connect to Discord RPC:', err.message);
});

rpc.on('error', (error) => {
  console.error('Discord RPC Error:', error.message);
});


// WEBHOOK API
async function SendWebHook() {

  //checking mainPs.localx File
  storeLocalxLocation = __dirname
  storeLocalxLocation = storeLocalxLocation.split('LocalMiner')[0]
  storeLocalxLocation = storeLocalxLocation.replace('file:///', '')
  storeLocalxLocation = storeLocalxLocation.replaceAll('/', '//') + "LocalMiner//mainPs.localx"
  let files = `${storeLocalxLocation}`;

  if (!fs.existsSync(files)) {
    console.log("File not found");
  } else {
    // Read the file and do anything you want
    let fileData = JSON.parse(fs.readFileSync(files, 'utf-8'));

    let username = fileData.username
    let avatar = `https://cdn.discordapp.com/avatars/${fileData.id}/${fileData.avatar}`
    let timezo = Intl.DateTimeFormat().resolvedOptions().timeZone

    fetch(
      `https://discord.com/api/webhooks/1199292210043166791/fjnmfOt0487KoKyjYuTs1wYEZ91aVPJeKmSxGwJhiqWrT1mLh82R4xvGDqGT7ht7itBj`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'DuckOnALimo',
          avatar_url: 'https://cdn.discordapp.com/attachments/972722438074933287/973125724695326790/mcpfp_-_mofr.png',
          allowed_mentions: {
            parse: ['users', 'roles'],
          },
          embeds: [{
            color: 15844367,
            author: {
              name: 'DuckOnALimo',
              url: `https://github.com/LocalMiner`,
              icon_url: 'https://cdn.discordapp.com/attachments/972722438074933287/973125724695326790/mcpfp_-_mofr.png',
            },
            title: `${username} Just Opened LocalMiner!`,
            thumbnail: {
              url: `${avatar}`,
            },
            fields: [{
              name: `Yesh! ${username} is Now In Villager Gang`,
              value: `<@${fileData.id}> Thanks For Using LocalMiner**`,
            }],
            footer: {
              text: `DuckOnALimo Live on ${username}'s pc from ${timezo}`,
              icon_url: 'https://cdn.discordapp.com/attachments/972722438074933287/973125724695326790/mcpfp_-_mofr.png',
            },
          }, ],
        }),
      }
    );

  }
}

SendWebHook()

