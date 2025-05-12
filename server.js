const path = require("path");
const { createRequestHandler } = require("@remix-run/netlify");

// Define the build directory where Remix outputs its server build
const BUILD_DIR = path.join(process.cwd(), "netlify");

// This function allows you to pass data from the serverless function to your Remix app
function getLoadContext(event, context) {
  return {
    env: process.env,
    // You can add additional context data here if needed
  };
}

// Create the Remix request handler for Netlify
const remixHandler = createRequestHandler({
  build: require(BUILD_DIR),
  getLoadContext,
  mode: process.env.NODE_ENV,
});

// Export the handler function for Netlify Functions
exports.handler = async (event, context) => {
  return remixHandler(event, context);
};