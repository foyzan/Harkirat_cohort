import * as readline from "node:readline/promises";
import {stdin, stdout} from "node:process"
import chalk from "chalk";


import {CreateFolder, CreateFile, ReadFile} from "./fs.js";

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
});

async function menu(){

    console.log(chalk.blue.bold("\n 📁 Welcome to the File Manager!"));

    const options = [
        "1. Create Folder",
        "2. Create File",
        "3. Read File",
        "4. Write to File",
        "5. Delete File",
        "6. Delete Folder",
        "7. List Files",
        "8. Exit"
    ]

    console.log(chalk.green.bold("\n Please choose an option:\n",));

    options.forEach( (option, index) => {
        console.log(" ",chalk.yellow(option));
    });


   const ans = await rl.question(chalk.cyan.bold("\n Enter your option: "));

    switch (ans) {
          case "1":
                const folderPath = await rl.question(chalk.cyan.bold("\n Enter the folder path: "));
                await CreateFolder(folderPath);
                console.log(chalk.green.bold("✔️Folder created :", folderPath));
                break;
          case "2":
                const filePath = await rl.question(chalk.cyanBright.bold("\n Enter the file path: "));
                const fileContent = await rl.question(chalk.cyanBright.bold("\n Enter the file content: "));
                await CreateFile(filePath);
                console.log(chalk.green.bold("✔️File created :", filePath));
                break;
          case "3":
                const readFilePath = await rl.question(chalk.cyan.bold("\n Enter the file path to read: "));
                const readFileContent = await ReadFile(readFilePath);
                console.log(chalk.green.bold("\n📝 File content : \n", chalk.yellow(readFileContent), "\n"));
                break;
          case "4":
                console.log(chalk.red.bold("Write to File"));
                break;
          case "5":
                console.log(chalk.red.bold("Delete File"));
                break;
          case "6":
                console.log(chalk.red.bold("Delete Folder"));
                break;
          case "7":
                console.log(chalk.red.bold("List Files"));
                break;
          case "8":
                console.log(chalk.red.bold("Exit"));
                rl.close();
                return;
          default:
                console.log(chalk.red.bold("Invalid option, please try again."));
     }
    
     menu();
}

menu()