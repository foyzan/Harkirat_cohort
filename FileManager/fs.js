
import * as fs from 'node:fs/promises';

export async function CreateFile(filePath) {
  try {
    await fs.writeFile(filePath, '// This is a test file');
  } catch (error) {
    console.error(`Error creating file: ${error}`);
  }
}

export async function AppendToFile(filePath) {
  try {
    await fs.appendFile(filePath, '\n h h h aaaa');
  
  } catch (error) {
    console.error(`Error appending to file: ${error}`);
  }
}

export async function ReadFile(filePath) {

  try {
   const data = await fs.readFile(filePath, 'utf-8')
   return data;
  }catch (error) {
    console.error(`Error reading file: ${error}`);
  }

}

export async function getFileinfo(filePath) {

  try {
     const stats = await fs.stat(filePath);

     return {
        size: stats.size,
        createdAt: stats.birthtime.toLocaleString(),
        modifiedAt: stats.mtime.toLocaleString(),
     }
  }catch (error) {
     console.error(`Error getting file info: ${error}`);
  }
}


export async function DeleteFile(filePath) {

  try {
    await fs.unlink(filePath);
  }catch (error) {
    console.error(`Error deleting file: ${error}`);
  }
}


export async function CreateFolder(folderPath) {
  try {
    await fs.mkdir(folderPath, { recursive: true });
  } catch (error) {
    console.error(`Error creating folder: ${error}`);
  }
}