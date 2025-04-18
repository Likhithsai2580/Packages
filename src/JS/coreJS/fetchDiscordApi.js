storeLocalxLocation = __dirname
storeLocalxLocation = storeLocalxLocation.split('LocalMiner')[0]
storeLocalxLocation = storeLocalxLocation.replace('file:///','')
storeLocalxLocation = storeLocalxLocation.replaceAll('/','//') + "LocalMiner//mainPs.localx"
let files = `${storeLocalxLocation}`;

if (!fs.existsSync(files)) {
    console.log("File not found");
}

else {
    // Read the file and do anything you want
    let fileData = JSON.parse(fs.readFileSync(files, 'utf-8'));
    let avatar = document.getElementById("discordAvatar")
    avatar.src = `https://cdn.discordapp.com/avatars/${fileData.id}/${fileData.avatar}`
}