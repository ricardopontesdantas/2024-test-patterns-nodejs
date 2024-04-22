const BaseRepository = require("./base/baseRepository");

class CarRepository extends BaseRepository {
  constructor({ file }) {
    super(file);
  }
}

module.exports = CarRepository;
