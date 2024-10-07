import fs from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const rename = async () => {
    const wrongFilename = path.resolve('src', 'fs', 'files', 'wrongFilename.txt');
    const properFilename = path.resolve('src', 'fs', 'files', 'properFilename.md');

    try {

        await fs.access(wrongFilename, constants.F_OK);
        try {
            await fs.access(properFilename, constants.F_OK);
            throw new Error('FS operation failed');
        } catch {
            await fs.rename(wrongFilename, properFilename);
            console.log(`Renamed ${wrongFilename} to ${properFilename}`);
        }
    } catch (err) {
        process.stderr.write('FS operation failed\n');
    }
};

await rename();