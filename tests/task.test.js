const request = require("supertest");
const app = require("../src/server");

describe("Task API", () => {

  test("Should not create task without authentication token", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task"
      });

    expect(res.statusCode).toBe(401);
  });

  test("Should not access tasks without authentication token", async () => {
    const res = await request(app)
      .get("/tasks");

    expect(res.statusCode).toBe(401);
  });

});