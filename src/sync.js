function sync(){
    // notif('success', "Syncing...")
    const directoryPath = __dirname;
    const filePath = path.join(directoryPath, "tst.json");

    
    fs.readFile(filePath, "utf-8", async (err, data) => {
        const parsedData = JSON.parse(data);
        const students = parsedData[2].cards;
        // console.log(students.length);
        // console.log(students);
        
        for (let i = 0; i < students.length; i++){
            
            await syncThis(students[i].name, students[i].class, students[i].gender, i);
            
        }
    });
    
}

async function syncThis(names, std_class, gender, index){
    const xhttp = new XMLHttpRequest();
    // console.log(std_class);
    xhttp.onload = function(){
        const res = this.response;
        if (res == "err"){
            notif("err", "Sync failed");
        }else{
            notif("success", `<b>${res}</b> cards synced`);
            // notif("success", `<b>${students.length}</b> cards synced`);
        }
        // console.log(res);
    }
    // xhttp.open('POST', `http://ecm.rf.gd/sync.php`, true)
    xhttp.open('POST', `http://localhost/ecm/sync.php`, true)
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (std_class == "L3 F&B"){
        xhttp.send(`name=${names}&std_class=L3 F%26B&gender=${gender}`);   
    }else if (std_class == "L4 F&B"){
        xhttp.send(`name=${names}&std_class=L4 F%26B&gender=${gender}`);   
    }else{
        xhttp.send(`name=${names}&std_class=${std_class}&gender=${gender}`);   
    }
        

}