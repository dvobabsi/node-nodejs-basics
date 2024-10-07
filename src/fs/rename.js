import fs from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const rename = async () => {
    const wrongFilename = path.resolve('src', 'fs', 'files', 'wrongFilename.txt');
    const properFilename = path.resolve('src', 'fs', 'files', 'properFilename.md');

    try {
        // Проверяем существование wrongFilename.txt
        await fs.access(wrongFilename, constants.F_OK);
        // Проверяем, существует ли уже properFilename.md
        try {
            await fs.access(properFilename, constants.F_OK);
            throw new Error('FS operation failed'); // Если properFilename.md существует, выбрасываем ошибку
        } catch {
            // Если properFilename.md не существует, выполняем переименование
            await fs.rename(wrongFilename, properFilename);
            console.log(`Renamed ${wrongFilename} to ${properFilename}`);
        }
    } catch (err) {
        // Обрабатываем ошибку, если wrongFilename.txt не существует
        process.stderr.write('FS operation failed\n');
    }
};

await rename();