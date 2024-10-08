import { promises as fs } from 'fs';
import path from 'path';

const remove = async () => {
    const fileName = path.resolve('src', 'fs', 'files', 'fileToRemove.txt');
    
    try {
        await fs.access(fileName);
        await fs.unlink(fileName);
        console.log(`File has been deleted`);
    } catch (err) {
        process.stderr.write('FS operation failed\n');
    }
};

await remove();