import * as readline from "node:readline/promises";
import { stdin, stdout } from "node:process"
import chalk from "chalk";

// Import file and folder operations from fs.js
import { CreateFolder, CreateFile, ReadFile, WriteFile, DeleteFile, DeleteFolder, ListFolder } from "./fs.js";
import { type } from "node:os";

// Create readline interface for user input/output
const rl = readline.createInterface({
      input: stdin,
      output: stdout,
});

// Main menu function for the file manager
async function menu() {
      console.clear() // Clear the terminal for a clean menu display
      console.log(chalk.blue.bold("\n 📁 Welcome to the File Manager!"));

      // List of available options
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

      // Display options to the user
      options.forEach((option, index) => {
            console.log(" ", chalk.yellow(option));
      });

      // Get user's choice
      const ans = await rl.question(chalk.cyan.bold("\n Enter your option: "));

      // Handle user's choice
      switch (ans) {
            case "1":
                  // Create a new folder
                  const folderPath = await rl.question(chalk.cyan.bold("\n Enter the folder path: "));
                  await CreateFolder(folderPath);
                  console.log(chalk.green.bold("✔️Folder created :", folderPath));
                  break;
            case "2":
                  // Create a new file
                  const filePath = await rl.question(chalk.cyanBright.bold("\n Enter the file path: "));
                  const fileContent = await rl.question(chalk.cyanBright.bold("\n Enter the file content: "));
                  await CreateFile(filePath, fileContent);
                  console.log(chalk.green.bold("✔️File created :", filePath));
                  break;
            case "3":
                  // Read a file and display its content
                  const readFilePath = await rl.question(chalk.cyan.bold("\n Enter the file path to read: "));
                  const readFileContent = await ReadFile(readFilePath);
                  console.log(chalk.green.bold("\n📝 File content : \n", chalk.yellow(readFileContent), "\n"));
                  break;
            case "4":
                  // Write content to an existing file
                  const writeFilePath = await rl.question(chalk.cyan.bold("\n Enter the file path to write: "));
                  const writeFileContent = await rl.question(chalk.cyan.bold("\n Enter the content to write: "));
                  await WriteFile(writeFilePath, "\n" + writeFileContent);
                  console.log(chalk.green.bold("✔️File written :", writeFilePath));
                  break;
            case "5":
                  // Delete a file
                  const deleteFilePath = await rl.question(chalk.cyan.bold("\n Enter the file path to delete: "));
                  await DeleteFile(deleteFilePath);
                  console.log(chalk.green.bold("✔️File deleted :", deleteFilePath));
                  break;
            case "6":
                  // Delete a folder
                  const deleteFolderPath = await rl.question(chalk.cyan.bold("\n Enter the folder path to delete: "));
                  await DeleteFolder(deleteFolderPath);
                  console.log(chalk.green.bold("✔️Folder deleted :", deleteFolderPath));
                  break;
            case "7":
                  // List files and folders in a directory
                  const listFolderPath = await rl.question(chalk.cyan.bold("\n Folder path [press Enter for current]: "));
                  const files = await ListFolder(listFolderPath || './');
                  files.forEach((file) => {
                        const icon = file.type == 'folder' ? '📁' : '📄';
                        console.log(icon, chalk.greenBright(file.name));
                  })
                  break;
            case "8":
                  // Exit the application
                  console.log(chalk.red.bold("Exit"));
                  rl.close();
                  return;
            default:
                  // Handle invalid option
                  console.log(chalk.red.bold("Invalid option, please try again."));
      }

      // End of operation message and prompt to continue
      console.log(chalk.bgWhiteBright.black("\n----------------------End---------------------"))
      console.log('\n')
      await rl.question(chalk.blueBright("press any key"))
      menu() // Show the menu again for the next operation
}

// Start the file manager menu
menu()