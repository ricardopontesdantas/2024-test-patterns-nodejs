const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const { join } = require("path");
const CarService = require("../../src/service/carService");
const carsDatabase = join(__dirname, "..", "..", "database", "cars.json");

describe("CarService Suite Tests", () => {
  let carService;

  before(() => {
    carService = new CarService({ cars: carsDatabase });
  });

  it("should retrieve a random position from an array", () => {
    const input = [0, 1, 2, 3, 4];
    const output = carService.getRandomPositionFromArray(input);
    expect(output).to.be.gte(0).and.lt(input.length);
  });
});
