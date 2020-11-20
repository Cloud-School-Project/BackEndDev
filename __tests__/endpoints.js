const supertest = require("supertest");
const server = require("../server");

describe("endpoints works", () => {
  it("student endpoints works", () => {
    return supertest(server)
      .post("/student/register")
      .send({ username: "test", password: "password", email: "email@email" })
    });

  it('student login', () => {
    return supertest(server)
    .post('/student/login')
    .send({ username: "test", password: "password", email: "email@email" }) 
  })

  it('volunteer endpoints work', () => {
    return supertest(server)
    .post('/volunteer/register')
    .send({ username: 'hello', password: 'password', email: 'works@gmail.com' })
  })
  it('volunteer login', () => {
    return supertest(server)
    .post('/volunteer/login')
    .send({ username: 'hello', password: 'password', email: 'works@gmail.com' })
  })

  it('class endpoints work', () => {
    return supertest(server)
    .get('/classes/class')
  })

  it('can put a class', () => {
    return supertest(server)
    .put('/classes/class')
    .send({ subject: "math",  boolean: 1 })
  })

  it('can post new class', () => {
    return supertest(server)
    .post('/classes/class')
    .send({ subject: 'HTML', boolean: 0 })
  })

});
