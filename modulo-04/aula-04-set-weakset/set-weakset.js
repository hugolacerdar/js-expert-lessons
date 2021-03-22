const assert = require('assert');

// usando a maioria das vezes para listas de itens únicos
const arr1 = ['0','1','2'];
const arr2 = ['2','0','3'];

const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), [ '0', '0', '1', '2', '2', '3' ]);

const set = new Set(arr3.sort());

assert.deepStrictEqual(Array.from(set), [ '0', '1', '2', '3' ]);

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [ '0', '1', '2', '3' ])

console.log('set.keys', set.keys());
console.log('set.values', set.values()); // Só existe por conta do map

// -No array comum, para saber se existe um item, indexOf(x) !== -1 ou includes(x)
assert.ok(set.has('3'));

// mesma teoria do map, mas você sempre trabalha com a lista toda
// não tem get, então você pode saber se o item está ou não no array e é isso
// na documentação tem exemplos sobre o funcionamento

// tem nos dois arrays
const user01 = new Set([
    'hugo',
    'mariazinha',
    'xuxa da silva'
]);

const user02 = new Set([
    'jack',
    'july',
    'hugo'
]);

const intersection = new Set([...user01].filter(user => user02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ['hugo']);

const diff = new Set([...user01].filter(user => !user02.has(user)));
assert.deepStrictEqual(Array.from(diff), ['mariazinha', 'xuxa da silva']);

// weakSet

// somente metodos simples
// só trabalha com chaves como referência

const user1 = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user1]);
// weakSet.add(user02);
// weakSet.delete(user02);
// weakSet.has(user02);