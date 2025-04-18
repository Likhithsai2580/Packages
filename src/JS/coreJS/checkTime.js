// check time 
storeLocalxLocation = __dirname
storeLocalxLocation = storeLocalxLocation.split('LocalMiner')[0]
storeLocalxLocation = storeLocalxLocation.replace('file:///','')
storeLocalxLocation = storeLocalxLocation.replaceAll('/','//') + "LocalMiner//mainPs.localx"
let file = `${storeLocalxLocation}`;
let getTime;


if (!fs.existsSync(file)) {
    console.log("File not found");
}

// The file *does* exist
else {
    // Read the file and do anything you want
    fileData = JSON.parse(fs.readFileSync(file, 'utf-8'));
    console.log(fileData)
    getTime = fileData.time;
    getTime = atob(getTime);
    getTime = atob(getTime);
    getTime = atob(getTime);
    let savedDate = getTime.split(" ")[0];
    // saveDate = savedDate.replaceAll("-","/")

    let TodayDate = giveTodayDate()

    function giveTodayDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = yyyy + '-' + mm + '-' + dd;
        return formattedToday;
    }

    const diffInMs = new Date(savedDate) - new Date(TodayDate)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    console.log(savedDate + "   " + TodayDate + "    " + diffInDays + " " + diffInMs)

    if (diffInDays < 0 || diffInDays == 0) {
        console.log("vData Loaded")
    } else {
        pillager();
    }


    function pillager() {
        if (getTime.includes("v")) {
            window.location.href = "app.html"
        }
        if (getTime.includes("n")) {
            window.location.href = "app.html"
        }
    }
}