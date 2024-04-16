class Service {
  async makeRequest(url) {
    const response = await fetch(url);
    return response.json();
  }

  async getPlanets(url) {
    const response = await this.makeRequest(url);
    const data = {
      name: response.name,
      surfaceWater: response.surface_water,
      moviesAppeared: response.films.length,
    };
    return data;
  }
}

module.exports = Service;
