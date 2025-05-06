const { createRequestHandler } = require("@netlify/remix-adapter");

module.exports = createRequestHandler({
  build: require("./build"),
  // Add these lines for production error handling
  mode: process.env.NODE_ENV,
  getLoadContext() {
    return { env: process.env };
  }
});