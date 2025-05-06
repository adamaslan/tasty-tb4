const { createRequestHandler } = require("@netlify/remix-adapter");

module.exports = createRequestHandler({
  build: require("./build")
});
