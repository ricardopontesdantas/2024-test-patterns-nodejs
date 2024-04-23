const CarRepository = require("../repository/carRepository");

class CarService {
  constructor({ cars }) {
    this.carRepository = new CarRepository({ file: cars });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];
    return carId;
  }
}

module.exports = CarService;
