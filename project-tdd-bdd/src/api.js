const http = require("http");

const routes = {
  default: function (request, response) {
    response.writeHead(404);
    response.write("not found");
    return response.end();
  },
};

function handle(request, response) {
  const { method, url } = request;
  const routeKey = `${method}:${url}`.toLowerCase();
  const choosen = routes[routeKey] || routes.default;
  return choosen(request, response);
}

const app = http
  .createServer(handle)
  .listen(3000, () => console.log("running at port 3000"));

module.exports = app;
