9999999999999999 // 16
// 10000000000000000
true + 2
// 3
'21' + true
// '21true'   
'21' - true
// 20
'21'- -1
// 22  
0.1 + 0.2 === 0.3
// false
3 > 2 > 1 
// false
3 > 2 >= 1
// true
"B" + "a" + + "a" + "a"
// 'BaNaNa'
'1' == 1
// true
'1' === 1
// false

// --------------

console.assert(String(123) === '123', 'explicit convertion to string');
console.assert(123 + '' === '123', 'implicit convertion to string');

console.assert(('hello' || 123) === 'hello', "|| return the first element if both are true");
console.assert(('hello' && 123) === 123, "&& return the first element if both are true");

// --------------

const item = {
    name: 'HL',
    age: 26,
    // string: 1 se não for primitivo, chama o valueOf
    toString() {
        return `Name: ${this.name}, Age: ${this.age}`
    },
    // number: 1 se não for primitivo, chama o toString
    valueOf() {
        return { hey: 'dude' }
    },
    // ele tem prioridade na parada!
    [Symbol.toPrimitive](coercionType) {
        console.log('trying to convert to ', coercionType);
        const types = {
            string: JSON.stringify(this),
            number: '0007'
        }

        return types[coercionType] || types.string
    }
}

// console.log('toString: ', String(item));
// retorna NaN pois o toString retornou a string
// console.log('valueOf: ', Number(item));

// depois de adicionar o toPrimitive
// console.log('String', String(item));
//console.log('Number', Number(item));
// chama a conversão default
// console.log('Date', new Date(item));

console.assert(item + 0 === `{"name":"HL","age":26}0`);
// console.log(!!item);
// true

// console.log('string.concat', 'Ae'.concat(item));
console.assert('Ae'.concat(item) === `Ae{"name":"HL","age":26}`);

// console.log('implicit + explicit coercion (using ==)', item == String(item));
console.assert(item == String(item), true);

const item2 = { ...item, name: 'Zé', age: 32 };
// console.log('New Object', item2);
console.assert(item2.name === 'Zé' && item2.age === 32);