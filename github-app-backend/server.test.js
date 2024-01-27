const request = require("supertest");
const app = require("./server");

describe("GET /api/users/:username", () => {
  it("should respond with user data for a valid username", async () => {
    const username = "validUsername";
    const response = await request(app).get(`/api/users/${username}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("login");
    expect(response.body).toHaveProperty("avatar_url");
  });
});
