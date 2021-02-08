const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');


(async() => {
    {
        const filePath = './mocks/emptyFile-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);
    }
    {
        const filePath = './mocks/fourItems-invalid.csv';
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);    
    }
    {
        const filePath = './mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath);
        const expected = [
            {
                "name": "Erick Wendel",
                "id": 123,
                "profession": "Instructor",
                "birthYear": 1996
            },
            {
                "name": "Xuxa da Silva",
                "id": 322,
                "profession": "Javascript Specialist",
                "birthYear": 1941
            },
            {
                "name": "Joaozinho",
                "id": 231,
                "profession": "Java Developer",
                "birthYear": 1991
            }
          ]
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})();