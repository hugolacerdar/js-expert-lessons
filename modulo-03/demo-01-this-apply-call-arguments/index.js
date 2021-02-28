'use strict';

const { watch, promises: { readFile } } = require('fs');

class File {
    watch(event, filename) {
        console.log('this', this);
        console.log('arguments', arguments);
        console.log('arguments array', Array.prototype.slice.call(arguments));
        this.showContent(filename);
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString());
    }
}

// watch(__filename, async(event, filename) => {
//     console.log((await readFile(filename)).toString);
// })

const file = new File();
// dessa forma, ele ignora o 'this' da classe File
// e herda o 'this' do watch!
// watch(__filename, file.watch);

// alternativa (feia) para não herdar o this da função
//watch(__filename, (event, filename) => file.watch(event, filename));

// podemos deixar explicito qual contexto a função deve seguir
// o bind retorna uma função com o this setado
//watch(__filename, file.watch.bind(file));

file.watch.call({ showContent: () => console.log('call: hey sinon!')}, null, __filename);
file.watch.apply({ showContent: () => console.log('call: hey sinon!')}, [null, __filename]);