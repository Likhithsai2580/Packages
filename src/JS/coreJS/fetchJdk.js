fs.stat('C:/LocalMiner/Jdk/healer.json', function (err, stat) {
    if (err == null) {
        console.log('Jdk File exists');
        updateJdkoptions()
    } else if (err.code === 'ENOENT') {
        // file does not exist
        console.log('Jdk file not found')
    } else {
        console.log('Some other error: ', err.code);
    }
});

function updateJdkoptions() {
    var data = JSON.parse(fs.readFileSync('C:/LocalMiner/Jdk/healer.json', 'utf8'));
    console.log(data[1])
    const html = data.map((img, i) => {
        return `<option value="${data[i].BinLoc}">${data[i].Version}</option>`;
    }).join('');
    document.querySelector("#jdkv").insertAdjacentHTML("afterbegin", html);
    document.getElementById("jdkfetch").innerText = "Select Java Version (default system java)"
}