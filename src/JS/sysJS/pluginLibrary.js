const BASE_URL = "https://api.modrinth.com/v2/"

async function SearchPlugin() {
    try {
        let name = encodeURIComponent(document.getElementById("source").value)
        document.getElementById("ppl").innerHTML = ""
        let sd = await (await fetch(`${BASE_URL}search?limit=40&index=relevance&query=${encodeURI(name)}`)).json();
        let data = sd.hits
        pd = data.filter(o => o.project_type === 'mod');
        // console.log(pd)
        let hits = pd
        const trending_html = hits.map((d, i) => {
            return `
            <div class="column">
                <img src="${hits[i].icon_url}">
                <p>${(hits[i].title)}</p>
                <p>${(hits[i].description).substr(0, 40) + '\u2026'}</p>
                <button onclick="downloadPlugin('${hits[i].project_id}')">Download</button>
            </div>`;
        }).join('');
        document.querySelector("#ppl").insertAdjacentHTML("afterbegin", trending_html);
    } catch (error) {
        console.log(error)
        console.log("false")
    }
    
}

async function downloadPlugin(id) {
    try {
        let pd = await (await fetch(`${BASE_URL}project/${id}`)).json();
        let latest = pd.versions[(pd.versions).length - 1]
        let dd = await (await fetch(`${BASE_URL}version/${latest}`)).json();
        let downloadLink = dd.files[0].url
        console.log(downloadLink)

        var jarpath = document.getElementById("server_jar2").files[0].path
        var jarname = document.getElementById("server_jar2").files[0].name
        var jarfolder = jarpath.replace(jarname, "") + "plugins";
        console.log(jarfolder)

        DownloadElectron(jarfolder, downloadLink, jarfolder, 1)
    } catch (error) {
        console.log("false")
        window.alert("Make Sure You Have Selected Server.jar\nBefore Downloading Plugins")
    }
}

const inputHandler = async function (e) {
    SearchPlugin()

}

const source = document.getElementById('source');
source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler)

SearchPlugin()