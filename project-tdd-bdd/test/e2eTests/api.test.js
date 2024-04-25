const { describe, it, before, after } = require("mocha");
const supertest = require("supertest");

describe("API Suite Test", () => {
  let app;

  before((done) => {
    app = require("./../../src/api");
    app.once("listening", done);
  });

  after((done) => app.close(done));

  describe("/non-existing:get", () => {
    it("should request a non-existing url and return http status 404", async () => {
      await supertest(app).get("/non-existing").expect(404);
    });
  });
});

