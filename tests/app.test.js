const request = require("supertest");
const app = require("../src/app");

describe("Lab API", () => {
  test("health endpoint returns success", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("user lookup returns a known user", async () => {
    const response = await request(app)
      .get("/users")
      .query({ username: "alice" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, username: "alice" }
    ]);
  });
});