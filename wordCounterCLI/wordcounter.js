const { error } = require('console');
const fs = require('fs');

async function readfile(filename){
    
    fs.readFile(filename, "utf-8", function(err, data){
        if(err){
            console.log(err);
        }else{

            let newData = data.trim()
            let count = 1;
            for(let i = 0; i < data.length; i++){
                if(newData[i] === " "){
                    count++;
                }
            }

            console.log(count)
        }
    });

}


readfile(process.argv[2])