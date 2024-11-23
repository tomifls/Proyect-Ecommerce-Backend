const fs = require('fs');
const path = require('path');

class FileManager {
    static readJSON(filePath) {
        const data = fs.readFileSync(path.resolve(filePath), 'utf-8');
        return JSON.parse(data);
    }

    static writeJSON(filePath, data) {
        fs.writeFileSync(path.resolve(filePath), JSON.stringify(data, null, 2));
    }
}

module.exports = FileManager;