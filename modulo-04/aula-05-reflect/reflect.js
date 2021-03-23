'use strict'

const assert = require('assert');

// garantir semantica e segurança em objetos

// ---- apply
const myObj = {
    add(myValue) {
        return this.arg1 + this.arg2 + myValue
    }
};

assert.deepStrictEqual(myObj.add.apply({arg1: 10, arg2: 20}, [100]), 130);

// um possível problema (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!') };

// mais comum
myObj.add.apply = function() { throw new Error('Vixê') };

assert.throws(() => myObj.add.apply({},[]), {
    name: 'Error',
    message: 'Vixê'
});

// usando Reflect
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);
// --- apply

// --- defineProperty

// --- questões semânticas
function MyDate() {};

// feio demais, tudo é Obj, mas Obj adicionando prop para uma função???
Object.defineProperty(MyDate, 'withObjects', { value: () => 'Hey there' });

Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' });

assert.deepStrictEqual(MyDate.withObjects(), 'Hey there');
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude');
// --- defineProperty

// --- deleteProperty
const withDelete = { user: 'HugoLacerda' };
// imperformático, evitar ao máximo
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false);

const withReflection = { user: 'Xuxa' };
Reflect.deleteProperty(withReflection, 'user');
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false);
// --- deleteProperty

// ---- get

// Deveriamos fazer um get em instâncias de referencia
assert.deepStrictEqual(1['userName'], undefined);
// com Reflection uma exceção é disparada
assert.throws(() => Reflect.get(1, 'userName'), TypeError);
// ---- get

// ---- has

assert.ok('superman' in { superman: '' });
assert.ok(Reflect.has({ batman: '' }, 'batman'));
// ---- has


// ---- ownKeys

const user = Symbol('user');
const myObject = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'hugolacerdar'
};
// Com os metodos de obj, temos que fazer duas requisições
const objectKeys = [
    ...Object.getOwnPropertyNames(myObject),
    ...Object.getOwnPropertySymbols(myObject)
];
assert.deepStrictEqual(objectKeys, [ 'id', Symbol.for('password'), user ]);

// com reflection é um único método
assert.deepStrictEqual(Reflect.ownKeys(myObject), [ 'id', Symbol.for('password'), user ]);
// ---- ownKeys



