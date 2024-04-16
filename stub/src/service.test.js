const assert = require("assert");
const { createSandbox } = require("sinon");
const sinon = createSandbox();
const Service = require("./service");
const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const mocks = {
  tatooine: require("../mocks/tatooine.json"),
};
(async () => {
  {
    const service = new Service();
    const stub = sinon.stub(service, service.makeRequest.name);
    stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
    const result = await service.getPlanets(BASE_URL_1);
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      moviesAppeared: 5,
    };
    assert.deepStrictEqual(
      result,
      expected,
      "should return a planet from swapi"
    );
  }
})();
