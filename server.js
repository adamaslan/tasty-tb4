const { createRequestHandler } = require("@remix-run/netlify");

// This is the correct way to export the handler for Netlify Functions
exports.handler = createRequestHandler({
  build: require("./build"),
  mode: process.env.NODE_ENV
});



