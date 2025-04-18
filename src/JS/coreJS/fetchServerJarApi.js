async function fetchPaperServer() {
    let version = await (await fetch(`https://api.papermc.io/v2/projects/paper`)).json();
    let data = {
        "versions":[],
        "links":[]
    }
    let versions = version.versions
    for (var i = 0; i < versions.length; i++) {
        data.versions.push(versions[i])
        let build = await (await fetch(`https://api.papermc.io/v2/projects/paper/versions/${versions[i]}/builds`)).json();
        let build_number = build.builds[0].build
        let download = build.builds[0].downloads.application.name
        data.links.push(`https://api.papermc.io/v2/projects/paper/versions/${versions[i]}/builds/${build_number}/downloads/${download}`)
    }
    return data;

}
async function paperJarFetch(){
    const paperdata = await fetchPaperServer()
    let v = paperdata.versions;
    const html = v.map((img, i) => {
        return `<option value="${paperdata.links[i]}">🟢Paper ${v[i]}</option>`;
    }).join('');
    document.querySelector("#server_ver").insertAdjacentHTML("afterbegin", html);
    document.getElementById("paperfetch").innerText = "Select Server Version"
    purpurJarFetch()
}

paperJarFetch()

//purpur

async function fetchPurpurServer() {
    let version = await (await fetch(`https://api.purpurmc.org/v2/purpur/`)).json();
    let data = {
        "versions":[],
        "links":[]
    }
    let versions = version.versions
    for (var i = 0; i < versions.length; i++) {
        data.versions.push(versions[i])
        data.links.push(`https://api.purpurmc.org/v2/purpur/${versions[i]}/latest/download`)
    }
    return data;

}

async function purpurJarFetch(){
    const purpurdata = await fetchPurpurServer()
    let v = purpurdata.versions;
    const html = v.map((img, i) => {
        return `<option value="${purpurdata.links[i]}">🔴Purpur ${v[i]}</option>`;
    }).join('');
    document.querySelector("#server_ver").insertAdjacentHTML("afterbegin", html);
    document.getElementById("paperfetch").innerText = "Select Server Version"
    callFrame("[🟢] Loaded Latest Server Jars From Internet","POPUP7")
}