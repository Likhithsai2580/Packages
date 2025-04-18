const {
    Console
} = require('console');
const {
    DiffieHellmanGroup
} = require('crypto');

function RunServer() {
    try {
        callFrame("[🛠️] You Can Change Jdk From Settings! if console is not showing anything" , "POPUP8")
        if ((window.location.href).includes("app.html")) {
            loadConsole()
        } else {
            loadConsole()
        }
        let rundata = `java -server -Xms1G -Xmx${document.getElementById('numberInput').value}G -jar server.jar nogui`;
        let euladata = `eula=true`;

        var jarpath = document.getElementById("server_jar").files[0].path
        var jarname = document.getElementById("server_jar").files[0].name
        var jarfolder = jarpath.replace(jarname, "");

        fs.writeFileSync(`${jarfolder}run.bat`, rundata);
        fs.writeFileSync(`${jarfolder}eula.txt`, euladata);


        const {
            spawn
        } = require('child_process');

        // Start child process
        let jdkvs = localStorage.getItem("jdkv") || document.getElementById("jdkv").value

        const child = spawn(`${jdkvs}`, ['-server', '-Xms1G', `-Xmx${document.getElementById('numberInput').value}G`, `-jar`, `${jarname}`, `--nogui`], {
            cwd: `${jarfolder}`
        });
        // console.log(document.getElementById('ram').value);
        let playFlag = 1
        child.stdout.on('data', (data) => {
            if (data.includes("Done (")) {
                $("#code").append(`${data}`);

                $("#code").append(`[🎉] SERVER IS ONLINE!`);

            }
            if (data.includes("Stopping the server")) {
                $("#code").append(`${data}`);

                $("#code").append(`[🛑] SERVER STOPPED!`);

            }
            if (data.includes("adoptium.net")) {
                $("#code").append(`${data}`);

                $("#code").append(`[🛑] ERROR CODE: LOCALj12 : install jdk from https://adoptium.net`);

            }
            if (data.includes("to claim visit")) {
                if (playFlag == 1) {
                    $("#code").append(`${data}`);
                    let playerLink = data + ""
                    playerLink = (playerLink).split("visit: ")[1]
                    shell.openExternal(playerLink);
                    playFlag = 10;
                }

            }
            if (!data.includes("[1m[4mplayit.gg:[0m tunnel setup") && data.includes("[1m[4mplayit.gg:[0m ")) {
                $("#code").append(`${data}`);
                let url = data + ""
                url = (url).split("[1m[4mplayit.gg:[0m ")[1]
                copyText = url;
                document.getElementById("server_ip").style.opacity = 1;
                document.getElementById("display3").innerText = url
                document.getElementById("footer_body").innerHTML = `${url}`

            }
            if (!data.includes("playit.gg: tunnel setup") && data.includes("playit.gg: ")) {
                $("#code").append(`${data}`);
                url = data + ""
                url = (url).split("playit.gg: ")[1]
                copyText = url;
                document.getElementById("server_ip").style.opacity = 1;
                document.getElementById("display3").innerText = url
                document.getElementById("footer_body").innerHTML = `${url}`

            } else {
                $("#code").append(`${data}`);
            }

        });

        child.stderr.on('data', (data) => {
            if (data.includes("Done (")) {
                $("#code").append(`${data}`);

                $("#code").append(`[🎉] SERVER IS ONLINE!`);

            }
            if (data.includes("Stopping the server")) {
                $("#code").append(`${data}`);

                $("#code").append(`[🛑] SERVER STOPPED!`);

            }
            if (data.includes("adoptium.net")) {
                $("#code").append(`${data}`);
                $("#code").append(`[⚠️] ERROR CODE: LOCALj12 : install jdk from https://adoptium.net`);
            } else {
                $("#code").append(`${data}`);
            }
            if (data.includes("to claim visit")) {
                if (playFlag == 1) {
                    $("#code").append(`${data}`);
                    let playerLink = data + ""
                    playerLink = (playerLink).split("visit: ")[1]
                    shell.openExternal(playerLink);
                    playFlag = 10;
                }

            }
            if (!data.includes("[1m[4mplayit.gg:[0m tunnel setup") && data.includes("[1m[4mplayit.gg:[0m ")) {
                $("#code").append(`${data}`);
                let url = data + ""
                url = (url).split("[1m[4mplayit.gg:[0m ")[1]
                copyText = url;
                document.getElementById("server_ip").style.opacity = 1;
                document.getElementById("display3").innerText = url
                document.getElementById("footer_body").innerHTML = `${url}`

            }
            if (!data.includes("playit.gg: tunnel setup") && data.includes("playit.gg: ")) {
                $("#code").append(`${data}`);
                url = data + ""
                url = (url).split("playit.gg: ")[1]
                copyText = url;
                document.getElementById("server_ip").style.opacity = 1;
                document.getElementById("display3").innerText = url
                document.getElementById("footer_body").innerHTML = `${url}`
            }
        });

        child.stdout.pipe(process.stdout);

        function commandRunner() {
            if (document.getElementById("flagger").innerHTML == "active") {
                var command = document.getElementById("command").value;
                // console.log(command);
                $("#code").append(`>>> ${command}`);
                child.stdin.write(`${command}\n`);
                document.getElementById("flagger").innerHTML = "disable"
                document.getElementById("command").value = ""
                // console.log("healer");
            }
            setTimeout(commandRunner, 3000);
        }




        child.on('error', (error) => {
            console.log(`error: ${error.message}`)
        });

        child.on('exit', (code, signal) => {
            if (code) $("#code").append(`Process exit with code: ${code}`);
            if (signal) $("#code").append(`Process killed with signal: ${signal}`);
            document.getElementById("footer").style.opacity = 0;
            $("#code").append(`----------------------------------------
        Note: This Error is normal if u stoped the server
    [❌] ERROR - CODE FAILED : ERROR CODE : LOCALM302
    [📢] You Can Report This in LocalMiner Discord Support Server
    [🌐] website : https://localm.eu.org`);
        });

        commandRunner();


    } catch (error) {
        console.log(error)
    }
}

function sendCommand() {
    document.getElementById("flagger").innerHTML = "active"
}