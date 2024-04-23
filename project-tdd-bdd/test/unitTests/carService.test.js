const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const { join } = require("path");
const { createSandbox } = require("sinon");
const CarService = require("../../src/service/carService");
const carsDatabase = join(__dirname, "..", "..", "database", "cars.json");
const mocks = {
  carCategory: require("../mocks/valid-car-category"),
  car: require("../mocks/valid-car"),
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
      .returns(carIndex);
    const output = carService.chooseRandomCar(input);
    const expected = input.carIds[carIndex];
    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(output).to.be.equal(expected);
  });

  it("given a carCategory it should return an available car", async () => {
    const car = mocks.car;
    const input = Object.create(mocks.carCategory);
    input.carIds = [car.id];
    sinon.spy(carService, carService.chooseRandomCar.name);
    sinon
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);
    const output = await carService.getAvailableCar(input);
    const expected = mocks.car;
    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id));
    expect(output).to.be.deep.equal(expected);
  });
});
