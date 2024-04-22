const CarRepository = require("../repository/carRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new CarRepository({ file: cars });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
  }
}

module.exports = CarService;
