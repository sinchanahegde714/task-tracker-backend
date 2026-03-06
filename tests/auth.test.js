const request = require("supertest");
const app = require("../src/server");

describe("Auth API", () => {

  // unique email for every test run
  const user = {
    name: "Test User",
    email: `test${Date.now()}@test.com`,
    password: "123456"
  };

  test("Register user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  });

  test("Login user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: user.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

});