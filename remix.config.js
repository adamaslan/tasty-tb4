/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "netlify",
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app", // Default: "app"
  assetsBuildDirectory: "public/build", // Default: "public/build"
  serverBuildPath: ".netlify/functions-internal/server.js", // Default for Netlify target
  publicPath: "/build/", // Default: "/build/"
};
