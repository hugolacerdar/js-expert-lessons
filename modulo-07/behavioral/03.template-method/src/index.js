import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entities/order.js";

const order = new Order({
    customerId: 'abc100',
    amount: 100.000,
    products: [{ description: 'shampoo' }]
});

const orderBusiness = new OrderBusiness();
console.info('orderCreated', orderBusiness.create(order));