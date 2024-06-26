const { describe, it, before, after } = require("mocha");
const supertest = require("supertest");
const mocks = {
  validCarCategory: require("../mocks/valid-car-category.json"),
  invalidCarCategory: require("../mocks/invalid-car-category.json"),
  customer: require("../mocks/valid-customer.json"),
};

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

  describe("/available-car:post", () => {
    it("should request available car route and return http status 200", async () => {
      await supertest(app)
        .post("/available-car")
        .send(mocks.validCarCategory)
        .expect(200);
    });

    it("should request available car route and return http status 400", async () => {
      await supertest(app).post("/available-car").send({}).expect(400);
    });

    it("should request available car route and return http status 404", async () => {
      await supertest(app)
        .post("/available-car")
        .send(mocks.invalidCarCategory)
        .expect(404);
    });
  });

  describe("/calculate-price:post", () => {
    it("should request calculate price route and return http status 200", async () => {
      const input = {
        carCategory: mocks.validCarCategory,
        customer: mocks.customer,
        numberOfDays: 5,
      };
      await supertest(app).post("/calculate-price").send(input).expect(200);
    });

    it("should request calculate price route and return http status 400", async () => {
      await supertest(app).post("/calculate-price").send({}).expect(400);
    });
  });

  describe("/transaction/register:post", () => {
    it("should request transaction register route and return http status 201", async () => {
      const input = {
        carCategory: mocks.validCarCategory,
        customer: mocks.customer,
        numberOfDays: 5,
      };
      await supertest(app)
        .post("/transaction/register")
        .send(input)
        .expect(201);
    });

    it("should request transaction register route and return http status 400", async () => {
      await supertest(app).post("/transaction/register").send({}).expect(400);
    });

    it("should request transaction register route and return http status 404", async () => {
      const input = {
        carCategory: mocks.invalidCarCategory,
        customer: mocks.customer,
        numberOfDays: 5,
      };
      await supertest(app)
        .post("/transaction/register")
        .send(input)
        .expect(404);
    });
  });
});
