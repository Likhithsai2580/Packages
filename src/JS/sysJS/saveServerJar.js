const extract = require('extract-zip')
const {
    webFrame
} = require('electron');
const {
    ipcRenderer,
    contextBridge
} = require("electron");

storeLocalxLocation = __dirname
storeLocalxLocation = storeLocalxLocation.split('LocalMiner')[0]
storeLocalxLocation = storeLocalxLocation.replace('file:///', '')
storeLocalxLocation = storeLocalxLocation.replaceAll('/', '//') + "LocalMiner//servers.localx"


function DownloadElectron(filePath, urlLink, filepath, j1) {
    ipcRenderer.send("download", {
        url: urlLink,
        properties: {
            directory: filePath
        }
    })

    let flag = 1;
    ipcRenderer.on("download progress", (event, progress) => {
        if (Math.floor((progress.percent) * 100) != 100) {
            document.getElementById("localprocess").style.display = "block"
            document.getElementById("back").innerText = `${Math.floor((progress.percent) * 100) + "%"}`
            document.getElementById("localprocess").value = Math.floor((progress.percent) * 100)
        } else if (Math.floor((progress.percent) * 100) == 100 && flag == 1) {
            flag = 11;
            document.getElementById("localprocess").style.display = "none";
            document.getElementById("back").innerText = `Back To Menu`;
            window.alert(`Download Complete\nSaved at ${filepath}`)
            try {
                openfiles(filepath)
            } catch (error) {
                console.log(error)
            }
            if (j1 == 10) {
                fix();
            }
            if (j1 == 11) {
                UnzipJdk();
            }
        } else {
            document.getElementById("localprocess").style.display = "none";
            document.getElementById("back").innerText = `Back To Menu`;
        }


    });
}

ipcRenderer.on("download complete", (event, path) => {

});

///////////////////////////////////////////////////////////////////////////////

function OpenServersFolder() {
    try {
        openfiles(`C:\\LocalMiner\\Server\\`)
    } catch (error) {
        console.log(error)
    }
}

function OpenJdkFolder() {
    try {
        openfiles(`C:\\LocalMiner\\Jdk\\`)
    } catch (error) {
        console.log(error)
    }
}


function DownloadJdk() {
    if (window.confirm(`Do You want to download Jdk\nTotal Size:992MB`) == true) {
        let jdkLink = "https://github.com/LocalMiner/LocalJdk/releases/download/1.0/LocalJdk.zip"
        let filePath = `C:/LocalMiner/Jdk`
        let filepath = `C:\\LocalMiner\\Jdk`
        let j1 = 11;
        DownloadElectron(filePath, jdkLink, filepath, j1)
    }
}

async function UnzipJdk() {
    try {
        await extract(`C:/LocalMiner/Jdk/LocalJdk.zip`, {
            dir: `C:/LocalMiner/Jdk/`
        })
        window.alert(`Jdk Extraction complete`)
        var filePath = 'C:/LocalMiner/Jdk/LocalJdk.zip';
        fs.unlinkSync(filePath);
    } catch (err) {
        // handle any errors
    }
}

///////////////////////////////////////////////////////////////////////////////

async function InstallServer() {
    if ((window.location.href).includes("app.html")) {
        loadRun()
    } else {
        loadRun()
    }

    var paperlink = document.getElementById("server_ver").value;
    var server_name = document.getElementById("server_name").value;

    var path = `C:/LocalMiner/Server/${server_name}`

    let filePath = `C:/LocalMiner/Jdk`
    let filepath = `C:\\LocalMiner\\Jdk`
    var savedLocation = `C:\\LocalMiner\\Server\\${document.getElementById("server_name").value}`
    let j1 = 10;

    await DownloadElectron(path, paperlink, savedLocation, j1)
}

function fix() {
    var server_name = document.getElementById("server_name").value;

    let euladata = `eula=true`;
    fs.writeFile(`C://LocalMiner//Server//${server_name}//eula.txt`, euladata, function (err) {
        if (err) throw err;
        console.log('eula.txt is created successfully.');
    });

    var ram = `1`

    let rundata = `java -server -Xms1G -Xmx${ram}G -jar server.jar nogui`;
    fs.writeFile(`C://LocalMiner//Server//${server_name}//run.bat`, rundata, function (err) {
        if (err) throw err;
        console.log('run.bat is created successfully.');
    });

    var player = 100
    var type = document.getElementById("type").value;

    let serverp = `#Minecraft server properties
    #Made By Localminer
    #https://github.com/localminer 
    enable-jmx-monitoring=false
    rcon.port=25565
    level-seed=
    enable-command-block=true
    gamemode=survival
    enable-query=false
    generator-settings=
    level-name=world
    motd=LocalMiner Survival
    query.port=25565
    pvp=true
    generate-structures=true
    difficulty=easy
    network-compression-threshold=256
    max-tick-time=60000
    require-resource-pack=false  \n` +
        `max-players=${player}  \n` + `
    use-native-transport=true \n` +
        `online-mode=${type}  \n` + `
    enable-status=true
    allow-flight=false
    broadcast-rcon-to-ops=true
    view-distance=10
    max-build-height=256
    server-ip=127.0.0.1
    resource-pack-prompt=
    allow-nether=true
    server-port=25565
    enable-rcon=false
    sync-chunk-writes=true
    op-permission-level=4
    server-name=LocalMiner
    prevent-proxy-connections=false
    hide-online-players=false
    resource-pack=
    entity-broadcast-range-percentage=100
    simulation-distance=10
    player-idle-timeout=0
    rcon.password=
    force-gamemode=false
    debug=false
    rate-limit=0
    hardcore=false
    white-list=false
    broadcast-console-to-ops=true
    spawn-npcs=true
    spawn-animals=true
    snooper-enabled=false
    function-permission-level=2
    level-type=default
    text-filtering-config=
    spawn-monsters=true
    enforce-whitelist=false
    spawn-protection=0
    resource-pack-sha1=
    max-world-size=29999984`

    fs.writeFile(`C://LocalMiner//Server//${server_name}//server.properties`, serverp, function (err) {
        if (err) throw err;
        console.log('server.prop is created successfully.');
    });

    //playitgg download
    callFrame("[⚠️] Copy playit.gg files to the new server if already have LocalMiner server","POPUP7")
    if (window.confirm(`Do you want to download playitgg (IMPORTANT)`) == true) {
        try {
            var server_name = document.getElementById("server_name").value;
            var path = `C:/LocalMiner/Server/${server_name}`
            var savedLocation = `C:\\LocalMiner\\Server\\${document.getElementById("server_name").value}`
            let playPath = path + "/plugins"
            let playLink = "https://github.com/playit-cloud/playit-minecraft-plugin/releases/latest/download/playit-minecraft-plugin.jar"
            let playSavedLocation = savedLocation + "\\plugins"
            DownloadElectron(playPath, playLink, playSavedLocation, 1)
        } catch (error) {
            console.log(error)
        }

    }


}