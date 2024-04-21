const faker = require("faker");
const { writeFile } = require("fs/promises");
const { join } = require("path");
const CarCategory = require("../src/entities/car-category");
const Car = require("../src/entities/car");
const Customer = require("../src/entities/customer");

const ITEMS_AMOUNT = 3;
const seederBaseFolder = join(__dirname, "..", "database");
const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});
const cars = [];
const customers = [];
for (let i = 0; i < ITEMS_AMOUNT; i++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    releaseYear: faker.date.past().getFullYear(),
    available: true,
    gasAvailable: true,
  });
  cars.push(car);
  carCategory.carIds.push(car.id);
  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    age: faker.datatype.number({ min: 18, max: 50 }),
  });
  customers.push(customer);
}

const write = (filename, data) =>
  writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

(async () => {
  await write("cars.json", cars);
  await write("customers.json", customers);
  await write("car-category.json", [carCategory]);
})();
