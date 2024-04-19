const http = require("http");
const { once } = require("events");
const DEFAULT_USER = {
  username: "Peter",
  password: "123456",
};
const routes = {
  "/:get": function (request, response) {
    response.write("home page");
    return response.end();
  },
  "/contact:get": function (request, response) {
    response.write("contact page");
    return response.end();
  },
  "/login:post": async function (request, response) {
    const user = JSON.parse(await once(request, "data"));
    const toLower = (text) => text.toLowerCase();
    if (
      toLower(user.username) !== toLower(DEFAULT_USER.username) ||
      user.password !== DEFAULT_USER.password
    ) {
      response.writeHead(401);
      response.write("login failed");
      return response.end();
    }
    response.writeHead(201);
    response.write("login successfully");
    return response.end();
  },
  default: function (request, response) {
    response.writeHead(404);
    response.write("not found");
    return response.end();
  },
};

function handler(request, response) {
  const { method, url } = request;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
}

const app = http
  .createServer(handler)
  .listen(3000, () => console.log("running at 3000"));

module.exports = app;
