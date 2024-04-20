const { describe, it, before, after } = require("mocha");
const supertest = require("supertest");

describe("API Suite Test", () => {
  let app;
  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });
  after((done) => app.close(done));
  describe("/:get", () => {
    it("should request the root route and must return http status 200", async () => {
      await supertest(app).get("/").expect(200);
    });
  });
  describe("/contact:get", () => {
    it("should request the contact route and must return http status 200", async () => {
      await supertest(app).get("/contact").expect(200);
    });
  });
  describe("/login:post", () => {
    it("should request the login route and must return http status 201", async () => {
      await supertest(app)
        .post("/login")
        .send({ username: "peter", password: "123456" })
        .expect(201);
    });
    it("should request the login route and must return http status 401", async () => {
      await supertest(app)
        .post("/login")
        .send({ username: "john", password: "123123" })
        .expect(401);
    });
  });
});
