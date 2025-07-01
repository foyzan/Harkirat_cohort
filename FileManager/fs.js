
import { time } from 'node:console';
import * as fs from 'node:fs/promises';
import path from 'node:path'
import { type } from 'node:os';

export async function ListFolder(listPath) {
  try {
    const list = await fs.readdir(listPath, { withFileTypes: true });
    return list.map(item => {
      return {
        name : item.name,
        type : item.isDirectory() ? "folder" : "file",
        path : path.join(import.meta.dirname, item.name)
      }
    })
  } catch (error) {
    console.error(`Error listing folder: ${error}`);
  }
}



export async function CreateFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
  } catch (error) {
    console.error(`Error creating file: ${error}`);
  }
}

export async function WriteFile(filePath, content) {
  try {
    await fs.appendFile(filePath, content)
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


export async function DeleteFolder(folderPath) {
  try {
    await fs.rm(folderPath, { recursive: true });
  } catch (error) {
    console.error(`Error deleting folder: ${error}`);
  }
}

export async function CreateFolder(folderPath) {
  try {
    await fs.mkdir(folderPath, { recursive: true });
  } catch (error) {
    console.error(`Error creating folder: ${error}`);
  }
}

