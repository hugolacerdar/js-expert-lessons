import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import OrderBusiness from "../src/business/orderBusiness.js";
import Order from "../src/entities/order.js";

describe('Test suite for Template Method design pattern', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    })
    
    describe('#OrderBusiness', () => {
        test('executing Order Business without Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100000,
                products: [{ description: 'ferrari' }]
            });

            const orderBusiness = new OrderBusiness();
            // todos devs devem lembrar de seguir a risca este fluxo de execução
            // caso algum esqueça de chamar a função de validação, pode quebrar todo o sistema

            const isValid = orderBusiness._validateRequiredFields(order);

            expect(isValid).toBeTruthy();

            const result = orderBusiness._create(order);
            expect(result).toBeTruthy();
        });

        test('executing Order Business with Template Method', () => {
            const order = new Order({
                customerId: 1,
                amount: 100000,
                products: [{ description: 'ferrari' }]
            });

            const orderBusiness = new OrderBusiness();
            const calledValidationFn = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequiredFields.name
            );
            const calledCreationFn = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name
            );
            // com template method a sequencia de passos é sempre executada,
            // evitando replicação de lógica

            const result = orderBusiness.create(order);

            expect(result).toBeTruthy();
            expect(calledValidationFn).toHaveBeenCalled();
            expect(calledCreationFn).toHaveBeenCalled();
        });
    })
})