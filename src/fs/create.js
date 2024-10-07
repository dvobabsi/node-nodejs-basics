
import { promises as fs } from 'fs';
import { join } from 'path';

const create = async () => {
    const filePath = join('src','fs','files', 'fresh.txt');
    const content = 'I am fresh and young';
    const error = 'FS operation failed';

    try {
        await fs.access(filePath);
        throw new Error(error);
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(filePath, content, 'utf8');
            console.log('File created successfully');
        } else {
            process.stderr.write(`Error: ${err.message}\n`);
            process.exit();
        }
    }
};

await create();