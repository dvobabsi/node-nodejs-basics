import { promises as fs } from 'fs';
import path from 'path';

const copy = async () => {
    const sourceDir = path.resolve('src', 'fs', 'files');
    const destinationDir = path.resolve('src', 'fs', 'files_copy');

    try {
        const sourceExists = await fs.access(sourceDir).then(() => true).catch(() => false);
        if (!sourceExists) {
        throw new Error('FS operation failed');
        }

        const destExists = await fs.access(destinationDir).then(() => true).catch(() => false);
        if (destExists) {
        throw new Error('FS operation failed');
        }

        await fs.mkdir(destinationDir);

        const copyRecursive = async (src, dest) => {
        const items = await fs.readdir(src, { withFileTypes: true });

        for (const item of items) {
            const srcPath = path.join(src, item.name);
            const destPath = path.join(dest, item.name);

            if (item.isDirectory()) {
                await fs.mkdir(destPath);
                await copyRecursive(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        }
        };

        await copyRecursive(sourceDir, destinationDir);

        console.log('Folder copied successfully!');
    } catch (error) {
        process.stderr.write(`Error: ${error.message}\n`);
        process.exit();
    }
};

await copy();