const { error } = require('console');
const fs = require('fs');
const {Command} = require('commander')

const program = new Command;

program.name("Word counter").description("CLI app to count word").version("0.0.1")

program
.command("count_word")
.description("count the number of word in a file")
.argument("<file>", "file name")
.action(countWord)
program
.command("count_letter")
.description("count the number of letter in a file")
.argument("<file>", "file name")
.action(countLetter)




function countWord (filename){
    
    fs.readFile(filename, "utf-8", function(err, data){
        if(err){
            console.log(err);
        }else{

            let newData = data.trim()
            let count = 0;
            for(let i = 0; i < newData.length; i++){
                if(newData[i] === " "){
                    count++;
                }
            }

            
            console.log(count + 1)
        }
    });

}
function countLetter (filename){
    
    fs.readFile(filename, "utf-8", function(err, data){
        if(err){
            console.log(err);
        }else{

            let newData = data.trim()
            let count = 0;
            for(let i = 0; i < newData.length; i++){
                if(newData[i] === " "){
                    count++;
                }
            }

            console.log(newData.length - count)
            
        }
    });

}


program.parse()
