/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    // v2_meta: true, // Disabled to use v1 meta format
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  // serverModuleFormat: "esm", // Opt-in early to ESM format <mcreference link="https://remix.run/docs/en/v1.16.0/pages/v2#servermoduleformat" index="5">5</mcreference>
  // serverModuleFormat: "cjs", // Or explicitly keep CJS if needed <mcreference link="https://remix.run/docs/en/v1.16.0/pages/v2#servermoduleformat" index="5">5</mcreference>
  // Remove serverBuildTarget as it's deprecated <mcreference link="https://remix.run/docs/en/v1.15.0/pages/v2#serverbuildtarget" index="0">0</mcreference>
  // serverBuildTarget: "netlify", // <--- Remove or comment out this line if it exists
};
