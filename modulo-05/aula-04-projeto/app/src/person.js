const { evaluateRegex } = require('./util');

class Person {
    // (\w+):\s.*,
    // $1,

    constructor([
        nome,
        nacionalidade,
        estadoCivil,
        doc,
        rua,
        numero,
        bairro,
        cidade
    ]) {
        // ^ começo da string
        // + uma ou mais
        // (\w{1}) pega somente a primeira letra e deixa em um grupo
        // (a-zA-z) encontra letras maiusculas ou minusculas, adicionamos o + para ele pegar todas até o caracter especial
        // g  todas as ocorrências que encontrar
        const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g);
        const formatFirstLetter = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                return `${group1.toUpperCase()}${group2.toLowerCase()}`;
            })
        };

        
        // (\w+),
        // this.$1 = $1;
        this.nome = nome;
        this.nacionalidade = formatFirstLetter(nacionalidade);
        this.estadoCivil = formatFirstLetter(estadoCivil);
        // o que não for digito é removido
        // /g serve para remover todas as ocorrências encontradas
        this.doc = doc.replace(evaluateRegex(/\D/g), '');
        // começa a procurar depois do 'a' e pega tudo o que tem na frente
        // (?<= faz com que ignore tudo o que tiver antes desse match) positive look behind
        this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
        this.numero = numero;
        this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join();
        this.cidade = cidade.replace(evaluateRegex(/\.$/), '');
    }


};

module.exports = Person;