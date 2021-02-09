const { describe, it } = require('mocha');
const request = require('supertest');
const app = require('./api');
const assert = require('assert')

describe('API Suite test', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP Status 200', async() => {
            const response = await request(app)
                                    .get('/contact')
                                    .expect(200);
            assert.deepStrictEqual(response.text, 'Contact us page\n');
        })
    })
    describe('/hello', () => {
        it('should request an inexistent route /hi and redirect to /hello', async() => {
            const response = await request(app)
                                    .get('/hi')
                                    .expect(200);
            assert.deepStrictEqual(response.text, 'Hello World!\n');
        })
    })
    describe('/login', () => {
        it('should login successfully on the login route and return HTTP Status 200', async() => {
            const response = await request(app)
                                    .post('/login')
                                    .send({username: 'HugoLacerda', password: '123'})
                                    .expect(200);
            assert.deepStrictEqual(response.text, 'Login has succeeded!\n');
        })
        it('should not login on the login route using wrong credendials and return HTTP Status 401', async() => {
            const response = await request(app)
                                    .post('/login')
                                    .send({username: 'HugoRock', password: '123'})
                                    .expect(401);

            assert.deepStrictEqual(response.text, 'Logging failed!\n');
            assert.deepStrictEqual(response.unauthorized, true);
        })
    })
})