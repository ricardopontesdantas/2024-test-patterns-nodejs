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
});
