import { promises as fs } from 'fs';
import path from 'path';

const read = async () => {
    const filePath = path.resolve('src', 'fs', 'files', 'fileToRead.txt');
    
    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(data);
    } catch (err) {
        process.stderr.write('FS operation failed\n');
    }
};

await read();