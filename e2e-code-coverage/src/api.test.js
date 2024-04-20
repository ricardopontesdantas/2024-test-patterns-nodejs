const { describe, it, before, after } = require("mocha");
const supertest = require("supertest");
const assert = require("assert");

describe("API Suite Test", () => {
  let app;
  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });
  after((done) => app.close(done));
  describe("/:get", () => {
    it("should request the root route and must return http status 200", async () => {
      const response = await supertest(app).get("/").expect(200);
      const expectedText = "home page";
      assert.strictEqual(response.text, expectedText);
    });
  });
  describe("/contact:get", () => {
    it("should request the contact route and must return http status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);
      const expectedText = "contact page";
      assert.strictEqual(response.text, expectedText);
    });
  });
  describe("/login:post", () => {
    it("should request the login route and must return http status 201", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "peter", password: "123456" })
        .expect(201);
      const expectedText = "login successfully";
      assert.strictEqual(response.text, expectedText);
    });
    it("should request the login route and must return http status 401", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "john", password: "123123" })
        .expect(401);
      const expectedText = "login failed";
      assert.strictEqual(response.text, expectedText);
    });
  });
  describe("/not-found:get", () => {
    it("should request a non-existent route and must return http status 404", async () => {
      const response = await supertest(app).get("/not-found").expect(404);
      const expectedText = "not found";
      assert.strictEqual(response.text, expectedText);
    });
  });
});
