const { readFile } = require('fs/promises')
const { join } = require('path')

class File {
    static async csvToJson(filePath) {
        return 'hello'
    }

    static getFileContent(filePath)
}

(async () => {
    const result = await File.csvToJson('../mocks/threeItems-valid.csv');

    console.log('result ', result);
})()