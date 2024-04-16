const assert = require("assert");
const { createSandbox } = require("sinon");
const sinon = createSandbox();
const Service = require("./service");
const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";
const mocks = {
  tatooine: require("../mocks/tatooine.json"),
  alderaan: require("../mocks/alderaan.json"),
};
(async () => {
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);
  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);
  {
    const result = await service.getPlanets(BASE_URL_1);
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      moviesAppeared: 5,
    };
    assert.deepStrictEqual(
      result,
      expected,
      "it should return a planet tatooinee from swapi"
    );
  }
  {
    const result = await service.getPlanets(BASE_URL_2);
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      moviesAppeared: 2,
    };
    assert.deepStrictEqual(
      result,
      expected,
      "it should return a planet alderaan from swapi"
    );
  }
})();
