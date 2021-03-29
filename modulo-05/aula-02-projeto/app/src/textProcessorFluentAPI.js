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

        const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi;
        // faz o match para encontrar a string inteira que contem os dados que precisamos
        const onlyPerson = this.#content.match(matchPerson);
        console.log('onlyPerson', onlyPerson);
        this.#content = onlyPerson;
        return this;
    };

    build() {
        return this.#content;
    }
}

module.exports = TextProcessorFluentAPI;