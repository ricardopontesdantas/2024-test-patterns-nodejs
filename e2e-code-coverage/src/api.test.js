const { describe, it } = require("mocha");
const supertest = require("supertest");
const app = require("./api");

describe("API Suite Test", () => {
  describe("/:get", () => {
    it("should request the root route and must return http status 200", async () => {
      await supertest(app).get("/").expect(200);
    });
  });
});
