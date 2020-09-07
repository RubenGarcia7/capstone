const app = require('../server') 
const supertest = require('supertest')
const request = supertest(app)

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", async done => {
     const response = await request.get('/test');

     expect(response.body.message).toBe('Hello');

     done();
  })
});