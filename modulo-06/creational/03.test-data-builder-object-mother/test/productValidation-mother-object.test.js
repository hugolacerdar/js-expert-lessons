const { expect } = require('chai');
const { it, describe } = require('mocha');
const { productValidator } = require('../src');
const ProductObjectMother = require('./model/productObjectMother');

describe('Test Mother Object', () => {
    it('shouldn\'t return error with valid product', () => {
        const product = ProductObjectMother.valid();
        const result = productValidator(product);

        const expected = {
            errors: [],
            result: true
        };

        expect(result).to.be.deep.equal(expected);
    });

    describe('Product Validation Rules', () => {
        it('should return an object error when creating a product with invalid id', () => {
            const product = ProductObjectMother.withInvalidId();

            const result = productValidator(product);
    
            const expected = {
                errors: ["id: invalid length, current [1] expected to be between 2 and 20"],
                result: false
            };
    
            expect(result).to.be.deep.equal(expected);
    
        });
        it('should return an object error when creating a product with invalid name', () => {
            const product = ProductObjectMother.withInvalidName();

            const result = productValidator(product);
    
            const expected = {
                errors: ["name: invalid value, current [abc123] expected to have only words"],
                result: false
            };
    
            expect(result).to.be.deep.equal(expected);
    
        });
        it('should return an object error when creating a product with invalid price', () => {
            const product = ProductObjectMother.withInvalidPrice();

            const result = productValidator(product);
    
            const expected = {
                errors: ["price: invalid value, current [2000] expected to be between 1 and 1000"],
                result: false
            };
    
            expect(result).to.be.deep.equal(expected);
    
        });
        it('should return an object error when creating a product with invalid category', () => {
            const product = ProductObjectMother.withInvalidCategory();

            const result = productValidator(product);
    
            const expected = {
                errors: ["category: invalid value, current [analogic] expected to be either electronic or organic"],
                result: false
            };
    
            expect(result).to.be.deep.equal(expected);
    
        });
    })
})