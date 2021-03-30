const { evaluateRegex } = require('./util');
const Person = require('./person');

// o objetivo do Fluent API é executar tarefas
// como um pipeline, step by step,
// e no fim chamar o build, MUITO similar ao padrão Builder
// a diferença é que aqui é sobre processos (chain), enquanto o Builder é sobre construção
// de objetos

class TextProcessorFluentAPI {
    
    // propriedade privada!
    #content;

    constructor(content) {
        this.#content = content;
    };

    extractPeopleData() {
        // ?<= extrair os dados que virão após o grupo
        // [contratante|contratada] ou um ou outro, (lembrando que tem a flag i no fim da expressão para pegar maiusculas e minusculas)
        // :\s{1} vai procurar somente o carater literal do dois pontos seguidos de um espaço
        // tudo acima fica dentro de um parênteses para falar "vamos pegar daqui para frente"

        // (?!) negative look around para ignorar os contratantes no final do documento (que só tem espaço a frente deles)
        // .*\n pegar tudo até a primeira quebra de linha
        // .*? non greety, esse ? faz com que ele pare na primeira recorrência, assim ele evita ficar em loops

        // $ informar que a pesquisa acaba no final da linha
        // g global
        // m multiline
        // i case insensitive

        const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi);
        const onlyPerson = this.#content.match(matchPerson);

        this.#content = onlyPerson;
        return this;
    };

    divideTextInColumns() {

        const splitRegex = evaluateRegex(/,/);
        this.#content = this.#content.map(line => line.split(splitRegex));

        return this;
    }

    removeEmptyCharacters() {
        const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);

        this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, '')));

        return this;
    }

    mapPerson() {

        this.#content = this.#content.map(line => new Person(line));

        return this;
    }

    build() {
        return this.#content;
    }
}

module.exports = TextProcessorFluentAPI;