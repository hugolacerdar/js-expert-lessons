const { describe, it } = require('mocha');
const { expect } = require('chai');
const { InvalidRegexError, evaluateRegex } = require('./../src/util');

describe('Util', () => {
    it('#evaluateRegex should throw an error if using an unsafe regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+s/;
        expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `The expression ${unsafeRegex} is unsafe!`);
    });
    it('#evaluateRegex should not throw an error if using a safe regex', () => {
        const safeRegex = /^([a-z])$/;
        expect(() => evaluateRegex(safeRegex)).to.not.throw;
        expect(evaluateRegex(safeRegex)).to.be.deep.equal(/^([a-z])$/);
        
    });
})