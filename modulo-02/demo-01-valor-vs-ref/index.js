const assert = require('assert');

// Tipo de Valor
let counter = 0;
let counter2 = counter;

counter2++;

assert.notDeepStrictEqual(counter, counter2);

// Tipo de Referência
let obj = {
    age: 23,
    name: 'CJ'
}
let obj2 = obj;

obj2.age++;

assert.deepStrictEqual(obj.age, obj2.age);