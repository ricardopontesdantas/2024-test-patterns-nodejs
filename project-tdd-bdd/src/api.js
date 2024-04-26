const http = require("http");
const { once } = require("events");
const { join } = require("path");
const CarService = require("./service/carService");
const carDatabase = join(__dirname, "..", "database", "cars.json");

const routes = {
  "/available-car:post": async function (request, response) {
    const carCategory = JSON.parse(await once(request, "data"));
    if (!Object.keys(carCategory).length) {
      response.writeHead(400);
      response.write("invalid payload");
      response.end();
    }
    const carService = new CarService({ cars: carDatabase });
    const availableCar = await carService.getAvailableCar(carCategory);
    if (!availableCar) {
      response.writeHead(404);
      response.write("resource not found");
      return response.end();
    }
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(availableCar));
    return response.end();
  },
  "/calculate-price:post": async function (request, response) {
    const { carCategory, customer, numberOfDays } = JSON.parse(
      await once(request, "data")
    );
    if (!carCategory || !customer || !numberOfDays) {
      response.writeHead(400);
      response.write("invalid payload");
      response.end();
    }
    const carService = new CarService({ cars: carDatabase });
    const finalPrice = carService.calculateFinalPrice(
      carCategory,
      customer,
      numberOfDays
    );
    response.writeHead(200);
    response.write(JSON.stringify(finalPrice));
    return response.end();
  },
  default: function (request, response) {
    response.writeHead(404);
    response.write("resource not found");
    return response.end();
  },
};

function handle(request, response) {
  const { method, url } = request;
  const routeKey = `${url}:${method}`.toLowerCase();
  const choosen = routes[routeKey] || routes.default;
  return choosen(request, response);
}

const app = http
  .createServer(handle)
  .listen(3000, () => console.log("running at port 3000"));

module.exports = app;
