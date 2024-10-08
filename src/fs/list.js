import { readdir } from 'fs/promises';
import { access } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const list = async () => {
    const folderPath = path.resolve('src', 'fs', 'files');

  try {
    await access(folderPath, constants.F_OK);

    const files = await readdir(folderPath);
    console.log(files);
  } catch (err) {
    process.stderr.write('FS operation failed\n');
  } 
};

await list();