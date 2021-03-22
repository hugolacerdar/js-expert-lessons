const assert = require('assert');

const myMap = new Map();
// qualquer coisa como chave
myMap
    .set(1, 'one')
    .set('Hugo', {
        text: 'two'
    })
    .set(true, () => 'hello');

// usando um construtor
const myMapWConstructor = new Map([
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
]);

// console.log('myMap', myMap);
// console.log('myMap.get(1)', myMap.get(1));
assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Hugo'), {text:'two'});
assert.deepStrictEqual(myMap.get(true)(), 'hello');

// em object a chave só pode ser string ou symbol (number é coagido a string)
const onlyRefWorks = {
    id: 1
};

myMap.set(onlyRefWorks, {name: 'Hugo'});

assert.deepStrictEqual(myMap.get({id: 1}), undefined);
assert.deepStrictEqual(myMap.get(onlyRefWorks), {name: 'Hugo'});

// -No Object seria Object.keys({ a: 1 }).length
assert.deepStrictEqual(myMap.size, 4);

//  -Para verificar se um item existe seria item.key = se não existe = undefined
// if() = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({name: 'Hugo'}).hasOwnProperty('name')

assert.ok(myMap.has(onlyRefWorks));

// -Para remover um item do objeto: delete item.id
// imperformático para o JS
assert.ok(myMap.delete(onlyRefWorks));

// -Não dá para iterar em object diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Hugo",{"text":"two"}],[true,() => {}]]));

// for(const [key, value] of myMap) console.log({key, value});

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento
// ({ }).toString() => '[object Object]'
//({toString: () => 'Hey'}).toString() === 'Hey' 

// qualquer chave pode colidir com as propriedades herdadas do object, como
// constructor, toString, valueOf, etc

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva'
};

// não há restrição de chave

myMap.set(actor);

assert.ok(myMap.has(actor));

assert.throws(() => myMap.get(actor).toString, TypeError); 

// Não dá para limpar um Ob ject sem reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);


// --- WeakMap

// Pode ser coletado após perder as referências
// usado em casos beeem específicos

// maioria dos benefícios do Map, MAS não é iteravel
// Só chaves de referência e que você já conheça
// mais leve e prevê o memory leak, porque depois que as instancias saem da memória, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: 'Flash' };

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.delete(hero);
// weakMap.has(hero);