const fs = require('fs').promises;

const readData = async (path) => {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
};

const writeData = async (path, data) => {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
};

module.exports = {
    readData,
    writeData
};