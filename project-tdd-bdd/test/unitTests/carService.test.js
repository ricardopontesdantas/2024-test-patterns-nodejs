const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const { join } = require("path");
const { createSandbox } = require("sinon");
const CarService = require("../../src/service/carService");
const carsDatabase = join(__dirname, "..", "..", "database", "cars.json");
const mocks = {
  carCategory: require("../mocks/valid-car-category"),
};

describe("CarService Suite Tests", () => {
  let carService;
  let sinon;

  before(() => {
    carService = new CarService({ cars: carsDatabase });
  });

  beforeEach(() => (sinon = createSandbox()));

  afterEach(() => sinon.restore());

  it("should retrieve a random position from an array", () => {
    const input = [0, 1, 2, 3, 4];
    const output = carService.getRandomPositionFromArray(input);
    expect(output).to.be.gte(0).and.lt(input.length);
  });

  it("sould choose the first id from carIds in carCategory", () => {
    const input = mocks.carCategory;
    const carIndex = 0;
    sinon
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(0);
    const output = carService.chooseRandomCar(input);
    const expected = input.carIds[carIndex];
    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(output).to.be.equal(expected);
  });
});
