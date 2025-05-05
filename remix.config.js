/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  future: {
    v2_dev: true, // Addresses the `remix dev` warning <mcreference link="https://remix.run/docs/en/main/pages/v2#dev-server" index="7">7</mcreference>
    v2_errorBoundary: true, // Addresses the CatchBoundary/ErrorBoundary warning <mcreference link="https://remix.run/docs/en/v1.15.0/pages/v2#catchboundary-and-errorboundary" index="1">1</mcreference>
    v2_headers: true, // Addresses the route `headers` API warning <mcreference link="https://remix.run/docs/en/v1.17.0/pages/v2#route-headers" index="4">4</mcreference>
    v2_meta: true, // Addresses the route `meta` API warning <mcreference link="https://remix.run/docs/en/v1.15.0/pages/v2#meta" index="3">3</mcreference>
    v2_normalizeFormMethod: true, // Addresses the `formMethod` API warning <mcreference link="https://remix.run/docs/en/v1.15.0/pages/v2#formMethod" index="2">2</mcreference>
    v2_routeConvention: true, // Addresses the route file convention warning <mcreference link="https://remix.run/docs/en/v1.15.0/pages/v2#file-system-route-convention" index="6">6</mcreference>
  },
  // serverModuleFormat: "esm", // Opt-in early to ESM format <mcreference link="https://remix.run/docs/en/v1.16.0/pages/v2#servermoduleformat" index="5">5</mcreference>
  // serverModuleFormat: "cjs", // Or explicitly keep CJS if needed <mcreference link="https://remix.run/docs/en/v1.16.0/pages/v2#servermoduleformat" index="5">5</mcreference>
  // Remove serverBuildTarget as it's deprecated <mcreference link="https://remix.run/docs/en/v1.15.0/pages/v2#serverbuildtarget" index="0">0</mcreference>
  // serverBuildTarget: "netlify", // <--- Remove or comment out this line if it exists
};
