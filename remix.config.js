/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "netlify",
  server: "./server.js",
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*"]
};
