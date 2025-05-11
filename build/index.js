var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// empty-module:../components/chicken.client
var require_chicken = __commonJS({
  "empty-module:../components/chicken.client"(exports, module2) {
    module2.exports = {};
  }
});

// empty-module:../components/Cloud.client
var require_Cloud = __commonJS({
  "empty-module:../components/Cloud.client"(exports, module2) {
    module2.exports = {};
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = require("react-dom/server"), import_react = require("@remix-run/react"), import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 12,
      columnNumber: 5
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_node2 = require("@remix-run/node"), import_react4 = require("@remix-run/react");

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-QRM7XUYF.css";

// app/session.server.ts
var import_node = require("@remix-run/node"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));

// app/models/user.server.ts
var import_supabase_js = require("@supabase/supabase-js"), import_tiny_invariant = __toESM(require("tiny-invariant")), supabaseUrl = process.env.SUPABASE_URL, supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
(0, import_tiny_invariant.default)(
  supabaseUrl,
  "SUPABASE_URL must be set in your environment variables."
);
(0, import_tiny_invariant.default)(
  supabaseAnonKey,
  "SUPABASE_ANON_KEY must be set in your environment variables."
);
var supabase = (0, import_supabase_js.createClient)(supabaseUrl, supabaseAnonKey);
async function createUser(email, password) {
  let { user } = await supabase.auth.signUp({
    email,
    password
  });
  return await getProfileByEmail(user == null ? void 0 : user.email);
}
async function getProfileById(id) {
  let { data, error } = await supabase.from("profiles").select("email, id").eq("id", id).single();
  if (error)
    return null;
  if (data)
    return { id: data.id, email: data.email };
}
async function getProfileByEmail(email) {
  let { data, error } = await supabase.from("profiles").select("email, id").eq("email", email).single();
  if (error)
    return null;
  if (data)
    return data;
}
async function verifyLogin(email, password) {
  let { user, error } = await supabase.auth.signIn({
    email,
    password
  });
  return error ? void 0 : await getProfileByEmail(user == null ? void 0 : user.email);
}

// app/session.server.ts
(0, import_tiny_invariant2.default)(
  process.env.SESSION_SECRET,
  "SESSION_SECRET must be set in your environment variables."
);
var sessionStorage = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
}), USER_SESSION_KEY = "userId";
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (userId === void 0)
    return null;
  let user = await getProfileById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let userId = await getUserId(request);
  if (!userId) {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
async function createUserSession({
  request,
  userId,
  remember,
  redirectTo
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), (0, import_node.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : void 0
      })
    }
  });
}
async function logout(request) {
  let session = await getSession(request);
  return (0, import_node.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// app/components/Navbar.tsx
var import_react2 = require("@remix-run/react"), import_react3 = require("react"), import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), Nav = () => {
  let [isOpen, setIsOpen] = (0, import_react3.useState)(!1);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex items-center justify-between p-4 flex-wrap bg-skin-base text-skin-base", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      import_react2.Link,
      {
        prefetch: "intent",
        to: "/",
        className: "text-2xl font-extrabold font-palette-mosaic",
        children: [
          "Drinks Food",
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "font-light text-3xl", children: " Life" }, void 0, !1, {
            fileName: "app/components/Navbar.tsx",
            lineNumber: 18,
            columnNumber: 20
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/Navbar.tsx",
        lineNumber: 13,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      "div",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "flex flex-col cursor-pointer w-8 h-8 justify-around items-center md:hidden",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            "span",
            {
              className: `block w-8 h-[3px] bg-current transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`
            },
            void 0,
            !1,
            {
              fileName: "app/components/Navbar.tsx",
              lineNumber: 25,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            "span",
            {
              className: `block w-8 h-[3px] bg-current transition-opacity ${isOpen ? "opacity-0" : ""}`
            },
            void 0,
            !1,
            {
              fileName: "app/components/Navbar.tsx",
              lineNumber: 30,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            "span",
            {
              className: `block w-8 h-[3px] bg-current transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`
            },
            void 0,
            !1,
            {
              fileName: "app/components/Navbar.tsx",
              lineNumber: 35,
              columnNumber: 9
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/Navbar.tsx",
        lineNumber: 21,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      "div",
      {
        className: `flex flex-col items-center justify-between w-full mt-4 transition-all duration-300 ease-in-out md:flex-row md:mt-0 ${isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"} md:max-h-full md:w-auto`,
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            import_react2.Link,
            {
              prefetch: "intent",
              to: "./subscribe",
              className: "py-2 px-4 text-center text-current text-lg hover:text-yellow-500 transition-colors",
              children: "Subscribe"
            },
            void 0,
            !1,
            {
              fileName: "app/components/Navbar.tsx",
              lineNumber: 47,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            import_react2.Link,
            {
              prefetch: "intent",
              to: "./about",
              className: "py-2 px-4 text-center text-current text-lg hover:text-yellow-500 transition-colors",
              children: "About"
            },
            void 0,
            !1,
            {
              fileName: "app/components/Navbar.tsx",
              lineNumber: 54,
              columnNumber: 9
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/Navbar.tsx",
        lineNumber: 42,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/Navbar.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}, Navbar_default = Nav;

// app/root.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), meta = () => ({
  title: "Putting the Sass n Fun in Tech",
  "og:image": "box"
}), links = () => [{ rel: "stylesheet", href: tailwind_default }];
async function loader({ request }) {
  return (0, import_node2.json)({
    user: await getUser(request)
  });
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 38,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("body", { className: "h-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Navbar_default, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 46,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 47,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 37,
    columnNumber: 5
  }, this);
}

// app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx
var threekeys_to_getting_a_frontend_or_fullstackjob_exports = {};
__export(threekeys_to_getting_a_frontend_or_fullstackjob_exports, {
  default: () => Article4
});
var import_react5 = require("@remix-run/react");

// public/studio.jpg
var studio_default = "/build/_assets/studio-GM7VPPXH.jpg";

// app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function Article4() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
      "The 3 Keys To Getting Your Dream Frontend or Full Stack Engineer Job",
      " "
    ] }, void 0, !0, {
      fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
      lineNumber: 8,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
      "img",
      {
        className: "h-full w-full  ",
        src: studio_default,
        alt: "Studio by Warren Hansen"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
        lineNumber: 11,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
        lineNumber: 16,
        columnNumber: 102
      }, this),
      "If you are looking for a career in tech, focusing on developing your coding skills in front-end or full-stack development is essential. You can increase your chances of landing software engineering jobs by following the three keys of L.A.B. - Learn, Apply, and Build. Online learning and peer programming are excellent ways to improve your coding skills and stay updated with the latest trends in the industry. Creating practical projects and building a personal portfolio can help you gain experience and showcase your skills to potential employers.",
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
        lineNumber: 25,
        columnNumber: 31
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
        lineNumber: 25,
        columnNumber: 37
      }, this),
      " Utilizing job search strategies such as We Work Remotely, JSremote, and LinkedIn can help you find remote work opportunities. Preparing for coding interviews by creating features that may be asked is a smart way to showcase your practical knowledge. Professional development and continuous learning are crucial for staying updated with the latest trends in the industry. By following these strategies and staying persistent, you can transform your passion for coding into a successful career in software engineering.",
      " "
    ] }, void 0, !0, {
      fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
          lineNumber: 36,
          columnNumber: 104
        }, this),
        "The three keys to becoming a successful Software Engineer are:",
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
          lineNumber: 37,
          columnNumber: 75
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
          lineNumber: 37,
          columnNumber: 81
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-4xl", children: "L.A.B." }, void 0, !1, {
          fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
          lineNumber: 38,
          columnNumber: 12
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
          lineNumber: 38,
          columnNumber: 115
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
        lineNumber: 36,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("ol", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: "1. Learn - You can do this with online classes, peer programming, chatGPT, or just plain old college." }, void 0, !1, {
          fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
          lineNumber: 41,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          "2. Apply - How can you get a job if you don't apply for it. Wellfound,",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", { href: "https://www.weworkremotely.com", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("u", { children: "We Work Remotely" }, void 0, !1, {
            fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
            lineNumber: 49,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
            lineNumber: 48,
            columnNumber: 15
          }, this),
          ", JSremote, and good ol Linkedin are all great for this."
        ] }, void 0, !0, {
          fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
          lineNumber: 45,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: "3. Build - It's hard to gain any experience without building something. What you build can also be put on a personal website or portfolio as well so its a win win to build build build. Start small and scale up. Creating features that might be asked in a coding interview is always a smart idea." }, void 0, !1, {
          fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
          lineNumber: 53,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
        lineNumber: 40,
        columnNumber: 11
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
        lineNumber: 60,
        columnNumber: 21
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
      lineNumber: 35,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
      "Go back",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
        import_react5.Link,
        {
          to: "/",
          className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
          children: "Home"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
          lineNumber: 65,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
      lineNumber: 63,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/threekeys-to-getting-a-frontend-or-fullstackjob.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/routes/astro-the-most-innovative-javascript-framwork.tsx
var astro_the_most_innovative_javascript_framwork_exports = {};
__export(astro_the_most_innovative_javascript_framwork_exports, {
  default: () => Article5
});
var import_react6 = require("@remix-run/react");

// public/boxchicken2.jpeg
var boxchicken2_default = "/build/_assets/boxchicken2-FH7NOYDC.jpeg";

// app/routes/astro-the-most-innovative-javascript-framwork.tsx
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime");
function Article5() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
        " ",
        "Astro.js as the Most Innovative and Modern Javascript Framework",
        " "
      ] }, void 0, !0, {
        fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
        lineNumber: 9,
        columnNumber: 9
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
        "img",
        {
          className: "mx-auto my-auto h-1/2 w-1/2 ",
          src: boxchicken2_default,
          alt: "Chicken Box Space Ship"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
          lineNumber: 13,
          columnNumber: 9
        },
        this
      ),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "While there are established frameworks that have a loyal fanbase (React, Vue, Angular), and promising newcomers that offer a fresh perspective (Svelte, SolidJS), the most exciting and groundbreaking framework in the Javascript ecosystem is Astro.",
          " "
        ] }, void 0, !0, {
          fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
          lineNumber: 20,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
          lineNumber: 27,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "Astro is a new kind of framework that lets you build faster websites with your favorite UI components. Astro renders your pages to static HTML at build time for optimal performance. No JavaScript runtime required. You can use any UI component library (React, Vue, Svelte and more) or write your own components using HTML and CSS. Astro makes it easy to build modern websites without sacrificing performance or user experience.",
          " "
        ] }, void 0, !0, {
          fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
          lineNumber: 28,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: "Astro islands are interactive UI components that render in isolation on a static HTML page. They use partial hydration, a technique that Astro handles automatically, to enable multiple islands with different functionalities on the same page. Astro uses zero client-side JavaScript by default because it renders every component to HTML ahead of time and then strips out all the JavaScript Astro islands are like mini-apps that can coexist harmoniously in a sea of HTML, bringing life and interactivity to your web pages." }, void 0, !1, {
          fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
          lineNumber: 40,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
          lineNumber: 43,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "For the Astro docs, you can visit",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("a", { href: "https://astro.build/", className: "text-blue-500", children: [
            " ",
            "here"
          ] }, void 0, !0, {
            fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
            lineNumber: 47,
            columnNumber: 13
          }, this),
          ".",
          " "
        ] }, void 0, !0, {
          fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
          lineNumber: 44,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
          " ",
          "Go back",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            import_react6.Link,
            {
              to: "/",
              className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
              children: [
                " ",
                "Home",
                " "
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
              lineNumber: 56,
              columnNumber: 13
            },
            this
          ),
          " "
        ] }, void 0, !0, {
          fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
          lineNumber: 53,
          columnNumber: 11
        }, this),
        " "
      ] }, void 0, !0, {
        fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      " "
    ] }, void 0, !0, {
      fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    " "
  ] }, void 0, !0, {
    fileName: "app/routes/astro-the-most-innovative-javascript-framwork.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/what-are-the-best-free-text-to-speech-tools.tsx
var what_are_the_best_free_text_to_speech_tools_exports = {};
__export(what_are_the_best_free_text_to_speech_tools_exports, {
  default: () => what_are_the_best_free_text_to_speech_tools_default,
  meta: () => meta2
});
var import_react7 = require("@remix-run/react");

// public/text2speech.png
var text2speech_default = "/build/_assets/text2speech-NJSGYH4W.png";

// app/routes/what-are-the-best-free-text-to-speech-tools.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), meta2 = () => ({
  title: "Best Free Text-to-Speech (TTS) Tools & Apps",
  "og:image": text2speech_default,
  // Consider updating this image
  "og:title": "Best Free Text-to-Speech (TTS) Tools & Apps",
  "og:description": "Discover the best free text-to-speech (TTS) software and apps like NaturalReader, Voice Dream Reader, and built-in OS features for listening to text and audiobooks.",
  "og:type": "article",
  "twitter:card": "summary_large_image",
  "twitter:title": "Best Free Text-to-Speech (TTS) Tools & Apps",
  "twitter:description": "Discover the best free text-to-speech (TTS) software and apps like NaturalReader, Voice Dream Reader, and built-in OS features for listening to text and audiobooks.",
  "twitter:image": text2speech_default,
  // Consider updating this image
  "linkedin:title": "Best Free Text-to-Speech (TTS) Tools & Apps",
  "linkedin:description": "Discover the best free text-to-speech (TTS) software and apps like NaturalReader, Voice Dream Reader, and built-in OS features for listening to text and audiobooks.",
  "linkedin:image": text2speech_default,
  // Consider updating this image
  keywords: "Text-to-Speech, TTS, Free TTS, NaturalReader, Voice Dream, Speak4Me, Audiobooks, Accessibility, Text to Voice"
}), RemixPage = () => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "min-h-screen bg-gray-100 text-gray-800", children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("header", { className: "bg-teal-600 text-white py-6 shadow-lg", children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h1", { className: "text-3xl font-bold", children: "What are the Best Free Text-to-Speech Tools?" }, void 0, !1, {
        fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
        lineNumber: 33,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "mt-2", children: "Turn Text into Audio with These Top Apps and Software" }, void 0, !1, {
        fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
      lineNumber: 32,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
    lineNumber: 31,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("main", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Introduction to Text-to-Speech (TTS)" }, void 0, !1, {
        fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
        lineNumber: 40,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Text-to-Speech (TTS) technology converts written text into spoken audio. It's incredibly useful for accessibility, allowing visually impaired users to consume content, and for anyone who prefers listening over reading. TTS can boost productivity by enabling multitasking (e.g., listening to articles while commuting) and aid language learners. Many great free options are available today." }, void 0, !1, {
        fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
        lineNumber: 41,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
      lineNumber: 39,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Why Use Free TTS Tools?" }, void 0, !1, {
        fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "Accessibility" }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 50,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-lg", children: "Provides access to digital content for people with visual impairments or reading difficulties." }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 51,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 49,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "Multitasking & Productivity" }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 54,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-lg", children: "Listen to documents, emails, or articles while doing other tasks like driving, cooking, or exercising." }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 55,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 53,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "Learning & Proofreading" }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 58,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-lg", children: "Helps auditory learners absorb information and assists in catching errors by hearing the text read aloud." }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 59,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 57,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
        lineNumber: 48,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
      lineNumber: 46,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Top Free Text-to-Speech Options" }, void 0, !1, {
        fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
        lineNumber: 65,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "NaturalReader" }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 68,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-lg", children: "Offers free tiers for web, desktop (Mac/Windows), and mobile (iOS/Android), plus a Chrome extension. Good voice quality and supports various document types." }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 69,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 67,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "Voice Dream Reader & Speak4Me" }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 76,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-lg", children: "Voice Dream Reader is highly regarded, especially for audiobooks and extensive features, but often involves a cost. Speak4Me is another option, though less common. Always check for current free features vs. paid upgrades." }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 77,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 75,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "Web-Based Tools & Extensions" }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 80,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-lg", children: "Many websites offer free TTS directly (e.g., TTSReader, ReadAloud Chrome extension). Quality and limits vary." }, void 0, !1, {
            fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
            lineNumber: 81,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 79,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
        lineNumber: 66,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
      lineNumber: 64,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Features to Consider" }, void 0, !1, {
        fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("ul", { className: "list-disc list-inside space-y-2 text-lg bg-white p-6 rounded-lg shadow", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: "Voice Quality & Naturalness" }, void 0, !1, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 89,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: "Number of Voices and Languages Supported" }, void 0, !1, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 90,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: "Speed and Pitch Control" }, void 0, !1, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 91,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: "Ability to Read Different File Formats (PDF, DOCX, EPUB)" }, void 0, !1, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 92,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: "Text Highlighting While Reading" }, void 0, !1, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 93,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: "Offline Access" }, void 0, !1, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 94,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("li", { children: "Export to Audio Files (MP3, WAV)" }, void 0, !1, {
          fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
          lineNumber: 95,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
        lineNumber: 88,
        columnNumber: 12
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
      lineNumber: 86,
      columnNumber: 10
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-center text-teal-500 text-lg", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react7.Link, { to: "/", children: "Go back to Home" }, void 0, !1, {
        fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
        lineNumber: 101,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
      lineNumber: 100,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
    lineNumber: 38,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("footer", { className: "bg-gray-200 py-4 text-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-sm", children: "\xA9 2024 TTS Guide. All rights reserved." }, void 0, !1, {
      fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
      lineNumber: 106,
      columnNumber: 9
    }, this),
    " "
  ] }, void 0, !0, {
    fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
    lineNumber: 105,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/what-are-the-best-free-text-to-speech-tools.tsx",
  lineNumber: 30,
  columnNumber: 5
}, this), what_are_the_best_free_text_to_speech_tools_default = RemixPage;

// app/routes/5-ways-ai-can-help-farmland-restoration.tsx
var ways_ai_can_help_farmland_restoration_exports = {};
__export(ways_ai_can_help_farmland_restoration_exports, {
  default: () => ways_ai_can_help_farmland_restoration_default,
  meta: () => meta3
});
var import_react8 = require("@remix-run/react");

// public/restoration.png
var restoration_default = "/build/_assets/restoration-6RTDLQ5V.png";

// app/routes/5-ways-ai-can-help-farmland-restoration.tsx
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), meta3 = () => ({
  title: "5 Ways AI Can Help Farmland Restoration",
  "og:image": restoration_default,
  // Add relevant image URL or path
  "og:title": "5 Ways AI Can Help Farmland Restoration",
  "og:description": "Learn how AI technologies like precision agriculture, soil monitoring, and predictive modeling are aiding farmland restoration and promoting soil health.",
  "og:type": "article",
  "twitter:card": "summary_large_image",
  "twitter:title": "5 Ways AI Can Help Farmland Restoration",
  "twitter:description": "Learn how AI technologies like precision agriculture, soil monitoring, and predictive modeling are aiding farmland restoration and promoting soil health.",
  "twitter:image": restoration_default,
  // Add relevant image URL or path
  "linkedin:title": "5 Ways AI Can Help Farmland Restoration",
  "linkedin:description": "Learn how AI technologies like precision agriculture, soil monitoring, and predictive modeling are aiding farmland restoration and promoting soil health.",
  "linkedin:image": restoration_default,
  // Add relevant image URL or path
  keywords: "AI, Artificial Intelligence, Farmland Restoration, Soil Health, Precision Agriculture, Predictive Modeling, Soil Conservation, Sustainable Agriculture, AgTech"
}), FarmlandRestorationPage = () => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "min-h-screen bg-gray-100 text-gray-800", children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("header", { className: "bg-green-700 text-white py-6 shadow-lg", children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h1", { className: "text-3xl font-bold", children: "5 Ways AI Can Help Farmland Restoration" }, void 0, !1, {
        fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "mt-2", children: "Leveraging Technology for Sustainable Soil Health" }, void 0, !1, {
        fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
        lineNumber: 35,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
      lineNumber: 33,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
    lineNumber: 32,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("section", { className: "mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("img", { className: "mx-auto my-auto h-1/2 w-1/2 ", src: restoration_default, alt: "restoration ai" }, void 0, !1, {
    fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
    lineNumber: 39,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
    lineNumber: 38,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("main", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Introduction" }, void 0, !1, {
        fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
        lineNumber: 44,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Artificial Intelligence (AI) offers powerful tools to address the challenges of farmland degradation and promote restoration efforts. By analyzing complex data and providing actionable insights, AI can significantly contribute to sustainable agriculture and the preservation of vital soil resources. Here are five key ways AI is making a difference:" }, void 0, !1, {
        fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
        lineNumber: 45,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
      lineNumber: 43,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "How AI Contributes to Restoration" }, void 0, !1, {
        fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
        lineNumber: 51,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "1. Precision Agriculture" }, void 0, !1, {
            fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
            lineNumber: 54,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-lg", children: "AI can analyze soil data to provide tailored recommendations for crop management, including optimal planting times and irrigation schedules. This helps in maintaining the soil horizon by ensuring that agricultural practices are aligned with the soil's specific needs, preventing degradation and promoting sustainability." }, void 0, !1, {
            fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
            lineNumber: 55,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
          lineNumber: 53,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "2. Soil Health Monitoring" }, void 0, !1, {
            fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
            lineNumber: 58,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-lg", children: "AI-powered sensors and algorithms can monitor soil health in real-time, providing insights into parameters like moisture, nutrient levels, and pH. This helps in detecting issues early and taking corrective actions to maintain the integrity of the soil horizon." }, void 0, !1, {
            fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
            lineNumber: 59,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
          lineNumber: 57,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "3. Predictive Modeling" }, void 0, !1, {
            fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
            lineNumber: 62,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-lg", children: "AI can predict future soil conditions based on current data and trends. This allows for proactive management of the soil horizon, such as anticipating nutrient depletion or erosion risks and taking preventive measures." }, void 0, !1, {
            fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
            lineNumber: 63,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
          lineNumber: 61,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "4. Data-Driven Decision Making" }, void 0, !1, {
            fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
            lineNumber: 66,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-lg", children: "AI can integrate various data sources, including weather forecasts and crop data, to provide comprehensive insights for soil management. This helps in making informed decisions that preserve the soil horizon and enhance crop productivity." }, void 0, !1, {
            fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
            lineNumber: 67,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
          lineNumber: 65,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "5. Soil Conservation" }, void 0, !1, {
            fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
            lineNumber: 70,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-lg", children: "AI can identify areas at risk of soil erosion or degradation and suggest conservation practices. This helps in protecting the soil horizon and ensuring long-term soil health and productivity." }, void 0, !1, {
            fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
            lineNumber: 71,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
          lineNumber: 69,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
        lineNumber: 52,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
      lineNumber: 50,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-center text-green-600 text-lg", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react8.Link, { to: "/", children: "Go back to Home" }, void 0, !1, {
        fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
        lineNumber: 77,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
      lineNumber: 76,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
    lineNumber: 42,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("footer", { className: "bg-gray-200 py-4 text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { className: "text-sm", children: [
    "\xA9 ",
    (/* @__PURE__ */ new Date()).getFullYear(),
    " Farmland Restoration Insights. All rights reserved."
  ] }, void 0, !0, {
    fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
    lineNumber: 82,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
    lineNumber: 81,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/5-ways-ai-can-help-farmland-restoration.tsx",
  lineNumber: 31,
  columnNumber: 5
}, this), ways_ai_can_help_farmland_restoration_default = FarmlandRestorationPage;

// app/routes/create-your-own-huggingface-space-easy.tsx
var create_your_own_huggingface_space_easy_exports = {};
__export(create_your_own_huggingface_space_easy_exports, {
  default: () => Article52,
  meta: () => meta4
});
var import_react9 = require("@remix-run/react");

// public/huggingface1.png
var huggingface1_default = "/build/_assets/huggingface1-56YIZXJF.png";

// app/routes/create-your-own-huggingface-space-easy.tsx
var import_jsx_dev_runtime8 = require("react/jsx-dev-runtime"), meta4 = () => ({
  title: "The Easy Way to Publish on Hugging Face Spaces",
  "og:image": huggingface1_default,
  keywords: "hugging face, spaces, machine learning, AI, deep learning, natural language processing, computer vision, speech recognition, computer vision, computer vision, computer vision, computer vision, computer vision"
});
function Article52() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
        " ",
        "The Easy Way to Host Your Python Project on Hugging Face Spaces",
        " "
      ] }, void 0, !0, {
        fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
        lineNumber: 24,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
        "img",
        {
          className: "mx-auto my-auto h-1/2 w-1/2 ",
          src: huggingface1_default,
          alt: "emoji"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 25,
          columnNumber: 9
        },
        this
      ),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          " "
        ] }, void 0, !0, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 32,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 36,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          "Hugging Face Spaces offer a simple way to host not just ML demo apps directly on your profile or your organization\u2019s profile, but really any Python code you want. ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
            fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
            lineNumber: 40,
            columnNumber: 267
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
            fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
            lineNumber: 40,
            columnNumber: 273
          }, this),
          "  "
        ] }, void 0, !0, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 40,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          "This is especially helpful for apps that use",
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("a", { href: "https://www.gradio.app/", className: "text-blue-500", children: " Gradio" }, void 0, !1, {
            fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
            lineNumber: 42,
            columnNumber: 1
          }, this),
          ", Streamlit, Docker, or static HTML, which can allow you to create a decent looking UI fast. "
        ] }, void 0, !0, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 40,
          columnNumber: 285
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 42,
          columnNumber: 170
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 42,
          columnNumber: 177
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          "Checkout ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("a", { href: "https://huggingface.co/spaces/", className: "text-blue-500", children: "Hugging Face Spaces" }, void 0, !1, {
            fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
            lineNumber: 45,
            columnNumber: 10
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
            fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
            lineNumber: 46,
            columnNumber: 1
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
            fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
            lineNumber: 46,
            columnNumber: 7
          }, this),
          "Here's there",
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("a", { href: "https://www.huggingface.co/", className: "text-blue-500", children: [
            " ",
            "docs for spaces"
          ] }, void 0, !0, {
            fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
            lineNumber: 48,
            columnNumber: 2
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 44,
          columnNumber: 1
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 55,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
          " ",
          "Go back",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
            import_react9.Link,
            {
              to: "/",
              className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
              children: [
                " ",
                "Home",
                " "
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
              lineNumber: 60,
              columnNumber: 13
            },
            this
          ),
          " "
        ] }, void 0, !0, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 57,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 68,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      " "
    ] }, void 0, !0, {
      fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    " "
  ] }, void 0, !0, {
    fileName: "app/routes/create-your-own-huggingface-space-easy.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}

// app/routes/vuejs-independant-javascript-framework.tsx
var vuejs_independant_javascript_framework_exports = {};
__export(vuejs_independant_javascript_framework_exports, {
  default: () => Article42
});
var import_react10 = require("@remix-run/react");

// public/js-burden.jpeg
var js_burden_default = "/build/_assets/js-burden-OUHQSOZN.jpeg";

// app/routes/vuejs-independant-javascript-framework.tsx
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime");
function Article42() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "VueJS as the Most Indie Yet Established Javascript Framework" }, void 0, !1, {
      fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
      lineNumber: 8,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: js_burden_default,
        alt: "Studio by Warren Hansen"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 13,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "While there are newcomers that got that hot cheese (Astro), and lesser known yet exciting seeming frameworks (SolidJS), the uber DIY (Eleventy), the one time indie-darlings turned (Svelte)" }, void 0, !1, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 20,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 24,
        columnNumber: 1
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "There is a sweet ring to Vue\u2019s branding: \u201CThe ProgressiveJavaScript Framework An approachable, performant and versatile framework for building web user interfaces.\u201D" }, void 0, !1, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 25,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 30,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "In other exciting Vuejs related news NUXT the go to framework of vue recently released its third version and seems like a great open source project to contribute to! NUXT 3 brings many new features and improvements, such as serverless rendering, auto-imported components, file-based routing and more." }, void 0, !1, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "Vue is definitely more indie with no Facebook backing, but it is still very established. Vuejs also has a vibrant ecosystem of libraries and tools that make it easy to create rich and interactive web applications. For example, pinia is a state management library that helps you manage the data flow in your app with a simple and intuitive API, Vue Router is a routing library that lets you navigate between different views, and Vite is a fast and modern build tool that supports hot module replacement and code splitting." }, void 0, !1, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 33,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "Another reason to love Vuejs is its excellent documentation and community support. The official docs are clear, comprehensive and full of examples. You can also find many tutorials, courses, books and podcasts on Vuejs online. The Vuejs community is friendly, welcoming and active on various platforms such as Discord, Reddit, Stack Overflow and Twitter. You can always find help and inspiration from other Vuejs developers." }, void 0, !1, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 35,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 37,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        "If you are looking for an alternative to Vuex, you might want to check out",
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("a", { href: "https://pinia.esm.dev/", className: "text-blue-500", children: [
          " ",
          "Pinia"
        ] }, void 0, !0, {
          fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
          lineNumber: 39,
          columnNumber: 13
        }, this),
        ", a state management library that works well with Vuejs."
      ] }, void 0, !0, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 38,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 40,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For the vue docs, you can visit",
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("a", { href: "https://vuejs.org/", className: "text-blue-500", children: [
          " ",
          "here"
        ] }, void 0, !0, {
          fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
          lineNumber: 42,
          columnNumber: 13
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 41,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          import_react10.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
            lineNumber: 46,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/vuejs-independant-javascript-framework.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/routes/5waystoenhanceragefficiencywithdspy.tsx
var waystoenhanceragefficiencywithdspy_exports = {};
__export(waystoenhanceragefficiencywithdspy_exports, {
  default: () => Article12
});
var import_react11 = require("@remix-run/react");

// public/letters1.png
var letters1_default = "/build/_assets/letters1-Z5DJWLSL.png";

// app/routes/5waystoenhanceragefficiencywithdspy.tsx
var import_jsx_dev_runtime10 = require("react/jsx-dev-runtime");
function Article12() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
        " ",
        " Five Ways to Enhance RAG Efficiency with DSPy"
      ] }, void 0, !0, {
        fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
        lineNumber: 9,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
        "img",
        {
          className: "mx-auto my-auto h-1/2 w-1/2",
          src: letters1_default,
          alt: "letters"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 12,
          columnNumber: 9
        },
        this
      ),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "  DSPy is a versatile toolkit for information retrieval and prompt engineering. It can be thought of as a prompting language. It can leverage various techniques to retrieve relevant documents efficiently. Let\u2019s explore five key approaches that make Retrieval Augmented Generation easier and less bloated!"
        ] }, void 0, !0, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 19,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 23,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "1. Keyword-Based Retrieval" }, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 24,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy can use traditional information retrieval techniques like TF-IDF or BM25 to find documents based on keyword matching. This approach is efficient and doesn\u2019t rely on embeddings or vector databases. With the dspy.retrieve module you can create a custom retrieval function that inputs the keyword results and formats them for further processing. This module is ideal to process user queries and output relevant passages from retrieval corpuses without having to create embeddings." }, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 27,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 30,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "2. Metadata Filtering" }, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 31,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "When documents have metadata such as tags, categories, or dates, DSPy can filter results based on this metadata. This narrows the search space and improves retrieval accuracy." }, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 34,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 37,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "3. External Search APIs" }, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy integrates with external search APIs like Google Search or Bing Search. These APIs use their indexing mechanisms to retrieve documents, often bypassing the need for a local database." }, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 41,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 44,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "4. In-Memory Data Structures" }, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 45,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "For smaller datasets, DSPy can load documents into memory and use efficient structures like inverted indexes or hash tables for fast lookups, avoiding vector database dependencies." }, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 48,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 51,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "5. Hybrid Approaches" }, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 52,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Combining methods can improve retrieval accuracy. For example, DSPy might use keyword-based retrieval for initial filtering and cosine similarity on TF-IDF vectors for final ranking." }, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 55,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 58,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy\u2019s flexibility makes it an excellent choice for diverse information retrieval tasks." }, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 59,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 62,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
          "For more about DSPy, visit the official documentation",
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
            "a",
            {
              href: "https://dspy.ai",
              className: "text-blue-500",
              children: [
                " ",
                "here"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
              lineNumber: 65,
              columnNumber: 13
            },
            this
          ),
          "."
        ] }, void 0, !0, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 63,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 73,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
          "Go back",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
            import_react11.Link,
            {
              to: "/",
              className: "text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
              children: "Home"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
              lineNumber: 76,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
          lineNumber: 74,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/5waystoenhanceragefficiencywithdspy.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/databricks-dspy-jetblue-ai-chatbot.tsx
var databricks_dspy_jetblue_ai_chatbot_exports = {};
__export(databricks_dspy_jetblue_ai_chatbot_exports, {
  default: () => Article122
});
var import_react12 = require("@remix-run/react");

// public/databricks.png
var databricks_default = "/build/_assets/databricks-XV6OFFUZ.png";

// app/routes/databricks-dspy-jetblue-ai-chatbot.tsx
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime");
function Article122() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("h1", { className: "tracking-light text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "JetBlue Optimizes Databricks LLM Pipelines with DSPy" }, void 0, !1, {
      fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
      lineNumber: 8,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
      "img",
      {
        className: "mx-auto my-auto h-1/2 w-1/2",
        src: databricks_default,
        alt: "databricks"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 11,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
        " The integration of DSPy and Databricks DSPy is revolutionizing machine learning workflows by introducing self-improving pipelines, simplifying data preparation, and optimizing large language model (LLM) performance. Learn how DSPy transforms LLM pipelines and read more in the original Databricks article",
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("a", { href: "https://www.databricks.com/blog/optimizing-databricks-llm-pipelines-dspy", className: "text-blue-500", children: " here" }, void 0, !1, {
          fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
          lineNumber: 20,
          columnNumber: 13
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 17,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 22,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold", children: "Key Insights from the Databricks Article" }, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "The Databricks article highlights the groundbreaking nature of DSPy\u2019s pipeline optimization, including:" }, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 26,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("ul", { className: "list-disc pl-5 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("li", { children: "Automated, self-improving pipelines that refine prompts to improve LLM responses." }, void 0, !1, {
          fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
          lineNumber: 30,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("li", { children: "Streamlined support for retrieval-augmented generation (RAG) in various workflows." }, void 0, !1, {
          fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
          lineNumber: 31,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("li", { children: "Enhanced compatibility with Databricks tools, such as Model Serving and Vector Search." }, void 0, !1, {
          fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
          lineNumber: 32,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 29,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold", children: "Exploring DSPy Further" }, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 35,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
        "Released in October 2023, DSPy was developed by researchers in Matei Zaharia\u2019s Stanford lab. It empowers users to build modular systems that optimize LLM workflows and enables automated tuning for downstream performance improvements. For details, read their research paper",
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("a", { href: "https://arxiv.org/abs/2310.03714", className: "text-blue-500", children: " here" }, void 0, !1, {
          fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
          lineNumber: 40,
          columnNumber: 13
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 38,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
        "DSPy allows developers to construct complex LLM pipelines that adapt dynamically to evolving requirements, making traditional manual prompt-tuning redundant. For more on its retrieval capabilities, check out",
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("a", { href: "https://dspy.ai", className: "text-blue-500", children: " Five Ways to Do RAG with DSPy" }, void 0, !1, {
          fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
          lineNumber: 44,
          columnNumber: 13
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 42,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 46,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Developers can seamlessly integrate DSPy with Databricks Marketplace models like Llama 2 70B, enabling faster deployment of pipelines such as customer feedback classification or predictive maintenance chatbots." }, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 50,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold", children: [
        "In Collaboration with",
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("a", { href: "https://www.jetblue.com", className: "text-blue-500", children: " JetBlue" }, void 0, !1, {
          fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
          lineNumber: 53,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 51,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "JetBlue is leveraging DSPy\u2019s self-optimizing pipelines to achieve enhanced efficiency and reduced costs. Their integration highlights DSPy\u2019s role in driving innovation in real-world applications." }, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 55,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 58,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold", children: "JetBlue's Use of Databricks and DSPy" }, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 60,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("ul", { className: "list-disc list-inside", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("li", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", { className: "font-semibold", children: "Improved Control, Dynamic Updates, and Cost Reduction:" }, void 0, !1, {
            fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
            lineNumber: 63,
            columnNumber: 17
          }, this),
          "DSPy modularizes complex pipelines, enabling JetBlue to adapt quickly while reducing costs."
        ] }, void 0, !0, {
          fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
          lineNumber: 62,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("li", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", { className: "font-semibold", children: "Enhanced Pipeline Flexibility: " }, void 0, !1, {
            fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
            lineNumber: 67,
            columnNumber: 3
          }, this),
          "JetBlue updates their pipelines dynamically, ensuring continued optimization without rewriting entire systems."
        ] }, void 0, !0, {
          fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
          lineNumber: 66,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("li", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", { className: "font-semibold", children: "Optimized Resource Allocation: " }, void 0, !1, {
            fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
            lineNumber: 71,
            columnNumber: 3
          }, this),
          "DSPy identifies areas for efficiency, helping JetBlue scale their solutions effectively."
        ] }, void 0, !0, {
          fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
          lineNumber: 70,
          columnNumber: 1
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 61,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "JetBlue\u2019s innovative use of DSPy demonstrates its potential to streamline complex ML workflows, adding new opportunities for LLM applications." }, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 76,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 80,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
          import_react12.Link,
          {
            to: "/",
            className: "text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
            lineNumber: 83,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
      lineNumber: 16,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/databricks-dspy-jetblue-ai-chatbot.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/routes/how-to-use-the-pie-menu-in-blender.tsx
var how_to_use_the_pie_menu_in_blender_exports = {};
__export(how_to_use_the_pie_menu_in_blender_exports, {
  default: () => Article43
});
var import_react13 = require("@remix-run/react");

// public/blender1.jpeg
var blender1_default = "/build/_assets/blender1-YEQ2NRJ6.jpeg";

// app/routes/how-to-use-the-pie-menu-in-blender.tsx
var import_jsx_dev_runtime12 = require("react/jsx-dev-runtime");
function Article43() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "The Pie Menu Rocks in Blender      " }, void 0, !1, {
      fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
      lineNumber: 10,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: blender1_default,
        alt: "Studio by Warren Hansen"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
        lineNumber: 13,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "Using the pie menu is a quick method of accessing the Numpad hot keys and unlike Numpad emulation, it does not mess with the default shortcuts. For accessing that pie menu you need to press the backtick (`), which is located above the tab button on the left-hand side of your keyboard." }, void 0, !1, {
        fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
        lineNumber: 20,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
        lineNumber: 24,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: " The pie menu allows you to change the way you see your scene and objects in the 3D Viewport. You can choose between perspective and orthographic views, which affect the depth and distortion of your scene. You can also choose different angles to view your scene from, such as front, back, left, right, top and bottom. These angles can help you align and position your objects more precisely and easily. The view pie menu also has options to toggle quad view and toggle camera view, which can give you more control and flexibility over your scene layout and rendering. " }, void 0, !1, {
        fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
        lineNumber: 25,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For the Pie Menu in Blender docs, you can visit",
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("a", { href: "https://docs.blender.org/manual/en/latest/addons/interface/viewport_pies.html", className: "text-blue-500", children: [
          " ",
          "here"
        ] }, void 0, !0, {
          fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
          lineNumber: 30,
          columnNumber: 11
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          import_react13.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
            lineNumber: 34,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
        lineNumber: 32,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
    lineNumber: 9,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/how-to-use-the-pie-menu-in-blender.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}

// app/routes/three-essential-webstorm-shortcuts.tsx
var three_essential_webstorm_shortcuts_exports = {};
__export(three_essential_webstorm_shortcuts_exports, {
  default: () => Article123
});
var import_react14 = require("@remix-run/react");

// public/webstorm1.jpeg
var webstorm1_default = "/build/_assets/webstorm1-INL4NWXC.jpeg";

// app/routes/three-essential-webstorm-shortcuts.tsx
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime");
function Article123() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h1", { className: "tracking-light text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "The Three WebStorm Shortcuts to Rule Them All" }, void 0, !1, {
      fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
      lineNumber: 8,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto",
        src: webstorm1_default,
        alt: "WebStorm logo"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 11,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "WebStorm is a smart IDE for web development. Keyboard shortcuts can help you write, debug, and test your code faster. Here are three shortcuts that you should know." }, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 17,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 22,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "1. Speed search" }, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Press Shift + Up and then type the name of any file you want to find in WebStorm. You will see a list of suggestions. Press Enter to select an item. This also gets you to the navigation bar so you can clear up the file tree for a more zen like experience." }, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 26,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "2. Recent files" }, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Press Command + E and you will see a list of recent files that you have accessed. Press Enter to select a file." }, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 35,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 39,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "3. Action search" }, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 40,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Press Command + Shift + A and type the name of the action you want to execute. You will see a list of suggestions. Press Enter to execute an action." }, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 48,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Use these new powers carefully ;)" }, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 49,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 52,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For more shortcuts check this article out",
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("a", { href: "https://blog.jetbrains.com/webstorm/2020/07/navigation-features-that-will-make-you-faster/", className: "text-blue-500", children: [
          " ",
          "here"
        ] }, void 0, !0, {
          fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
          lineNumber: 54,
          columnNumber: 13
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 53,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 56,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          import_react14.Link,
          {
            to: "/",
            className: "text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
            lineNumber: 60,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
        lineNumber: 58,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
      lineNumber: 16,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/three-essential-webstorm-shortcuts.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/routes/easydomainverificationwithgoogle.tsx
var easydomainverificationwithgoogle_exports = {};
__export(easydomainverificationwithgoogle_exports, {
  default: () => Article2
});
var import_react15 = require("@remix-run/react");

// public/analytics1.jpeg
var analytics1_default = "/build/_assets/analytics1-AL4QBJKC.jpeg";

// app/routes/easydomainverificationwithgoogle.tsx
var import_jsx_dev_runtime14 = require("react/jsx-dev-runtime");
function Article2() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: analytics1_default,
        alt: "computer and graphs"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/easydomainverificationwithgoogle.tsx",
        lineNumber: 14,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("br", {}, void 0, !1, {
      fileName: "app/routes/easydomainverificationwithgoogle.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: " ", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "The Easy Way to Verify Domain Ownership with Google" }, void 0, !1, {
        fileName: "app/routes/easydomainverificationwithgoogle.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/easydomainverificationwithgoogle.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl ", children: "Oh domains! The web of developer sadness they can indeed weave. Luckily, whether your building your website with just HTML or in React with Nextjs, there is an easy solution for you." }, void 0, !1, {
        fileName: "app/routes/easydomainverificationwithgoogle.tsx",
        lineNumber: 24,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl ", children: [
        "If you have already found the Google's Publisher Center ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("a", { href: "https://publishercenter.google.com/", children: "  Google's Publisher Center " }, void 0, !1, {
          fileName: "app/routes/easydomainverificationwithgoogle.tsx",
          lineNumber: 29,
          columnNumber: 67
        }, this),
        ", then you are half of the way there. Next, comes the challenging part, Domain Verification."
      ] }, void 0, !0, {
        fileName: "app/routes/easydomainverificationwithgoogle.tsx",
        lineNumber: 27,
        columnNumber: 13
      }, this),
      "        ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl ", children: [
        "So what is the easy solution already? HTML Tags. Yes, just put the verification tags in your",
        "<Head>",
        " section on the main page of your site.  ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/easydomainverificationwithgoogle.tsx",
          lineNumber: 32,
          columnNumber: 152
        }, this),
        "  ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/easydomainverificationwithgoogle.tsx",
          lineNumber: 32,
          columnNumber: 160
        }, this),
        "This can be a bit tricky with something like Nextjs as their is no index.html. Instead, its just the index.js ",
        "<Head>",
        'section that u must import like so: import Head from "next/head"; Hope this helps! For more info check ',
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("a", { href: "https://support.google.com/webmasters/answer/9008080#domain_name_verification&zippy=%2Cdomain-name-provider%2Chtml-file-upload", children: " Google's docs " }, void 0, !1, {
          fileName: "app/routes/easydomainverificationwithgoogle.tsx",
          lineNumber: 36,
          columnNumber: 31
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/easydomainverificationwithgoogle.tsx",
        lineNumber: 30,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", { className: "text-center text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl text-yellow-500", children: [
        "Go back ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react15.Link, { to: "/", className: " text-center text-6xl font-extrabold tracking-tight sm:text-xl lg:text-4xl text-blue-500", children: "Home" }, void 0, !1, {
          fileName: "app/routes/easydomainverificationwithgoogle.tsx",
          lineNumber: 42,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/easydomainverificationwithgoogle.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/easydomainverificationwithgoogle.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/easydomainverificationwithgoogle.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}

// app/routes/using-airpods-and-audacity-hack.tsx
var using_airpods_and_audacity_hack_exports = {};
__export(using_airpods_and_audacity_hack_exports, {
  default: () => Article44
});
var import_react16 = require("@remix-run/react");

// public/airpods.jpeg
var airpods_default = "/build/_assets/airpods-FBTQWTZI.jpeg";

// app/routes/using-airpods-and-audacity-hack.tsx
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime");
function Article44() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "AirPods Audacity: How to make AirPods(or any other bluetooth audio) work with Audacity 2023  " }, void 0, !1, {
      fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
      lineNumber: 10,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: airpods_default,
        alt: "airpods"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
        lineNumber: 13,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "AirPods Audacity: How to make AirPods(or any other bluetooth audio) work with Audacity 2023 Often times AirPods (or any other bluetooth headphones) and Audacity don\u2019t play well together. Well luckily, as of 2023, there is a way to sync up audacity and airports." }, void 0, !1, {
        fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
        lineNumber: 20,
        columnNumber: 11
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
        lineNumber: 24,
        columnNumber: 92
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        "To do it:",
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
          lineNumber: 26,
          columnNumber: 22
        }, this),
        "-have your AirPods connected to you computer",
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
          lineNumber: 27,
          columnNumber: 57
        }, this),
        "-click the transport tab",
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
          lineNumber: 28,
          columnNumber: 37
        }, this),
        "-select \u201Crescan audio devices\u201D",
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
          lineNumber: 29,
          columnNumber: 43
        }, this),
        "-click on audio setup",
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
          lineNumber: 30,
          columnNumber: 34
        }, this),
        "-click playback device",
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
          lineNumber: 31,
          columnNumber: 35
        }, this),
        "-select your AirPods (or other bluetooth auto devices)",
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
          lineNumber: 32,
          columnNumber: 67
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
        lineNumber: 25,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
        lineNumber: 36,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For more Audacity and podcasts, you can visit",
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("a", { href: "https://www.lifewire.com/best-podcast-recording-software-2722085", className: "text-blue-500", children: [
          " ",
          "here"
        ] }, void 0, !0, {
          fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
          lineNumber: 38,
          columnNumber: 13
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
        lineNumber: 37,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
          import_react16.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
            lineNumber: 42,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
        lineNumber: 40,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
    lineNumber: 9,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/using-airpods-and-audacity-hack.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}

// app/routes/the-art-of-the-clean-install.tsx
var the_art_of_the_clean_install_exports = {};
__export(the_art_of_the_clean_install_exports, {
  default: () => Article7,
  meta: () => meta5
});
var import_react17 = require("@remix-run/react");

// public/graph4.jpeg
var graph4_default = "/build/_assets/graph4-RRHZQM5A.jpeg";

// app/routes/the-art-of-the-clean-install.tsx
var import_jsx_dev_runtime16 = require("react/jsx-dev-runtime"), meta5 = () => ({
  title: "The Art of the Clean Install",
  "og:image": graph4_default,
  keywords: "Clean Install, Coding, NVM, Tailwind UI, NUXT, Node Modules, Package Lock, Yarn Lock, npm, Web Development"
});
function Article7() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "The Art of the Clean Install" }, void 0, !1, {
      fileName: "app/routes/the-art-of-the-clean-install.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: graph4_default,
        alt: "a graph"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/the-art-of-the-clean-install.tsx",
        lineNumber: 25,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "Coder says \u201Cyeh, bruh, did a clean install and it works great\u2026simple is as simple does\u201D Well, that\u2019s all fine and good, but then you have to use NVM and Tailwind UI. Not to mention, you want to support the \u201Cgood guys\u201D and use buggy-ass NUXT. Oy vey." }, void 0, !1, {
        fileName: "app/routes/the-art-of-the-clean-install.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/the-art-of-the-clean-install.tsx",
        lineNumber: 37,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "It\u2019s hard to remember what a \u201Cclean install\u201D actually is. Well, as one steps out of the dark tunnel of installing  the NUXT framework with Tailwind UI, the idea of a clean install becomes convoluted, murky, strange, etc." }, void 0, !1, {
        fileName: "app/routes/the-art-of-the-clean-install.tsx",
        lineNumber: 38,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/the-art-of-the-clean-install.tsx",
        lineNumber: 42,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        "Thus, it becomes important to take a step back and provide the steps to do a clean install. ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/the-art-of-the-clean-install.tsx",
          lineNumber: 44,
          columnNumber: 105
        }, this),
        "The steps are:"
      ] }, void 0, !0, {
        fileName: "app/routes/the-art-of-the-clean-install.tsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/the-art-of-the-clean-install.tsx",
        lineNumber: 46,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("ol", { className: "text-left text-xl tracking-tight sm:text-2xl lg:text-2xl", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("li", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "1. Delete the projects Node Modules" }, void 0, !1, {
          fileName: "app/routes/the-art-of-the-clean-install.tsx",
          lineNumber: 48,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("li", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
          "2. Delete package.lock or yarn lock or whatever other lock equivalents",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("a", { href: "https://classic.yarnpkg.com/lang/en/docs/yarn-lock/", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("u", { children: "Yarn Lock Docs" }, void 0, !1, {
            fileName: "app/routes/the-art-of-the-clean-install.tsx",
            lineNumber: 54,
            columnNumber: 17
          }, this) }, void 0, !1, {
            fileName: "app/routes/the-art-of-the-clean-install.tsx",
            lineNumber: 53,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/the-art-of-the-clean-install.tsx",
          lineNumber: 51,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("li", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "3. Then run npm I or whatever package manager equivalents" }, void 0, !1, {
          fileName: "app/routes/the-art-of-the-clean-install.tsx",
          lineNumber: 58,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("li", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "4. Then try to run project via npm run dev or equivalents" }, void 0, !1, {
          fileName: "app/routes/the-art-of-the-clean-install.tsx",
          lineNumber: 62,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/the-art-of-the-clean-install.tsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          import_react17.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/the-art-of-the-clean-install.tsx",
            lineNumber: 66,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/the-art-of-the-clean-install.tsx",
        lineNumber: 64,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/the-art-of-the-clean-install.tsx",
      lineNumber: 31,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/the-art-of-the-clean-install.tsx",
    lineNumber: 20,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/the-art-of-the-clean-install.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}

// app/routes/nab-2023-audio-video-gear.tsx
var nab_2023_audio_video_gear_exports = {};
__export(nab_2023_audio_video_gear_exports, {
  default: () => Article45
});
var import_react18 = require("@remix-run/react");

// public/soundsguy1.jpeg
var soundsguy1_default = "/build/_assets/soundsguy1-WMWHLYNT.jpeg";

// app/routes/nab-2023-audio-video-gear.tsx
var import_jsx_dev_runtime17 = require("react/jsx-dev-runtime");
function Article45() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "Highlights from NAB 2023  " }, void 0, !1, {
      fileName: "app/routes/nab-2023-audio-video-gear.tsx",
      lineNumber: 10,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: soundsguy1_default,
        alt: "airpods"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/nab-2023-audio-video-gear.tsx",
        lineNumber: 13,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        "NAB is the go to trade show for Audio and Video gear.  ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/nab-2023-audio-video-gear.tsx",
          lineNumber: 21,
          columnNumber: 68
        }, this),
        "From Zaxcom to Sound Devices to Black Magic, NAB brings together all the major players in the broadcasting game. "
      ] }, void 0, !0, {
        fileName: "app/routes/nab-2023-audio-video-gear.tsx",
        lineNumber: 20,
        columnNumber: 11
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/nab-2023-audio-video-gear.tsx",
        lineNumber: 21,
        columnNumber: 192
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "It takes place every year in April at the Las Vegas Convention Center, attracting over 90,000 professionals from more than 160 countries. NAB showcases the latest innovations and solutions for creating, managing, delivering and monetizing content on multiple platforms. It also features conferences, workshops, awards and networking events that cover a wide range of topics and trends. NAB is the ultimate destination for anyone who wants to learn, connect and grow in the dynamic and evolving media landscape." }, void 0, !1, {
        fileName: "app/routes/nab-2023-audio-video-gear.tsx",
        lineNumber: 22,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/nab-2023-audio-video-gear.tsx",
        lineNumber: 25,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/nab-2023-audio-video-gear.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For some highlights on NAB 2023, you can visit",
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("a", { href: "https://www.tvtechnology.com/news/nab-show-blackmagic-design-unveils-new-products-software", className: "text-blue-500", children: [
          " ",
          "here"
        ] }, void 0, !0, {
          fileName: "app/routes/nab-2023-audio-video-gear.tsx",
          lineNumber: 29,
          columnNumber: 13
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/nab-2023-audio-video-gear.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/nab-2023-audio-video-gear.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For some solid advice on film sound and sound mixers in NYC, you can visit",
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("a", { href: "https://www.nycsoundguy.com", className: "text-blue-500", children: [
          " ",
          "NYC Sound Guy here"
        ] }, void 0, !0, {
          fileName: "app/routes/nab-2023-audio-video-gear.tsx",
          lineNumber: 33,
          columnNumber: 13
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/nab-2023-audio-video-gear.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
          import_react18.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/nab-2023-audio-video-gear.tsx",
            lineNumber: 37,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/nab-2023-audio-video-gear.tsx",
        lineNumber: 35,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/nab-2023-audio-video-gear.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/nab-2023-audio-video-gear.tsx",
    lineNumber: 9,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/nab-2023-audio-video-gear.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}

// app/routes/how-to-invest-in-whisky.tsx
var how_to_invest_in_whisky_exports = {};
__export(how_to_invest_in_whisky_exports, {
  default: () => Article53,
  meta: () => meta6
});
var import_react19 = require("@remix-run/react");

// public/cask1.jpeg
var cask1_default = "/build/_assets/cask1-UAGWJ3EB.jpeg";

// app/routes/how-to-invest-in-whisky.tsx
var import_jsx_dev_runtime18 = require("react/jsx-dev-runtime"), meta6 = () => ({
  title: "3 Ways to Invest in Whiskey",
  "og:image": cask1_default,
  keywords: "Whiskey, Investment, Rare Whiskey, Whiskey Barrels, Whiskey Casks, BlockApps, Vino Vest, Whiskey Appreciation, Whiskey History, Whiskey Market, Japanese Whiskey, Ardbeg, Bowmore, Glenfarclas, Glenfiddich, Laphroaig, Lagavulin, Rosebank, Yamazaki"
});
function Article53() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
        " ",
        "3 Ways to Invest in Whiskey",
        " "
      ] }, void 0, !0, {
        fileName: "app/routes/how-to-invest-in-whisky.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
        "img",
        {
          className: "mx-auto my-auto h-1/2 w-1/2 ",
          src: cask1_default,
          alt: "whiskey 8 bit barrels"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/how-to-invest-in-whisky.tsx",
          lineNumber: 25,
          columnNumber: 9
        },
        this
      ),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          'Over 500 years of whiskey history makes one think, "wow, I bet there are some rare whiskeys out there." With so much culture surrounding whiskey, it seems a bottle\u2019s narrative could drive its value through the roof if it was found in a shipwreck of a famous captain, in a secret chamber in a palace, or dating back to a time previously unknown to even be distilling whiskey.',
          " "
        ] }, void 0, !0, {
          fileName: "app/routes/how-to-invest-in-whisky.tsx",
          lineNumber: 32,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/how-to-invest-in-whisky.tsx",
          lineNumber: 37,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "The reasons for rarities are endless, but thanks  to  ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("a", { href: "https://www.rarewhiskey101.com/", className: "text-blue-500", children: [
            " ",
            "Rare Whiskey 101"
          ] }, void 0, !0, {
            fileName: "app/routes/how-to-invest-in-whisky.tsx",
            lineNumber: 40,
            columnNumber: 67
          }, this),
          " it is easy to track the price of these rare whiskeys making them more of an asset than a commodity. With market performance indices tracking broader markets like Japanese whiskey, its easy to get an overarching perspective on the whiskey market. They also have a database of distillery specific indices of over 24 brands including Ardbeg, Bowmore, Glenfarclas, Glenfiddich, Laphroaig, Lagavulin, Rosebank, and Yamazaki."
        ] }, void 0, !0, {
          fileName: "app/routes/how-to-invest-in-whisky.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/how-to-invest-in-whisky.tsx",
          lineNumber: 46,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          "Another way of investing in whiskey is to buy ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("a", { href: "https://www.forbes.com/sites/forbesfinancecouncil/2023/10/18/5-things-to-know-when-investing-in-whiskey-bottles-or-barrels/", className: "text-blue-500", children: [
            " ",
            "barrels"
          ] }, void 0, !0, {
            fileName: "app/routes/how-to-invest-in-whisky.tsx",
            lineNumber: 48,
            columnNumber: 150
          }, this),
          ". One way is thru ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("a", { href: "https://marketplace.mercata.blockapps.net/dp/0a3a3d282806135273d9e68d8b981d923461eadb/The%20Deuces%20Wild%20Collection%20-%20Whiskey%20Casks", className: "text-blue-500", children: [
            " ",
            "BlockApps"
          ] }, void 0, !0, {
            fileName: "app/routes/how-to-invest-in-whisky.tsx",
            lineNumber: 52,
            columnNumber: 17
          }, this),
          ", and their collaboration with Connecticut Distilling to create the Deuces Wild Collection. You can buy multiple casks and 2 years of cask storage are included with purchase. You can also purchase casks with ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("a", { href: "https://www.vinovest.co/", className: "text-blue-500", children: [
            " ",
            "Vino Vest"
          ] }, void 0, !0, {
            fileName: "app/routes/how-to-invest-in-whisky.tsx",
            lineNumber: 60,
            columnNumber: 34
          }, this),
          ", who offer a service to bottle the whiskey from your cask."
        ] }, void 0, !0, {
          fileName: "app/routes/how-to-invest-in-whisky.tsx",
          lineNumber: 48,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/how-to-invest-in-whisky.tsx",
          lineNumber: 68,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "Whether you are purchasing a rare whiskey or an entire cask, the returns on these items have a clear track record of appreciation. ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("br", {}, void 0, !1, {
            fileName: "app/routes/how-to-invest-in-whisky.tsx",
            lineNumber: 71,
            columnNumber: 144
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("br", {}, void 0, !1, {
            fileName: "app/routes/how-to-invest-in-whisky.tsx",
            lineNumber: 71,
            columnNumber: 150
          }, this),
          "For more information on Connecticut Distilling visit their website ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("a", { href: "https://www.ctdistillingco.com/", className: "text-blue-500", children: " here" }, void 0, !1, {
            fileName: "app/routes/how-to-invest-in-whisky.tsx",
            lineNumber: 71,
            columnNumber: 223
          }, this),
          ".",
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("br", {}, void 0, !1, {
            fileName: "app/routes/how-to-invest-in-whisky.tsx",
            lineNumber: 73,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("br", {}, void 0, !1, {
            fileName: "app/routes/how-to-invest-in-whisky.tsx",
            lineNumber: 73,
            columnNumber: 19
          }, this),
          "For more information on Block Apps visit their website ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("a", { href: "https://blockapps.net/", className: "text-blue-500", children: " here" }, void 0, !1, {
            fileName: "app/routes/how-to-invest-in-whisky.tsx",
            lineNumber: 73,
            columnNumber: 80
          }, this),
          ".",
          " "
        ] }, void 0, !0, {
          fileName: "app/routes/how-to-invest-in-whisky.tsx",
          lineNumber: 69,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
          " ",
          "Go back",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
            import_react19.Link,
            {
              to: "/",
              className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
              children: [
                " ",
                "Home",
                " "
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/how-to-invest-in-whisky.tsx",
              lineNumber: 83,
              columnNumber: 13
            },
            this
          ),
          " "
        ] }, void 0, !0, {
          fileName: "app/routes/how-to-invest-in-whisky.tsx",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        " "
      ] }, void 0, !0, {
        fileName: "app/routes/how-to-invest-in-whisky.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      " "
    ] }, void 0, !0, {
      fileName: "app/routes/how-to-invest-in-whisky.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    " "
  ] }, void 0, !0, {
    fileName: "app/routes/how-to-invest-in-whisky.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}

// app/routes/liesaboutjavascript.tsx
var liesaboutjavascript_exports = {};
__export(liesaboutjavascript_exports, {
  default: () => Article3
});
var import_react20 = require("@remix-run/react");

// public/js1.jpeg
var js1_default = "/build/_assets/js1-OQAFMVHI.jpeg";

// app/routes/liesaboutjavascript.tsx
var import_jsx_dev_runtime19 = require("react/jsx-dev-runtime");
function Article3() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "Sweet Little JavaScript Lies About Javascript" }, void 0, !1, {
        fileName: "app/routes/liesaboutjavascript.tsx",
        lineNumber: 11,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
        "img",
        {
          className: "h-1/2 w-1/2 mx-auto my-auto ",
          src: js1_default,
          alt: "dudes messing with an old computer"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/liesaboutjavascript.tsx",
          lineNumber: 13,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl", children: "Sometimes it's important to take a break from JavaScript and just find out weird things about the internet. Sooo...lettuce dive in a bit. So sure, JavaScript is cool but what does it do? Well, that's a challenging thing to say with the rise of NodeJS and the developments of HTML5. " }, void 0, !1, {
        fileName: "app/routes/liesaboutjavascript.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/liesaboutjavascript.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl", children: "For example, many will say you need JS for validating input values of a form before the data is sent to a web server, but HTML5 is also doing great work with form validation. So it would be a big rotten lie to say JS is the only way to do form validation on the world wide web and people are really leaning into shipping less JS these days so maybe it's time to dive even deeper into html form validation." }, void 0, !1, {
        fileName: "app/routes/liesaboutjavascript.tsx",
        lineNumber: 20,
        columnNumber: 16
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/liesaboutjavascript.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("p", { className: "text-center text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl text-yellow-500", children: [
      "Go back ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(import_react20.Link, { to: "/", className: " text-center text-6xl font-extrabold tracking-tight sm:text-xl lg:text-4xl text-blue-500", children: "Home" }, void 0, !1, {
        fileName: "app/routes/liesaboutjavascript.tsx",
        lineNumber: 24,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/liesaboutjavascript.tsx",
      lineNumber: 23,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/liesaboutjavascript.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/routes/smartbidder-diageo.tsx
var smartbidder_diageo_exports = {};
__export(smartbidder_diageo_exports, {
  default: () => Article124
});
var import_react21 = require("@remix-run/react");
var import_jsx_dev_runtime20 = require("react/jsx-dev-runtime");
function Article124() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("h1", { className: "tracking-light text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
        " ",
        " Five Ways to Do Rag with DSPy"
      ] }, void 0, !0, {
        fileName: "app/routes/smartbidder-diageo.tsx",
        lineNumber: 9,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
        "img",
        {
          className: "mx-auto my-auto h-1/2 w-1/2",
          src: letters1_default,
          alt: "letters"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 12,
          columnNumber: 9
        },
        this
      ),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("div", { children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          " DSPy is a versatile toolkit for information retrieval and prompt engineering. It can be thought of as a prompting language. It can leverage various techniques to retrieve relevant documents efficiently. Let\u2019s explore five key approaches that make Retrieval Augmented Generation easier and less bloated!"
        ] }, void 0, !0, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 19,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 22,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "1. Keyword-Based Retrieval" }, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 23,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy can use traditional information retrieval techniques like TF-IDF or BM25 to find documents based on keyword matching. This approach is efficient and doesn\u2019t rely on embeddings or vector databases." }, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 26,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 29,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "2. Metadata Filtering" }, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 30,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "When documents have metadata such as tags, categories, or dates, DSPy can filter results based on this metadata. This narrows the search space and improves retrieval accuracy." }, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 33,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 36,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "3. External Search APIs" }, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 37,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy integrates with external search APIs like Google Search or Bing Search. These APIs use their indexing mechanisms to retrieve documents, often bypassing the need for a local database." }, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 40,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 43,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "4. In-Memory Data Structures" }, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 44,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "For smaller datasets, DSPy can load documents into memory and use efficient structures like inverted indexes or hash tables for fast lookups, avoiding vector database dependencies." }, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 47,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 50,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "5. Hybrid Approaches" }, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 51,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Combining methods can improve retrieval accuracy. For example, DSPy might use keyword-based retrieval for initial filtering and cosine similarity on TF-IDF vectors for final ranking." }, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 54,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 57,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy\u2019s flexibility makes it an excellent choice for diverse information retrieval tasks." }, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 58,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
          "For more about DSPy, visit the official documentation",
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("a", { href: "https://dspy.ai", className: "text-blue-500", children: [
            " ",
            "here"
          ] }, void 0, !0, {
            fileName: "app/routes/smartbidder-diageo.tsx",
            lineNumber: 64,
            columnNumber: 13
          }, this),
          "."
        ] }, void 0, !0, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 62,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 69,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
          "Diageo, a global leader in beverage alcohol, has been actively exploring and implementing artificial intelligence (AI) across various facets of its business. One notable application is the development of a paid social media buying tool, often referred to as",
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("a", { href: "https://www.diageo.com", className: "text-blue-500", children: " Smartbidder" }, void 0, !1, {
            fileName: "app/routes/smartbidder-diageo.tsx",
            lineNumber: 72,
            columnNumber: 13
          }, this),
          " (though the exact name may vary depending on internal naming conventions). This tool aims to optimize the efficiency of media spending, ensuring that every dollar invested yields the maximum possible return. In the competitive landscape of the alcohol industry, effective marketing and targeted advertising are crucial for brand visibility and sales. The core function of such a tool is to leverage AI algorithms to analyze vast amounts of data related to consumer behavior, market trends, and advertising performance. By processing this information, the tool can make data-driven decisions about ad placement, targeting, and bidding strategies. This level of automation and analysis allows Diageo to move beyond traditional, less precise methods of media buying, enabling more effective reach of their target demographics. This is especially important for brands like",
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("a", { href: "https://www.johnniewalker.com", className: "text-blue-500", children: " Johnnie Walker" }, void 0, !1, {
            fileName: "app/routes/smartbidder-diageo.tsx",
            lineNumber: 75,
            columnNumber: 13
          }, this),
          ", which cater to diverse consumer segments across different markets. Smartbidder likely uses machine learning models to predict the performance of different ad campaigns based on various factors, such as demographics, interests, and past interactions with Diageo's brands. This predictive capability allows for real-time adjustments to ad spend and targeting, maximizing the impact of each campaign. For instance, the tool might identify a specific demographic that is highly responsive to advertisements for a particular product, such as",
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("a", { href: "https://www.donjulio.com", className: "text-blue-500", children: " Don Julio" }, void 0, !1, {
            fileName: "app/routes/smartbidder-diageo.tsx",
            lineNumber: 78,
            columnNumber: 13
          }, this),
          " tequila, and automatically allocate more budget to target that group. The benefits of implementing such an AI-powered tool are multifaceted. Firstly, it enhances the efficiency of media spending by minimizing wasted ad spend on ineffective campaigns. Secondly, it allows for more precise targeting, ensuring that advertisements reach the intended audience. This is particularly important in the alcohol industry, where responsible marketing and age-gating are crucial considerations. Finally, it provides valuable insights into consumer behavior and market trends, which can inform future marketing strategies and product development. In essence, Diageo's investment in AI-driven media buying tools like Smartbidder reflects a broader industry trend towards data-driven decision-making. By harnessing the power of AI, Diageo aims to optimize its marketing efforts, strengthen its brand presence, and ultimately drive sales across its extensive portfolio, from Guinness to Tanqueray. This strategic use of technology positions Diageo to remain competitive in the evolving landscape of the global beverage alcohol market."
        ] }, void 0, !0, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 70,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
          "Go back",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(
            import_react21.Link,
            {
              to: "/",
              className: "text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
              children: "Home"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/smartbidder-diageo.tsx",
              lineNumber: 87,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/smartbidder-diageo.tsx",
          lineNumber: 85,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/smartbidder-diageo.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/smartbidder-diageo.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/smartbidder-diageo.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/weirdinternetfacts.tsx
var weirdinternetfacts_exports = {};
__export(weirdinternetfacts_exports, {
  default: () => Article1
});
var import_react22 = require("@remix-run/react");

// public/old-comp1.jpeg
var old_comp1_default = "/build/_assets/old-comp1-XL4TSVQU.jpeg";

// app/routes/weirdinternetfacts.tsx
var import_jsx_dev_runtime21 = require("react/jsx-dev-runtime");
function Article1() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "4 Weird Things about the Internet " }, void 0, !1, {
      fileName: "app/routes/weirdinternetfacts.tsx",
      lineNumber: 11,
      columnNumber: 9
    }, this),
    "   ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("br", {}, void 0, !1, {
      fileName: "app/routes/weirdinternetfacts.tsx",
      lineNumber: 12,
      columnNumber: 51
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
      "img",
      {
        className: "h-full w-full  ",
        src: old_comp1_default,
        alt: "dudes messing with an old computer"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/weirdinternetfacts.tsx",
        lineNumber: 13,
        columnNumber: 9
      },
      this
    ),
    "   ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("br", {}, void 0, !1, {
      fileName: "app/routes/weirdinternetfacts.tsx",
      lineNumber: 17,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-3xl", children: "Weird internet things. Let's go!" }, void 0, !1, {
        fileName: "app/routes/weirdinternetfacts.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      "   ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/weirdinternetfacts.tsx",
        lineNumber: 21,
        columnNumber: 50
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("ol", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-2xl", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("li", { className: "pb-2", children: "1. Before internet, there was ARPANET and packet switching." }, void 0, !1, {
          fileName: "app/routes/weirdinternetfacts.tsx",
          lineNumber: 23,
          columnNumber: 11
        }, this),
        "   ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/weirdinternetfacts.tsx",
          lineNumber: 23,
          columnNumber: 99
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("li", { className: "pb-2", children: "2. The word Internet was first used in 1974 and is short for internetwork." }, void 0, !1, {
          fileName: "app/routes/weirdinternetfacts.tsx",
          lineNumber: 24,
          columnNumber: 11
        }, this),
        "   ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/weirdinternetfacts.tsx",
          lineNumber: 27,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("li", { className: "pb-2", children: "3. Internet used to be capitalized more, lol." }, void 0, !1, {
          fileName: "app/routes/weirdinternetfacts.tsx",
          lineNumber: 28,
          columnNumber: 11
        }, this),
        "   ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/weirdinternetfacts.tsx",
          lineNumber: 28,
          columnNumber: 85
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("li", { className: "pb-2", children: "4. CERN, creators of the Large Hadron Collider(LHC), is credited with the first highspeed T1 (1.5 Mbit/s) link, which connected CERN to Cornell University." }, void 0, !1, {
          fileName: "app/routes/weirdinternetfacts.tsx",
          lineNumber: 29,
          columnNumber: 11
        }, this),
        "   ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/weirdinternetfacts.tsx",
          lineNumber: 33,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/weirdinternetfacts.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/weirdinternetfacts.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("p", { className: "text-center text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl text-yellow-500", children: [
      "Go back ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_react22.Link, { to: "/", className: " text-center text-6xl font-extrabold tracking-tight sm:text-xl lg:text-4xl text-blue-500", children: "Home" }, void 0, !1, {
        fileName: "app/routes/weirdinternetfacts.tsx",
        lineNumber: 37,
        columnNumber: 19
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/weirdinternetfacts.tsx",
      lineNumber: 36,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/weirdinternetfacts.tsx",
    lineNumber: 10,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/weirdinternetfacts.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// app/routes/threejsandweb3.tsx
var threejsandweb3_exports = {};
__export(threejsandweb3_exports, {
  default: () => Article46
});
var import_react23 = require("@remix-run/react"), import_chicken = __toESM(require_chicken()), import_Cloud = __toESM(require_Cloud()), import_react24 = require("react"), import_jsx_dev_runtime22 = require("react/jsx-dev-runtime");
function Article46() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { className: "relative", children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react24.Suspense, { fallback: null, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_chicken.default, {}, void 0, !1, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 20,
        columnNumber: 35
      }, this),
      " "
    ] }, void 0, !0, {
      fileName: "app/routes/threejsandweb3.tsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "ThreeJS, the old Web3? " }, void 0, !1, {
      fileName: "app/routes/threejsandweb3.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        "ThreeJS has been around a while.  ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("br", {}, void 0, !1, {
          fileName: "app/routes/threejsandweb3.tsx",
          lineNumber: 28,
          columnNumber: 47
        }, this),
        "So can it be considered part of Web3? "
      ] }, void 0, !0, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 28,
        columnNumber: 96
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "Maybe its better to think of what the baseline of web3 is. Maybe its like a cusp. Sort of like being a millenial and GenZ cusp kid. " }, void 0, !1, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 29,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 37,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For the docs on ThreeJS, you can visit",
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("a", { href: "https://threejs.org/", className: "text-blue-500", children: [
          " ",
          "here"
        ] }, void 0, !0, {
          fileName: "app/routes/threejsandweb3.tsx",
          lineNumber: 39,
          columnNumber: 13
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 38,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_react24.Suspense, { fallback: null, children: /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(import_Cloud.default, {}, void 0, !1, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 42,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 41,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("br", {}, void 0, !1, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 44,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For some solid advice on film sound and sound mixers in NYC, you can visit",
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("a", { href: "https://www.nycsoundguy.com", className: "text-blue-500", children: [
          " ",
          "NYC Sound Guy here"
        ] }, void 0, !0, {
          fileName: "app/routes/threejsandweb3.tsx",
          lineNumber: 46,
          columnNumber: 13
        }, this),
        "."
      ] }, void 0, !0, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 45,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(
          import_react23.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/threejsandweb3.tsx",
            lineNumber: 50,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/threejsandweb3.tsx",
        lineNumber: 48,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/threejsandweb3.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/threejsandweb3.tsx",
    lineNumber: 19,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/threejsandweb3.tsx",
    lineNumber: 16,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/threejsandweb3.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

// app/routes/models-table2.tsx
var models_table2_exports = {};
__export(models_table2_exports, {
  ErrorBoundary: () => ErrorBoundary,
  action: () => action,
  default: () => ModelsTable,
  loader: () => loader2
});
var import_react25 = require("@remix-run/react"), import_node3 = require("@remix-run/node");

// app/supabase.server.ts
var import_supabase_js2 = require("@supabase/supabase-js"), import_tiny_invariant3 = __toESM(require("tiny-invariant"));
(0, import_tiny_invariant3.default)(
  process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY,
  "Supabase credentials not found in environment variables"
);
var supabase2 = (0, import_supabase_js2.createClient)(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// app/routes/models-table2.tsx
var import_jsx_dev_runtime23 = require("react/jsx-dev-runtime");
async function loader2({ request }) {
  let { data, error } = await supabase2.from("models").select("*").order("release_date", { ascending: !1 });
  if (error)
    throw console.error("Loader error:", error), new Response("Failed to load models", { status: 500 });
  return (0, import_node3.json)(data ?? []);
}
async function action({ request }) {
  let formData = await request.formData(), name = formData.get("name"), type = formData.get("type"), parameter_count = parseInt(formData.get("parameter_count"), 10), experts = parseInt(formData.get("experts"), 10), context_window_tokens = parseInt(formData.get("context_window_tokens"), 10);
  if (!name || !type || isNaN(parameter_count) || isNaN(experts) || isNaN(context_window_tokens))
    return (0, import_node3.json)({ error: "Invalid form data" }, { status: 400 });
  let { data, error } = await supabase2.from("models").insert([{ name, type, parameter_count, experts, context_window_tokens }]).select();
  return error ? (console.error("Action error:", error), (0, import_node3.json)({ error: "Failed to register model" }, { status: 500 })) : (0, import_node3.json)(data ? data[0] : null);
}
function ModelsTable() {
  let models = (0, import_react25.useLoaderData)(), actionData = (0, import_react25.useActionData)(), transition = (0, import_react25.useTransition)(), isSubmitting = transition.state === "submitting", isLoading = transition.state === "loading";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "max-w-7xl mx-auto p-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_react25.Link, { to: "/", className: "text-blue-600 hover:underline", children: "Back to Home" }, void 0, !1, {
      fileName: "app/routes/models-table2.tsx",
      lineNumber: 69,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/models-table2.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("section", { className: "mb-12 bg-white shadow-sm rounded-xl p-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("h2", { className: "text-2xl font-bold mb-6", children: "Register New AI Model" }, void 0, !1, {
        fileName: "app/routes/models-table2.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("p", { className: "text-red-500 mb-4", children: actionData.error }, void 0, !1, {
        fileName: "app/routes/models-table2.tsx",
        lineNumber: 79,
        columnNumber: 11
      }, this),
      actionData && !actionData.error && transition.state === "idle" && /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("p", { className: "text-green-500 mb-4", children: "Model registered successfully!" }, void 0, !1, {
        fileName: "app/routes/models-table2.tsx",
        lineNumber: 83,
        columnNumber: 12
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_react25.Form, { method: "post", className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: ["name", "type", "parameter_count", "experts", "context_window_tokens"].map((field) => /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("label", { className: "block text-sm font-medium capitalize mb-2", children: field.replace(/_/g, " ") }, void 0, !1, {
            fileName: "app/routes/models-table2.tsx",
            lineNumber: 91,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
            "input",
            {
              name: field,
              type: field === "name" || field === "type" ? "text" : "number",
              required: !0,
              className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/models-table2.tsx",
              lineNumber: 94,
              columnNumber: 17
            },
            this
          )
        ] }, field, !0, {
          fileName: "app/routes/models-table2.tsx",
          lineNumber: 90,
          columnNumber: 15
        }, this)) }, void 0, !1, {
          fileName: "app/routes/models-table2.tsx",
          lineNumber: 87,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50",
            children: isSubmitting ? "Registering..." : "Register Model"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/models-table2.tsx",
            lineNumber: 104,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/models-table2.tsx",
        lineNumber: 86,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/models-table2.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("section", { className: "bg-white shadow-sm rounded-xl overflow-hidden", children: [
      isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "p-6 text-center text-gray-500", children: "Loading models..." }, void 0, !1, {
        fileName: "app/routes/models-table2.tsx",
        lineNumber: 117,
        columnNumber: 11
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_jsx_dev_runtime23.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("h2", { className: "text-xl font-semibold", children: "Registered Models" }, void 0, !1, {
          fileName: "app/routes/models-table2.tsx",
          lineNumber: 123,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/models-table2.tsx",
          lineNumber: 122,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("table", { className: "w-full", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("tr", { children: ["Name", "Type", "Parameters", "Experts", "Context Window", "Release Date"].map((header) => /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
            "th",
            {
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: header
            },
            header,
            !1,
            {
              fileName: "app/routes/models-table2.tsx",
              lineNumber: 131,
              columnNumber: 23
            },
            this
          )) }, void 0, !1, {
            fileName: "app/routes/models-table2.tsx",
            lineNumber: 128,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/models-table2.tsx",
            lineNumber: 127,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("tbody", { className: "divide-y divide-gray-200", children: Array.isArray(models) && models.map((model) => /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: model.name || "N/A" }, void 0, !1, {
              fileName: "app/routes/models-table2.tsx",
              lineNumber: 144,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: model.type || "N/A" }, void 0, !1, {
              fileName: "app/routes/models-table2.tsx",
              lineNumber: 147,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: (model.parameter_count ?? 0).toLocaleString() }, void 0, !1, {
              fileName: "app/routes/models-table2.tsx",
              lineNumber: 150,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: model.experts ?? "N/A" }, void 0, !1, {
              fileName: "app/routes/models-table2.tsx",
              lineNumber: 153,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: (model.context_window_tokens ?? 0).toLocaleString() }, void 0, !1, {
              fileName: "app/routes/models-table2.tsx",
              lineNumber: 154,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: model.release_date ? new Date(model.release_date).toLocaleDateString() : "N/A" }, void 0, !1, {
              fileName: "app/routes/models-table2.tsx",
              lineNumber: 157,
              columnNumber: 24
            }, this)
          ] }, model.id, !0, {
            fileName: "app/routes/models-table2.tsx",
            lineNumber: 142,
            columnNumber: 21
          }, this)) }, void 0, !1, {
            fileName: "app/routes/models-table2.tsx",
            lineNumber: 140,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/models-table2.tsx",
          lineNumber: 126,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/models-table2.tsx",
          lineNumber: 125,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/models-table2.tsx",
        lineNumber: 121,
        columnNumber: 11
      }, this),
      (!Array.isArray(models) || models.length === 0) && /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("p", { className: "px-6 py-4 text-center text-gray-500", children: "No models registered yet." }, void 0, !1, {
        fileName: "app/routes/models-table2.tsx",
        lineNumber: 168,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/models-table2.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/models-table2.tsx",
    lineNumber: 66,
    columnNumber: 5
  }, this);
}
function ErrorBoundary({ error }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("div", { className: "p-4 bg-red-100 text-red-700 rounded-lg", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("h2", { className: "font-bold mb-2", children: "Table Error:" }, void 0, !1, {
      fileName: "app/routes/models-table2.tsx",
      lineNumber: 179,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("p", { children: error.message }, void 0, !1, {
      fileName: "app/routes/models-table2.tsx",
      lineNumber: 180,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/models-table2.tsx",
    lineNumber: 178,
    columnNumber: 5
  }, this);
}

// app/routes/models-table.tsx
var models_table_exports = {};
__export(models_table_exports, {
  action: () => action2,
  default: () => ModelsTable2,
  loader: () => loader3
});
var import_node4 = require("@remix-run/node"), import_react26 = require("@remix-run/react");
var import_jsx_dev_runtime24 = require("react/jsx-dev-runtime"), loader3 = async ({ request }) => {
  let { data } = await supabase2.from("models").select("*").order("release_date", { ascending: !1 });
  return (0, import_node4.json)({ models: data });
}, action2 = async ({ request }) => {
  let formData = await request.formData(), model = {
    name: formData.get("name"),
    type: formData.get("type"),
    parameter_count: Number(formData.get("parameter_count")),
    experts: Number(formData.get("experts")),
    context_window_tokens: Number(formData.get("context_window_tokens"))
  }, { data } = await supabase2.from("models").insert([model]).select();
  return (0, import_node4.json)({ success: !0, model: data ? data[0] : null });
};
function ModelsTable2() {
  let data = (0, import_react26.useLoaderData)(), models = "models" in data ? data.models : [], actionData = (0, import_react26.useActionData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "p-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("h1", { className: "text-2xl font-bold mb-4", children: "AI Models" }, void 0, !1, {
      fileName: "app/routes/models-table.tsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(import_react26.Form, { method: "post", className: "mb-8 p-4 bg-gray-100 rounded", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("label", { children: "Name" }, void 0, !1, {
            fileName: "app/routes/models-table.tsx",
            lineNumber: 56,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("input", { name: "name", className: "w-full p-2" }, void 0, !1, {
            fileName: "app/routes/models-table.tsx",
            lineNumber: 57,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 55,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("label", { children: "Type" }, void 0, !1, {
            fileName: "app/routes/models-table.tsx",
            lineNumber: 61,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("input", { name: "type", className: "w-full p-2" }, void 0, !1, {
            fileName: "app/routes/models-table.tsx",
            lineNumber: 62,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 60,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/models-table.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("button", { type: "submit", className: "bg-blue-500 text-white px-4 py-2 rounded", children: "Add Model" }, void 0, !1, {
        fileName: "app/routes/models-table.tsx",
        lineNumber: 67,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/models-table.tsx",
      lineNumber: 53,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("table", { className: "w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("th", { children: "Name" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 76,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("th", { children: "Type" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 77,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("th", { children: "Parameters" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 78,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("th", { children: "Experts" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 79,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("th", { children: "Context Window" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 80,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("th", { children: "Release Date" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 81,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/models-table.tsx",
        lineNumber: 75,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/models-table.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("tbody", { className: "divide-y divide-gray-200", children: Array.isArray(models) && models.map((model) => /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: model.name || "N/A" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 87,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: model.type || "N/A" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 90,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: model.parameter_count != null ? model.parameter_count.toLocaleString() : "N/A" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 93,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: model.experts != null ? model.experts : "N/A" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 96,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: model.context_window_tokens != null ? model.context_window_tokens.toLocaleString() : "N/A" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 99,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: model.release_date ? new Date(model.release_date).toLocaleDateString() : "N/A" }, void 0, !1, {
          fileName: "app/routes/models-table.tsx",
          lineNumber: 102,
          columnNumber: 15
        }, this)
      ] }, model.id, !0, {
        fileName: "app/routes/models-table.tsx",
        lineNumber: 86,
        columnNumber: 13
      }, this)) }, void 0, !1, {
        fileName: "app/routes/models-table.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/models-table.tsx",
      lineNumber: 73,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/models-table.tsx",
    lineNumber: 49,
    columnNumber: 5
  }, this);
}

// app/routes/what-is-rag.tsx
var what_is_rag_exports = {};
__export(what_is_rag_exports, {
  default: () => what_is_rag_default,
  meta: () => meta7
});
var import_react27 = require("@remix-run/react");

// public/dspyprompt.png
var dspyprompt_default = "/build/_assets/dspyprompt-SGTMQH6J.png";

// app/routes/what-is-rag.tsx
var import_jsx_dev_runtime25 = require("react/jsx-dev-runtime"), meta7 = () => ({
  title: "What is RAG (Retrieval-Augmented Generation)?",
  "og:image": dspyprompt_default,
  "og:title": "What is RAG (Retrieval-Augmented Generation)?",
  "og:description": "Learn about Retrieval-Augmented Generation (RAG), the AI framework that enhances LLM outputs with external knowledge for better accuracy and context.",
  "og:type": "article",
  "twitter:card": "summary_large_image",
  "twitter:title": "What is RAG (Retrieval-Augmented Generation)?",
  "twitter:description": "Learn about Retrieval-Augmented Generation (RAG), the AI framework that enhances LLM outputs with external knowledge for better accuracy and context.",
  "twitter:image": dspyprompt_default,
  "linkedin:title": "What is RAG (Retrieval-Augmented Generation)?",
  "linkedin:description": "Learn about Retrieval-Augmented Generation (RAG), the AI framework that enhances LLM outputs with external knowledge for better accuracy and context.",
  "linkedin:image": dspyprompt_default,
  keywords: "RAG, AI, LLM, Retrieval-Augmented Generation, AI Tutorial, Machine Learning, Natural Language Processing"
}), RemixPage2 = () => /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "min-h-screen bg-gray-100 text-gray-800", children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("header", { className: "bg-blue-600 text-white py-6 shadow-lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("h1", { className: "text-3xl font-bold", children: "What is RAG (Retrieval-Augmented Generation)?" }, void 0, !1, {
      fileName: "app/routes/what-is-rag.tsx",
      lineNumber: 31,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("p", { className: "mt-2", children: "Understanding the Framework that Enhances LLM Capabilities" }, void 0, !1, {
      fileName: "app/routes/what-is-rag.tsx",
      lineNumber: 32,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/what-is-rag.tsx",
    lineNumber: 30,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/what-is-rag.tsx",
    lineNumber: 29,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("main", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Introduction" }, void 0, !1, {
        fileName: "app/routes/what-is-rag.tsx",
        lineNumber: 38,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Retrieval-Augmented Generation (RAG) is an AI framework that enhances the outputs of large language models (LLMs) by incorporating information from external sources. It combines the generative capabilities of LLMs with the retrieval capabilities of traditional information retrieval. This combination allows RAG to access and reference information outside the LLMs' training data, leading to more accurate, up-to-date, and contextually relevant responses." }, void 0, !1, {
        fileName: "app/routes/what-is-rag.tsx",
        lineNumber: 39,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/what-is-rag.tsx",
      lineNumber: 37,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "How RAG Works" }, void 0, !1, {
        fileName: "app/routes/what-is-rag.tsx",
        lineNumber: 45,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "1. Retrieval" }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 48,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("p", { className: "text-lg", children: "A user's query is first used to search an external knowledge base or database." }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 49,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-is-rag.tsx",
          lineNumber: 47,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "2. Augmentation" }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 52,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("p", { className: "text-lg", children: "The retrieved relevant information is then integrated into the user's prompt before being sent to the LLM." }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 53,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-is-rag.tsx",
          lineNumber: 51,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "3. Generation" }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 56,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("p", { className: "text-lg", children: "The LLM generates a response based on the augmented prompt, incorporating the retrieved context." }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 57,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-is-rag.tsx",
          lineNumber: 55,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/what-is-rag.tsx",
        lineNumber: 46,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/what-is-rag.tsx",
      lineNumber: 44,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Benefits of RAG" }, void 0, !1, {
        fileName: "app/routes/what-is-rag.tsx",
        lineNumber: 63,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "Enhanced Accuracy" }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 66,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("p", { className: "text-lg", children: "By accessing external knowledge, RAG can generate more factually correct and up-to-date answers." }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 67,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-is-rag.tsx",
          lineNumber: 65,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "Improved Context" }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 70,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("p", { className: "text-lg", children: "RAG allows LLMs to produce responses that are more relevant to the specific user query and context." }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 71,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-is-rag.tsx",
          lineNumber: 69,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("h3", { className: "font-bold text-xl mb-2", children: "Reduced Need for Fine-Tuning" }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 74,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("p", { className: "text-lg", children: "RAG can provide some of the benefits of a custom-trained LLM without the need for extensive training or fine-tuning." }, void 0, !1, {
            fileName: "app/routes/what-is-rag.tsx",
            lineNumber: 75,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/what-is-rag.tsx",
          lineNumber: 73,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/what-is-rag.tsx",
        lineNumber: 64,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/what-is-rag.tsx",
      lineNumber: 62,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("p", { className: "text-center text-blue-500 text-lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_react27.Link, { to: "/", children: "Go back to Home" }, void 0, !1, {
      fileName: "app/routes/what-is-rag.tsx",
      lineNumber: 81,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/what-is-rag.tsx",
      lineNumber: 80,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/what-is-rag.tsx",
    lineNumber: 36,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("footer", { className: "bg-gray-200 py-4 text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("p", { className: "text-sm", children: "\xA9 2025 RAG Guide. All rights reserved." }, void 0, !1, {
    fileName: "app/routes/what-is-rag.tsx",
    lineNumber: 86,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/what-is-rag.tsx",
    lineNumber: 85,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/what-is-rag.tsx",
  lineNumber: 28,
  columnNumber: 5
}, this), what_is_rag_default = RemixPage2;

// app/routes/dspy101.tsx
var dspy101_exports = {};
__export(dspy101_exports, {
  default: () => dspy101_default,
  meta: () => meta8
});
var import_react28 = require("@remix-run/react");

// public/fish1.png
var fish1_default = "/build/_assets/fish1-4XUS2WEO.png";

// app/routes/dspy101.tsx
var import_jsx_dev_runtime26 = require("react/jsx-dev-runtime"), meta8 = () => ({
  title: "DSPy 101 Tutorial: Prompting Guide",
  "og:image": fish1_default,
  keywords: "DSPy, Python, AI, AI Agent, AI Tutorial, AI Chatbot"
}), RemixPage3 = () => /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "min-h-screen bg-gray-100 text-gray-800", children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("header", { className: "bg-blue-600 text-white py-6 shadow-lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h1", { className: "text-3xl font-bold", children: "DSPy 101 Tutorial: Prompting Guide" }, void 0, !1, {
      fileName: "app/routes/dspy101.tsx",
      lineNumber: 19,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "mt-2", children: "Simplify LLM-powered applications with DSPy." }, void 0, !1, {
      fileName: "app/routes/dspy101.tsx",
      lineNumber: 20,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dspy101.tsx",
    lineNumber: 18,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/dspy101.tsx",
    lineNumber: 17,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("section", { className: "mb-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("img", { className: "mx-auto my-auto h-1/2 w-1/2 ", src: fish1_default, alt: "DSPy Prompt" }, void 0, !1, {
    fileName: "app/routes/dspy101.tsx",
    lineNumber: 24,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/dspy101.tsx",
    lineNumber: 23,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("main", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Quick Start" }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 29,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("pre", { className: "bg-gray-800 text-white p-4 rounded-lg overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("code", { children: `
import dspy

lm = dspy.LM('ollama_chat/llama3.2:1b', api_base='http://localhost:11434')
dspy.configure(lm=lm)
` }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 31,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 30,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "This snippet initializes a language model and configures DSPy for use." }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 40,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dspy101.tsx",
      lineNumber: 28,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Defining a Signature" }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 44,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("pre", { className: "bg-gray-800 text-white p-4 rounded-lg overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("code", { children: `
from typing import Literal

class Categorize(dspy.Signature):
    event: str = dspy.InputField()
    category: Literal['Wars and Conflicts', 'Politics'] = dspy.OutputField()
    confidence: float = dspy.OutputField()
` }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 46,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 45,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Signatures define input-output structures, making your models more intuitive." }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 57,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dspy101.tsx",
      lineNumber: 43,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Calling the Module" }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 61,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("pre", { className: "bg-gray-800 text-white p-4 rounded-lg overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("code", { children: `
classify = dspy.Predict(Categorize)
classification = classify(event="[YOUR HISTORIC EVENT]")
print(classification)
` }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 63,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 62,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
        "Use the ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("code", { children: "Predict" }, void 0, !1, {
          fileName: "app/routes/dspy101.tsx",
          lineNumber: 71,
          columnNumber: 106
        }, this),
        " module to classify events with ease."
      ] }, void 0, !0, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 71,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dspy101.tsx",
      lineNumber: 60,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Optimizing Prompts" }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 75,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("pre", { className: "bg-gray-800 text-white p-4 rounded-lg overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("code", { children: `
from dspy.teleprompt import *
tp = dspy.MIPROv2(metric=validate_category, auto="light")
optimized_classify = tp.compile(classify, trainset=trainset)
` }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 77,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Optimize prompts with DSPy\u2019s Teleprompt module for better performance." }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 85,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dspy101.tsx",
      lineNumber: 74,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Saving Optimized Systems" }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 89,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("pre", { className: "bg-gray-800 text-white p-4 rounded-lg overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("code", { children: `
optimized_classify.save("optimized_event_classifier.json")
` }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 91,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 90,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Save your optimized classification systems for later use or deployment." }, void 0, !1, {
        fileName: "app/routes/dspy101.tsx",
        lineNumber: 97,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/dspy101.tsx",
      lineNumber: 88,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-center text-blue-500 text-lg", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(import_react28.Link, { to: "/", children: "Go back to Home" }, void 0, !1, {
      fileName: "app/routes/dspy101.tsx",
      lineNumber: 101,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/dspy101.tsx",
      lineNumber: 100,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/dspy101.tsx",
    lineNumber: 27,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("footer", { className: "bg-gray-200 py-4 text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("p", { className: "text-sm", children: "\xA9 2025 DSPy Guide. All rights reserved." }, void 0, !1, {
    fileName: "app/routes/dspy101.tsx",
    lineNumber: 106,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/dspy101.tsx",
    lineNumber: 105,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/dspy101.tsx",
  lineNumber: 16,
  columnNumber: 5
}, this), dspy101_default = RemixPage3;

// app/routes/$title.tsx
var title_exports = {};
__export(title_exports, {
  action: () => action3,
  default: () => NoteDetailsPage,
  loader: () => loader4
});
var import_node5 = require("@remix-run/node"), import_react29 = require("@remix-run/react");

// app/models/note2.server.ts
async function getNoteListItems() {
  let { data } = await supabase.from("tastytable1").select("id, title");
  return data;
}
async function logNoteListItems() {
  return getNoteListItems().then((noteListItems) => {
    noteListItems == null || noteListItems.forEach((item) => {
      console.log(`id: ${item.id}, title: ${item.title}`);
    });
  }).catch((error) => {
    console.error(error);
  });
}
logNoteListItems().then(() => {
  console.log("Logging of note list items is complete");
}).catch((error) => {
  console.error(error);
});
logNoteListItems().then(() => {
  console.log("Logging of note list items is complete");
});

// app/routes/$title.tsx
var import_tiny_invariant4 = __toESM(require("tiny-invariant")), import_jsx_dev_runtime27 = require("react/jsx-dev-runtime");
async function loader4({ params }) {
  (0, import_tiny_invariant4.default)(params.title, "noteTitle not found");
  let note = await getNoteListItems();
  if (!note)
    throw new Response("Not Found", { status: 404 });
  return (0, import_node5.json)({ note });
}
var action3 = async ({ params }) => ((0, import_tiny_invariant4.default)(params.title, "noteTitle not found"), await deleteNoteByTitle(params.title), (0, import_node5.redirect)("/notes"));
function NoteDetailsPage() {
  let data = (0, import_react29.useLoaderData)();
  return console.log(data), /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("h3", { className: "text-2xl font-bold", children: data.note.title }, void 0, !1, {
      fileName: "app/routes/$title.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("p", { className: "py-6", children: data.note.body }, void 0, !1, {
      fileName: "app/routes/$title.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("hr", { className: "my-4" }, void 0, !1, {
      fileName: "app/routes/$title.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)(import_react29.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Delete"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/$title.tsx",
        lineNumber: 46,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/$title.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/$title.tsx",
    lineNumber: 39,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Art2,
  meta: () => meta9
});
var import_react30 = require("@remix-run/react");

// public/cloud1.jpeg
var cloud1_default = "/build/_assets/cloud1-FTZDJF7K.jpeg";

// app/routes/_index.tsx
var import_jsx_dev_runtime28 = require("react/jsx-dev-runtime");
function meta9() {
  return { "og:image": boxchicken2_default };
}
function Art2() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("main", { className: " items-left justify-left mx-4 min-h-screen bg-white lg:mx-36 md:mx-16", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "text-left text-xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("span", { className: "block uppercase text-blue-500 drop-shadow-md", children: "Tasty Tech Bytes" }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 33,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 32,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-xl lg:text-4xl", children: [
      " ",
      "Keeping it Tasty in 2025"
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 38,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "grid lg:grid-cols-4 h-1/4 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "col-span-1  h-1/4  ", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/how-to-invest-in-whisky", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-yellow-500 p-1 text-lg font-bold tracking-tight text-white", children: "Drink World - Helpful" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 50,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
            "img",
            {
              className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
              src: cask1_default,
              alt: "casks"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 54,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "3 Ways to Invest in Whiskey" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 59,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 49,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 48,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/artihow-to-use-the-pie-menu-in-blender", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-purple-900 p-1 text-lg font-bold tracking-tight text-white", children: "3D World - Helpful" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 67,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
            "img",
            {
              className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
              src: blender1_default,
              alt: "computer and graphs"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 71,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "The Pie Menu Rocks in Blender" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 76,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 66,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 65,
          columnNumber: 7
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 46,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "lg:col-span-2  lg:h-1/4  ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/three-essential-webstorm-shortcuts", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-blue-500 p-1 text-lg font-bold tracking-tight text-white", children: "Software - Webstorm" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 86,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
          "img",
          {
            className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
            src: webstorm1_default,
            alt: "computer and graphs"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 89,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "The Three WebStorm Shortcuts to Rule Them All" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 94,
          columnNumber: 11
        }, this),
        " "
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 84,
        columnNumber: 51
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 84,
        columnNumber: 8
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "col-span-1 h-1/4 ", children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/weirdinternetfacts", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-green-400 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Random" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 103,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
            "img",
            {
              className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
              src: old_comp1_default,
              alt: "computer and graphs"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 107,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "4 Weird Things about the Internet" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 112,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 102,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 100,
          columnNumber: 45
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/nab-2023-audio-video-gear", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 122,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
            "img",
            {
              className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
              src: soundsguy1_default,
              alt: "computer and graphs"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 126,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "Highlights from NAB 2023" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 131,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 121,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 120,
          columnNumber: 7
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 100,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "grid grid-cols-4 h-1/4 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "col-span-1 row-span-1 ", children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/threekeys-to-getting-a-frontend-or-fullstackjob", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 150,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
            "img",
            {
              className: "m-2 h-auto flex-col rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
              src: studio_default,
              alt: "Studio by Warren Hansen"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 153,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-3 text-left text-lg font-bold tracking-tight shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30 sm:text-3xl lg:text-4xl", children: "The 3 Keys To Getting Your Dream Frontend or Full Stack Engineer Job" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 158,
            columnNumber: 11
          }, this),
          " "
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 149,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 148,
          columnNumber: 53
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 148,
        columnNumber: 12
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "col-span-1 ", children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/vuejs-independant-javascript-framework", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 166,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
            "img",
            {
              className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
              src: js_burden_default,
              alt: "computer and graphs"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_index.tsx",
              lineNumber: 170,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "VueJS as the Most Indie Yet Established Javascript Framework" }, void 0, !1, {
            fileName: "app/routes/_index.tsx",
            lineNumber: 175,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 165,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 164,
          columnNumber: 42
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 164,
        columnNumber: 12
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "col-span-1  ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/astro-the-most-innovative-javascript-framwork", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 183,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
          "img",
          {
            className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
            src: boxchicken2_default,
            alt: "computer and graphs"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 187,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "Astro.js as the Most Innovative and Modern Javascript Framework" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 192,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 182,
        columnNumber: 9
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 181,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 180,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "col-span-1  ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/the-art-of-the-clean-install", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 202,
          columnNumber: 10
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
          "img",
          {
            className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
            src: graph4_default,
            alt: "computer and graphs"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 206,
            columnNumber: 10
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "The Art of the Clean Install" }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 211,
          columnNumber: 10
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 201,
        columnNumber: 8
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 200,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 198,
        columnNumber: 14
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 146,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/what-is-rag", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white", children: "AI Tips" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 225,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: fish1_default,
          alt: "fish"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 229,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "RAG 101 Tutorial: All you need to know about RAG" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 234,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 224,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 223,
      columnNumber: 6
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/what-are-the-best-free-text-to-speech-tools", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white", children: "AI Tips" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 240,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: text2speech_default,
          alt: "text to speech"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 244,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "What are the Best Free Text-to-Speech Tools? " }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 249,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 239,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 238,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/dspy101", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white", children: "AI Tips" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 256,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: dspyprompt_default,
          alt: "dspyprompt"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 260,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "DSPy 101 Tutorial: Prompting Guide" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 265,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 255,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 254,
      columnNumber: 6
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/databricks-dspy-jetblue-ai-chatbot", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white", children: "AI Tips" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 271,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: databricks_default,
          alt: "databricks"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 275,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: " JetBlue Optimizes Databricks LLM Pipelines with DSPy " }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 280,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 270,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 269,
      columnNumber: 6
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/5waystoenhanceragefficiencywithdspy", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white", children: "AI Tips" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 286,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: letters1_default,
          alt: "letters"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 290,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: " 5 ways to enhance RAG efficiency with DSPy   " }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 295,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 285,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 284,
      columnNumber: 6
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/threejsandweb3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-green-800 p-1 text-lg font-bold tracking-tight text-white", children: "Code Art - ThreeJS" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 301,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: cloud1_default,
          alt: "clouds"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 305,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "ThreeJS, the old Web3?" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 310,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 300,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 299,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/easydomainverificationwithgoogle", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 318,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: analytics1_default,
          alt: "analytics chart"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 322,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "The Easy Way to Verify Domain Ownership with Google" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 327,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 317,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 316,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/liesaboutjavascript", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 334,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: js1_default,
          alt: "javascript chart"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 338,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "Sweet Little JavaScript Lies About Javascript          " }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 343,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 333,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 332,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/create-your-own-huggingface-space-easy", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 349,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: huggingface1_default,
          alt: "emoji"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 353,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "The easy way to publish on Hugging Face Spaces" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 358,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 348,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 347,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/5-ways-ai-can-help-farmland-restoration", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-green-700 p-1 text-lg font-bold tracking-tight text-white", children: [
          " ",
          "AI & Sustainability "
        ] }, void 0, !0, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 366,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
          "img",
          {
            className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
            src: restoration_default,
            alt: "Farmland restoration"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_index.tsx",
            lineNumber: 370,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "5 Ways AI Can Help Farmland Restoration " }, void 0, !1, {
          fileName: "app/routes/_index.tsx",
          lineNumber: 375,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 365,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 364,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/models-table", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-indigo-600 p-1 text-lg font-bold tracking-tight text-white", children: [
        " ",
        "AI Models"
      ] }, void 0, !0, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 383,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: databricks_default,
          alt: "AI models table"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 387,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "View Registered AI Models " }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 392,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 382,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 381,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(import_react30.Link, { to: "/using-airpods-and-audacity-hack", children: /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("div", { className: "rounded-full bg-pink-600 p-1 text-lg font-bold tracking-tight text-white", children: "Tech World - Helpful" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 401,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: airpods_default,
          alt: "computer and graphs"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_index.tsx",
          lineNumber: 405,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "AirPods Audacity: How to make AirPods(or any other bluetooth audio) work with Audacity 2023" }, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 410,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 400,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 399,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 30,
    columnNumber: 5
  }, this);
}

// app/routes/admin1.tsx
var admin1_exports = {};
__export(admin1_exports, {
  default: () => Article125
});
var import_jsx_dev_runtime29 = require("react/jsx-dev-runtime");
function Article125() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(import_jsx_dev_runtime29.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "grid grid-cols-8 grid-rows-auto gap-4 mx-12", children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "bg-blue-500 min-w-[300px] col-span-5 p-4", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor ex in nisi laoreet, vel gravida ex faucibus. Proin vitae urna nec augue sollicitudin finibus vel in magna. Ut et augue vitae magna commodo cursus. Sed sit amet justo ac eros venenatis venenatis." }, void 0, !1, {
      fileName: "app/routes/admin1.tsx",
      lineNumber: 6,
      columnNumber: 65
    }, this),
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "bg-green-500 min-w-[300px] col-span-3 p-4", children: "Sidebar content" }, void 0, !1, {
      fileName: "app/routes/admin1.tsx",
      lineNumber: 6,
      columnNumber: 396
    }, this),
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "bg-yellow-500 min-w-[300px] col-span-5 p-4", children: "Cras vel velit ac ex tincidunt eleifend. Donec sed dui et nulla ultricies finibus. Duis vitae varius nulla. Fusce sodales justo vel pede" }, void 0, !1, {
      fileName: "app/routes/admin1.tsx",
      lineNumber: 6,
      columnNumber: 477
    }, this),
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "bg-red-500 min-w-[300px] col-span-3 p-4", children: "Sidebar content" }, void 0, !1, {
      fileName: "app/routes/admin1.tsx",
      lineNumber: 6,
      columnNumber: 680
    }, this),
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "bg-purple-500 min-w-[300px] col-span-5 p-4", children: "Sed commodo, augue vel ultrices finibus, mi eros bibendum magna, vitae fermentum magna nisl vel sapien. Proin rutrum quam et velit facilisis, vel aliquam eros tempus." }, void 0, !1, {
      fileName: "app/routes/admin1.tsx",
      lineNumber: 6,
      columnNumber: 759
    }, this),
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "bg-teal-500 min-w-[300px] col-span-3 p-4", children: "Sidebar content" }, void 0, !1, {
      fileName: "app/routes/admin1.tsx",
      lineNumber: 6,
      columnNumber: 992
    }, this),
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "bg-orange-500 min-w-[300px] col-span-5 p-4", children: "Mauris vel mauris ut velit euismod venenatis. Proin vulputate mi vel magna finibus, vel ultrices augue fermentum. Sed vel mi at dui commodo finibus." }, void 0, !1, {
      fileName: "app/routes/admin1.tsx",
      lineNumber: 6,
      columnNumber: 1072
    }, this),
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "bg-pink-500 min-w-[300px] col-span-3 p-4", children: "Sidebar content" }, void 0, !1, {
      fileName: "app/routes/admin1.tsx",
      lineNumber: 6,
      columnNumber: 1287
    }, this),
    " "
  ] }, void 0, !0, {
    fileName: "app/routes/admin1.tsx",
    lineNumber: 6,
    columnNumber: 3
  }, this) }, void 0, !1, {
    fileName: "app/routes/admin1.tsx",
    lineNumber: 6,
    columnNumber: 1
  }, this);
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action4,
  loader: () => loader5
});
var import_node6 = require("@remix-run/node");
var action4 = async ({ request }) => logout(request);
async function loader5() {
  return (0, import_node6.redirect)("/");
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action5,
  default: () => Login,
  loader: () => loader6,
  meta: () => meta10
});
var import_react33 = __toESM(require("react")), import_node7 = require("@remix-run/node"), import_react34 = require("@remix-run/react");

// app/utils.ts
var import_react31 = require("react"), import_react32 = require("@remix-run/react");
function useMatchesData(id) {
  let matchingRoutes = (0, import_react32.useMatches)(), route = (0, import_react31.useMemo)(
    () => matchingRoutes.find((route2) => route2.id === id),
    [matchingRoutes, id]
  );
  return route == null ? void 0 : route.data;
}
function isUser(user) {
  return user && typeof user == "object";
}
function useOptionalUser() {
  let data = useMatchesData("root");
  if (!(!data || !isUser(data.user)))
    return data.user;
}
function useUser() {
  let maybeUser = useOptionalUser();
  if (!maybeUser)
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  return maybeUser;
}
function validateEmail(email) {
  return typeof email == "string" && email.length > 3 && email.includes("@");
}

// app/routes/login.tsx
var import_jsx_dev_runtime30 = require("react/jsx-dev-runtime"), meta10 = () => ({
  title: "Login"
});
async function loader6({ request }) {
  return await getUserId(request) ? (0, import_node7.redirect)("/") : (0, import_node7.json)({});
}
var action5 = async ({ request }) => {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = formData.get("redirectTo"), remember = formData.get("remember");
  if (!validateEmail(email))
    return (0, import_node7.json)({ errors: { email: "Email is invalid." } }, { status: 400 });
  if (typeof password != "string")
    return (0, import_node7.json)(
      { errors: { password: "Valid password is required." } },
      { status: 400 }
    );
  if (password.length < 6)
    return (0, import_node7.json)(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  let user = await verifyLogin(email, password);
  return user ? createUserSession({
    request,
    userId: user.id,
    remember: remember === "on",
    redirectTo: typeof redirectTo == "string" ? redirectTo : "/notes"
  }) : (0, import_node7.json)(
    { errors: { email: "Invalid email or password" } },
    { status: 400 }
  );
};
function Login() {
  var _a, _b, _c, _d, _e, _f;
  let [searchParams] = (0, import_react34.useSearchParams)(), redirectTo = searchParams.get("redirectTo") ?? "/notes", actionData = (0, import_react34.useActionData)(), emailRef = import_react33.default.useRef(null), passwordRef = import_react33.default.useRef(null);
  return import_react33.default.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email && ((_b2 = emailRef == null ? void 0 : emailRef.current) == null || _b2.focus()), (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef == null ? void 0 : passwordRef.current) == null || _d2.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(import_react34.Form, { method: "post", className: "space-y-6", noValidate: !0, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("label", { className: "text-sm font-medium", htmlFor: "email", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("span", { className: "block text-gray-700", children: "Email Address" }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 98,
          columnNumber: 15
        }, this),
        ((_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.email) && /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("span", { className: "block pt-1 text-red-700", id: "email-error", children: (_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 100,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 97,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(
        "input",
        {
          className: "w-full rounded border border-gray-500 px-2 py-1 text-lg",
          autoComplete: "email",
          type: "email",
          name: "email",
          id: "email",
          "aria-invalid": (_c = actionData == null ? void 0 : actionData.errors) != null && _c.email ? !0 : void 0,
          "aria-describedby": "email-error",
          ref: emailRef
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 105,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 96,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("label", { className: "text-sm font-medium", htmlFor: "password", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("span", { className: "block text-gray-700", children: "Password" }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 118,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("span", { className: "block font-light text-gray-700", children: "Must have at least 6 characters." }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 119,
          columnNumber: 15
        }, this),
        ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("span", { className: "pt-1 text-red-700", id: "password-error", children: (_e = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _e.password }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 123,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 117,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(
        "input",
        {
          id: "password",
          type: "password",
          name: "password",
          autoComplete: "",
          className: "w-full rounded border border-gray-500 px-2 py-1 text-lg",
          "aria-invalid": (_f = actionData == null ? void 0 : actionData.errors) != null && _f.password ? !0 : void 0,
          "aria-describedby": "password-error",
          ref: passwordRef
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 128,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 116,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(
      "button",
      {
        className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        type: "submit",
        children: "Log in"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/login.tsx",
        lineNumber: 139,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 145,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(
          "input",
          {
            className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
            id: "remember",
            name: "remember",
            type: "checkbox"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 148,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(
          "label",
          {
            className: "ml-2 block text-sm text-gray-900",
            htmlFor: "remember",
            children: "Remember me"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 154,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 147,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)("div", { className: "text-center text-sm text-gray-500", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(
          import_react34.Link,
          {
            className: "text-blue-500 underline",
            to: { pathname: "/join" },
            children: "Sign up"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 163,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 161,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 146,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 95,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 94,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 93,
    columnNumber: 5
  }, this);
}

// app/routes/notes.tsx
var notes_exports = {};
__export(notes_exports, {
  default: () => NotesPage,
  loader: () => loader7
});
var import_node8 = require("@remix-run/node"), import_react35 = require("@remix-run/react");

// app/models/note.server.ts
async function getNoteListItems2({ userId }) {
  let { data } = await supabase.from("notes").select("id, title").eq("profile_id", userId);
  return data;
}
async function createNote({
  title,
  body,
  userId
}) {
  let { data, error } = await supabase.from("notes").insert([{ title, body, profile_id: userId }]).single();
  return error ? null : data;
}
async function deleteNote({
  id,
  userId
}) {
  let { error } = await supabase.from("notes").delete({ returning: "minimal" }).match({ id, profile_id: userId });
  return error ? null : {};
}
async function getNote({
  id,
  userId
}) {
  let { data, error } = await supabase.from("notes").select("*").eq("profile_id", userId).eq("id", id).single();
  return error ? null : {
    userId: data.profile_id,
    id: data.id,
    title: data.title,
    body: data.body
  };
}

// app/routes/notes.tsx
var import_jsx_dev_runtime31 = require("react/jsx-dev-runtime");
async function loader7({ request }) {
  let userId = await requireUserId(request), noteListItems = await getNoteListItems2({ userId });
  return (0, import_node8.json)({ noteListItems });
}
function NotesPage() {
  let data = (0, import_react35.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { className: "flex h-full min-h-screen flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(Header, {}, void 0, !1, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("main", { className: "flex h-full bg-white", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { className: "h-full w-80 border-r bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(import_react35.Link, { to: "new", className: "block p-4 text-xl text-blue-500", children: "+ New Note" }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 27,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("hr", {}, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 31,
          columnNumber: 11
        }, this),
        data.noteListItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("p", { className: "p-4", children: "No notes yet" }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 34,
          columnNumber: 13
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("ol", { children: data.noteListItems.map((note) => /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(
          import_react35.NavLink,
          {
            className: ({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`,
            to: note.id,
            children: [
              "\u{1F4DD} ",
              note.title
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/notes.tsx",
            lineNumber: 39,
            columnNumber: 19
          },
          this
        ) }, note.id, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 38,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 36,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { className: "flex-1 p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(import_react35.Outlet, {}, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 54,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
function Header() {
  let user = useUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("header", { className: "flex items-center justify-between bg-slate-800 p-4 text-white", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("h1", { className: "text-3xl font-bold", children: /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(import_react35.Link, { to: ".", children: "Notes" }, void 0, !1, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 65,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("p", { children: user.email }, void 0, !1, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(import_react35.Form, { action: "/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600",
        children: "Logout"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/notes.tsx",
        lineNumber: 70,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 69,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes.tsx",
    lineNumber: 64,
    columnNumber: 5
  }, this);
}

// app/routes/notes/$noteId.tsx
var noteId_exports = {};
__export(noteId_exports, {
  action: () => action6,
  default: () => NoteDetailsPage2,
  loader: () => loader8
});
var import_node9 = require("@remix-run/node"), import_react36 = require("@remix-run/react");
var import_tiny_invariant5 = __toESM(require("tiny-invariant")), import_jsx_dev_runtime32 = require("react/jsx-dev-runtime");
async function loader8({ request, params }) {
  let userId = await requireUserId(request);
  (0, import_tiny_invariant5.default)(params.noteId, "noteId not found");
  let note = await getNote({ userId, id: params.noteId });
  if (!note)
    throw new Response("Not Found", { status: 404 });
  return (0, import_node9.json)({ note });
}
var action6 = async ({ request, params }) => {
  let userId = await requireUserId(request);
  return (0, import_tiny_invariant5.default)(params.noteId, "noteId not found"), await deleteNote({ userId, id: params.noteId }), (0, import_node9.redirect)("/notes");
};
function NoteDetailsPage2() {
  let data = (0, import_react36.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("h3", { className: "text-2xl font-bold", children: data.note.title }, void 0, !1, {
      fileName: "app/routes/notes/$noteId.tsx",
      lineNumber: 39,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("p", { className: "py-6", children: data.note.body }, void 0, !1, {
      fileName: "app/routes/notes/$noteId.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("hr", { className: "my-4" }, void 0, !1, {
      fileName: "app/routes/notes/$noteId.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(import_react36.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Delete"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/notes/$noteId.tsx",
        lineNumber: 43,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/notes/$noteId.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes/$noteId.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}

// app/routes/notes/index.tsx
var notes_exports2 = {};
__export(notes_exports2, {
  default: () => NoteIndexPage
});
var import_react37 = require("@remix-run/react"), import_jsx_dev_runtime33 = require("react/jsx-dev-runtime");
function NoteIndexPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime33.jsxDEV)("p", { children: [
    "No note selected. Select a note on the left, or",
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime33.jsxDEV)(import_react37.Link, { to: "new", className: "text-blue-500 underline", children: "create a new note." }, void 0, !1, {
      fileName: "app/routes/notes/index.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes/index.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/notes/new.tsx
var new_exports = {};
__export(new_exports, {
  action: () => action7,
  default: () => NewNotePage
});
var import_node10 = require("@remix-run/node"), import_react38 = require("@remix-run/react");
var import_jsx_dev_runtime34 = require("react/jsx-dev-runtime"), action7 = async ({ request }) => {
  let userId = await requireUserId(request), formData = await request.formData(), title = formData.get("title"), body = formData.get("body");
  if (typeof title != "string" || title.length === 0)
    return (0, import_node10.json)({ errors: { title: "Title is required" } }, { status: 400 });
  if (typeof body != "string" || body.length === 0)
    return (0, import_node10.json)({ errors: { body: "Body is required" } }, { status: 400 });
  let note = await createNote({ title, body, userId });
  return (0, import_node10.redirect)(`/notes/${note.id}`);
};
function NewNotePage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)(
    import_react38.Form,
    {
      method: "post",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)("label", { className: "flex w-full flex-col gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)("span", { children: "Title: " }, void 0, !1, {
            fileName: "app/routes/notes/new.tsx",
            lineNumber: 39,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)(
            "input",
            {
              name: "title",
              className: "flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/notes/new.tsx",
              lineNumber: 40,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/notes/new.tsx",
          lineNumber: 38,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/notes/new.tsx",
          lineNumber: 37,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)("label", { className: "flex w-full flex-col gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)("span", { children: "Body: " }, void 0, !1, {
            fileName: "app/routes/notes/new.tsx",
            lineNumber: 48,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)(
            "textarea",
            {
              name: "body",
              rows: 8,
              className: "w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/notes/new.tsx",
              lineNumber: 49,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/notes/new.tsx",
          lineNumber: 47,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/notes/new.tsx",
          lineNumber: 46,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)("div", { className: "text-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime34.jsxDEV)(
          "button",
          {
            type: "submit",
            className: "rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
            children: "Save"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/notes/new.tsx",
            lineNumber: 58,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/notes/new.tsx",
          lineNumber: 57,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/notes/new.tsx",
      lineNumber: 28,
      columnNumber: 5
    },
    this
  );
}

// app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  action: () => action8,
  default: () => Join,
  loader: () => loader9,
  meta: () => meta11
});
var import_node11 = require("@remix-run/node"), import_react39 = require("@remix-run/react");
var React3 = __toESM(require("react")), import_jsx_dev_runtime35 = require("react/jsx-dev-runtime"), meta11 = () => ({
  title: "Sign Up"
});
async function loader9({ request }) {
  return await getUserId(request) ? (0, import_node11.redirect)("/") : (0, import_node11.json)({});
}
var action8 = async ({ request }) => {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = formData.get("redirectTo");
  if (!validateEmail(email))
    return (0, import_node11.json)(
      { errors: { email: "Email is invalid." } },
      { status: 400 }
    );
  if (typeof password != "string")
    return (0, import_node11.json)(
      { errors: { password: "Valid password is required." } },
      { status: 400 }
    );
  if (password.length < 6)
    return (0, import_node11.json)(
      { errors: { password: "Password is too short." } },
      { status: 400 }
    );
  if (await getProfileByEmail(email))
    return (0, import_node11.json)(
      { errors: { email: "A user already exists with this email." } },
      { status: 400 }
    );
  let user = await createUser(email, password);
  return createUserSession({
    request,
    userId: user.id,
    remember: !1,
    redirectTo: typeof redirectTo == "string" ? redirectTo : "/"
  });
};
function Join() {
  var _a, _b, _c, _d, _e, _f;
  let [searchParams] = (0, import_react39.useSearchParams)(), redirectTo = searchParams.get("redirectTo") ?? void 0, actionData = (0, import_react39.useActionData)(), emailRef = React3.useRef(null), passwordRef = React3.useRef(null);
  return React3.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email && ((_b2 = emailRef == null ? void 0 : emailRef.current) == null || _b2.focus()), (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef == null ? void 0 : passwordRef.current) == null || _d2.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)(import_react39.Form, { className: "space-y-6", method: "post", noValidate: !0, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("label", { className: "text-sm font-medium", htmlFor: "email", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("span", { className: "block text-gray-700", children: "Email Address" }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 106,
          columnNumber: 15
        }, this),
        ((_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.email) && /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("span", { className: "block pt-1 text-red-700", id: "email-error", children: (_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 108,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 105,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)(
        "input",
        {
          className: "w-full rounded border border-gray-500 px-2 py-1 text-lg",
          type: "email",
          name: "email",
          id: "email",
          required: !0,
          "aria-invalid": (_c = actionData == null ? void 0 : actionData.errors) != null && _c.email ? !0 : void 0,
          "aria-describedby": "email-error",
          ref: emailRef
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 113,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 104,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("label", { className: "text-sm font-medium", htmlFor: "password", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("span", { className: "block text-gray-700", children: "Password" }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 126,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("span", { className: "block font-light text-gray-700", children: "Must have at least 6 characters." }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 127,
          columnNumber: 15
        }, this),
        ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("span", { className: "pt-1 text-red-700", id: "password-error", children: (_e = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _e.password }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 131,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 125,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)(
        "input",
        {
          id: "password",
          type: "password",
          name: "password",
          className: "w-full rounded border border-gray-500 px-2 py-1 text-lg",
          autoComplete: "new-password",
          "aria-invalid": (_f = actionData == null ? void 0 : actionData.errors) != null && _f.password ? !0 : void 0,
          "aria-describedby": "password-error",
          ref: passwordRef
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 136,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 124,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)(
      "button",
      {
        className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        type: "submit",
        children: "Create Account"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/join.tsx",
        lineNumber: 147,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 153,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)("div", { className: "text-center text-sm text-gray-500", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime35.jsxDEV)(
        import_react39.Link,
        {
          className: "text-blue-500 underline",
          to: {
            pathname: "/login",
            search: searchParams.toString()
          },
          children: "Log in"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 157,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 155,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 154,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/join.tsx",
    lineNumber: 103,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 102,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 101,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-67QCQQBZ.js", imports: ["/build/_shared/chunk-GZ67VEEQ.js", "/build/_shared/chunk-AQBU3SCW.js", "/build/_shared/chunk-4D7IJTTE.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-UPUYHKIL.js", imports: ["/build/_shared/chunk-WA2U3LPD.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/$title": { id: "routes/$title", parentId: "root", path: ":title", index: void 0, caseSensitive: void 0, module: "/build/routes/$title-DVPV57VI.js", imports: ["/build/_shared/chunk-AUYLHJJM.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/5-ways-ai-can-help-farmland-restoration": { id: "routes/5-ways-ai-can-help-farmland-restoration", parentId: "root", path: "5-ways-ai-can-help-farmland-restoration", index: void 0, caseSensitive: void 0, module: "/build/routes/5-ways-ai-can-help-farmland-restoration-KOBQAZV3.js", imports: ["/build/_shared/chunk-VSD2YW34.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/5waystoenhanceragefficiencywithdspy": { id: "routes/5waystoenhanceragefficiencywithdspy", parentId: "root", path: "5waystoenhanceragefficiencywithdspy", index: void 0, caseSensitive: void 0, module: "/build/routes/5waystoenhanceragefficiencywithdspy-ZQLMI6H5.js", imports: ["/build/_shared/chunk-ZC7SERMF.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: "_index", index: void 0, caseSensitive: void 0, module: "/build/routes/_index-B2QIEWJJ.js", imports: ["/build/_shared/chunk-VPGRWE6F.js", "/build/_shared/chunk-W4FSEKMQ.js", "/build/_shared/chunk-IATVABFS.js", "/build/_shared/chunk-TRJMSJ7K.js", "/build/_shared/chunk-BR6YX64X.js", "/build/_shared/chunk-ZC7SERMF.js", "/build/_shared/chunk-MAHSDJRL.js", "/build/_shared/chunk-JKZC5ARB.js", "/build/_shared/chunk-DERAZLSX.js", "/build/_shared/chunk-4EBUDA3J.js", "/build/_shared/chunk-5U6STZGN.js", "/build/_shared/chunk-BBMWQLC7.js", "/build/_shared/chunk-MPEMIJ4O.js", "/build/_shared/chunk-GAYJPPHW.js", "/build/_shared/chunk-H3JK4IV4.js", "/build/_shared/chunk-GMA2IUC5.js", "/build/_shared/chunk-VSD2YW34.js", "/build/_shared/chunk-G7MQFV5O.js", "/build/_shared/chunk-DLWPYVMV.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin1": { id: "routes/admin1", parentId: "root", path: "admin1", index: void 0, caseSensitive: void 0, module: "/build/routes/admin1-QEU7YBKS.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/astro-the-most-innovative-javascript-framwork": { id: "routes/astro-the-most-innovative-javascript-framwork", parentId: "root", path: "astro-the-most-innovative-javascript-framwork", index: void 0, caseSensitive: void 0, module: "/build/routes/astro-the-most-innovative-javascript-framwork-OZRJKJD7.js", imports: ["/build/_shared/chunk-H3JK4IV4.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/create-your-own-huggingface-space-easy": { id: "routes/create-your-own-huggingface-space-easy", parentId: "root", path: "create-your-own-huggingface-space-easy", index: void 0, caseSensitive: void 0, module: "/build/routes/create-your-own-huggingface-space-easy-KLOUDON7.js", imports: ["/build/_shared/chunk-G7MQFV5O.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/databricks-dspy-jetblue-ai-chatbot": { id: "routes/databricks-dspy-jetblue-ai-chatbot", parentId: "root", path: "databricks-dspy-jetblue-ai-chatbot", index: void 0, caseSensitive: void 0, module: "/build/routes/databricks-dspy-jetblue-ai-chatbot-JQTRTGY4.js", imports: ["/build/_shared/chunk-MAHSDJRL.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dspy101": { id: "routes/dspy101", parentId: "root", path: "dspy101", index: void 0, caseSensitive: void 0, module: "/build/routes/dspy101-6LQYSBM6.js", imports: ["/build/_shared/chunk-VPGRWE6F.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/easydomainverificationwithgoogle": { id: "routes/easydomainverificationwithgoogle", parentId: "root", path: "easydomainverificationwithgoogle", index: void 0, caseSensitive: void 0, module: "/build/routes/easydomainverificationwithgoogle-RY6WGSD7.js", imports: ["/build/_shared/chunk-4EBUDA3J.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/how-to-invest-in-whisky": { id: "routes/how-to-invest-in-whisky", parentId: "root", path: "how-to-invest-in-whisky", index: void 0, caseSensitive: void 0, module: "/build/routes/how-to-invest-in-whisky-5ITB43BO.js", imports: ["/build/_shared/chunk-W4FSEKMQ.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/how-to-use-the-pie-menu-in-blender": { id: "routes/how-to-use-the-pie-menu-in-blender", parentId: "root", path: "how-to-use-the-pie-menu-in-blender", index: void 0, caseSensitive: void 0, module: "/build/routes/how-to-use-the-pie-menu-in-blender-2JV4CUJT.js", imports: ["/build/_shared/chunk-JKZC5ARB.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/join": { id: "routes/join", parentId: "root", path: "join", index: void 0, caseSensitive: void 0, module: "/build/routes/join-ZKLNOWGW.js", imports: ["/build/_shared/chunk-G7Y7NEXP.js", "/build/_shared/chunk-4KHYPOKT.js", "/build/_shared/chunk-HC7ZJWEE.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/liesaboutjavascript": { id: "routes/liesaboutjavascript", parentId: "root", path: "liesaboutjavascript", index: void 0, caseSensitive: void 0, module: "/build/routes/liesaboutjavascript-YFGHVXDB.js", imports: ["/build/_shared/chunk-IATVABFS.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-IMCVD3E6.js", imports: ["/build/_shared/chunk-G7Y7NEXP.js", "/build/_shared/chunk-4KHYPOKT.js", "/build/_shared/chunk-HC7ZJWEE.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-OOFYIAXX.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/models-table": { id: "routes/models-table", parentId: "root", path: "models-table", index: void 0, caseSensitive: void 0, module: "/build/routes/models-table-7GZKWLQ5.js", imports: ["/build/_shared/chunk-T3NQUK2P.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/models-table2": { id: "routes/models-table2", parentId: "root", path: "models-table2", index: void 0, caseSensitive: void 0, module: "/build/routes/models-table2-C2ZXDSDG.js", imports: ["/build/_shared/chunk-T3NQUK2P.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !0 }, "routes/nab-2023-audio-video-gear": { id: "routes/nab-2023-audio-video-gear", parentId: "root", path: "nab-2023-audio-video-gear", index: void 0, caseSensitive: void 0, module: "/build/routes/nab-2023-audio-video-gear-CK33YG4I.js", imports: ["/build/_shared/chunk-MPEMIJ4O.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes": { id: "routes/notes", parentId: "root", path: "notes", index: void 0, caseSensitive: void 0, module: "/build/routes/notes-IK34EXNI.js", imports: ["/build/_shared/chunk-4KHYPOKT.js", "/build/_shared/chunk-TLQ22VBH.js", "/build/_shared/chunk-HC7ZJWEE.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes/$noteId": { id: "routes/notes/$noteId", parentId: "routes/notes", path: ":noteId", index: void 0, caseSensitive: void 0, module: "/build/routes/notes/$noteId-52EZE7CK.js", imports: ["/build/_shared/chunk-AUYLHJJM.js", "/build/_shared/chunk-WA2U3LPD.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes/index": { id: "routes/notes/index", parentId: "routes/notes", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/notes/index-RETSRLXI.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes/new": { id: "routes/notes/new", parentId: "routes/notes", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/notes/new-ZPT6MWED.js", imports: ["/build/_shared/chunk-WA2U3LPD.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/smartbidder-diageo": { id: "routes/smartbidder-diageo", parentId: "root", path: "smartbidder-diageo", index: void 0, caseSensitive: void 0, module: "/build/routes/smartbidder-diageo-UIUOAQML.js", imports: ["/build/_shared/chunk-ZC7SERMF.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/the-art-of-the-clean-install": { id: "routes/the-art-of-the-clean-install", parentId: "root", path: "the-art-of-the-clean-install", index: void 0, caseSensitive: void 0, module: "/build/routes/the-art-of-the-clean-install-E3XOEOY5.js", imports: ["/build/_shared/chunk-BBMWQLC7.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/three-essential-webstorm-shortcuts": { id: "routes/three-essential-webstorm-shortcuts", parentId: "root", path: "three-essential-webstorm-shortcuts", index: void 0, caseSensitive: void 0, module: "/build/routes/three-essential-webstorm-shortcuts-5XQBD2RM.js", imports: ["/build/_shared/chunk-DERAZLSX.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/threejsandweb3": { id: "routes/threejsandweb3", parentId: "root", path: "threejsandweb3", index: void 0, caseSensitive: void 0, module: "/build/routes/threejsandweb3-LAAHEZW3.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/threekeys-to-getting-a-frontend-or-fullstackjob": { id: "routes/threekeys-to-getting-a-frontend-or-fullstackjob", parentId: "root", path: "threekeys-to-getting-a-frontend-or-fullstackjob", index: void 0, caseSensitive: void 0, module: "/build/routes/threekeys-to-getting-a-frontend-or-fullstackjob-WYVRH65D.js", imports: ["/build/_shared/chunk-GAYJPPHW.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/using-airpods-and-audacity-hack": { id: "routes/using-airpods-and-audacity-hack", parentId: "root", path: "using-airpods-and-audacity-hack", index: void 0, caseSensitive: void 0, module: "/build/routes/using-airpods-and-audacity-hack-GH4BBNSJ.js", imports: ["/build/_shared/chunk-5U6STZGN.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/vuejs-independant-javascript-framework": { id: "routes/vuejs-independant-javascript-framework", parentId: "root", path: "vuejs-independant-javascript-framework", index: void 0, caseSensitive: void 0, module: "/build/routes/vuejs-independant-javascript-framework-DUGBGQMA.js", imports: ["/build/_shared/chunk-DLWPYVMV.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/weirdinternetfacts": { id: "routes/weirdinternetfacts", parentId: "root", path: "weirdinternetfacts", index: void 0, caseSensitive: void 0, module: "/build/routes/weirdinternetfacts-EEOZNRDN.js", imports: ["/build/_shared/chunk-TRJMSJ7K.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/what-are-the-best-free-text-to-speech-tools": { id: "routes/what-are-the-best-free-text-to-speech-tools", parentId: "root", path: "what-are-the-best-free-text-to-speech-tools", index: void 0, caseSensitive: void 0, module: "/build/routes/what-are-the-best-free-text-to-speech-tools-OTPZU7L6.js", imports: ["/build/_shared/chunk-GMA2IUC5.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/what-is-rag": { id: "routes/what-is-rag", parentId: "root", path: "what-is-rag", index: void 0, caseSensitive: void 0, module: "/build/routes/what-is-rag-3LKIORHO.js", imports: ["/build/_shared/chunk-BR6YX64X.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "6fc20774", hmr: void 0, url: "/build/manifest-6FC20774.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !1, v2_headers: !1, v2_meta: !1, v2_normalizeFormMethod: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/threekeys-to-getting-a-frontend-or-fullstackjob": {
    id: "routes/threekeys-to-getting-a-frontend-or-fullstackjob",
    parentId: "root",
    path: "threekeys-to-getting-a-frontend-or-fullstackjob",
    index: void 0,
    caseSensitive: void 0,
    module: threekeys_to_getting_a_frontend_or_fullstackjob_exports
  },
  "routes/astro-the-most-innovative-javascript-framwork": {
    id: "routes/astro-the-most-innovative-javascript-framwork",
    parentId: "root",
    path: "astro-the-most-innovative-javascript-framwork",
    index: void 0,
    caseSensitive: void 0,
    module: astro_the_most_innovative_javascript_framwork_exports
  },
  "routes/what-are-the-best-free-text-to-speech-tools": {
    id: "routes/what-are-the-best-free-text-to-speech-tools",
    parentId: "root",
    path: "what-are-the-best-free-text-to-speech-tools",
    index: void 0,
    caseSensitive: void 0,
    module: what_are_the_best_free_text_to_speech_tools_exports
  },
  "routes/5-ways-ai-can-help-farmland-restoration": {
    id: "routes/5-ways-ai-can-help-farmland-restoration",
    parentId: "root",
    path: "5-ways-ai-can-help-farmland-restoration",
    index: void 0,
    caseSensitive: void 0,
    module: ways_ai_can_help_farmland_restoration_exports
  },
  "routes/create-your-own-huggingface-space-easy": {
    id: "routes/create-your-own-huggingface-space-easy",
    parentId: "root",
    path: "create-your-own-huggingface-space-easy",
    index: void 0,
    caseSensitive: void 0,
    module: create_your_own_huggingface_space_easy_exports
  },
  "routes/vuejs-independant-javascript-framework": {
    id: "routes/vuejs-independant-javascript-framework",
    parentId: "root",
    path: "vuejs-independant-javascript-framework",
    index: void 0,
    caseSensitive: void 0,
    module: vuejs_independant_javascript_framework_exports
  },
  "routes/5waystoenhanceragefficiencywithdspy": {
    id: "routes/5waystoenhanceragefficiencywithdspy",
    parentId: "root",
    path: "5waystoenhanceragefficiencywithdspy",
    index: void 0,
    caseSensitive: void 0,
    module: waystoenhanceragefficiencywithdspy_exports
  },
  "routes/databricks-dspy-jetblue-ai-chatbot": {
    id: "routes/databricks-dspy-jetblue-ai-chatbot",
    parentId: "root",
    path: "databricks-dspy-jetblue-ai-chatbot",
    index: void 0,
    caseSensitive: void 0,
    module: databricks_dspy_jetblue_ai_chatbot_exports
  },
  "routes/how-to-use-the-pie-menu-in-blender": {
    id: "routes/how-to-use-the-pie-menu-in-blender",
    parentId: "root",
    path: "how-to-use-the-pie-menu-in-blender",
    index: void 0,
    caseSensitive: void 0,
    module: how_to_use_the_pie_menu_in_blender_exports
  },
  "routes/three-essential-webstorm-shortcuts": {
    id: "routes/three-essential-webstorm-shortcuts",
    parentId: "root",
    path: "three-essential-webstorm-shortcuts",
    index: void 0,
    caseSensitive: void 0,
    module: three_essential_webstorm_shortcuts_exports
  },
  "routes/easydomainverificationwithgoogle": {
    id: "routes/easydomainverificationwithgoogle",
    parentId: "root",
    path: "easydomainverificationwithgoogle",
    index: void 0,
    caseSensitive: void 0,
    module: easydomainverificationwithgoogle_exports
  },
  "routes/using-airpods-and-audacity-hack": {
    id: "routes/using-airpods-and-audacity-hack",
    parentId: "root",
    path: "using-airpods-and-audacity-hack",
    index: void 0,
    caseSensitive: void 0,
    module: using_airpods_and_audacity_hack_exports
  },
  "routes/the-art-of-the-clean-install": {
    id: "routes/the-art-of-the-clean-install",
    parentId: "root",
    path: "the-art-of-the-clean-install",
    index: void 0,
    caseSensitive: void 0,
    module: the_art_of_the_clean_install_exports
  },
  "routes/nab-2023-audio-video-gear": {
    id: "routes/nab-2023-audio-video-gear",
    parentId: "root",
    path: "nab-2023-audio-video-gear",
    index: void 0,
    caseSensitive: void 0,
    module: nab_2023_audio_video_gear_exports
  },
  "routes/how-to-invest-in-whisky": {
    id: "routes/how-to-invest-in-whisky",
    parentId: "root",
    path: "how-to-invest-in-whisky",
    index: void 0,
    caseSensitive: void 0,
    module: how_to_invest_in_whisky_exports
  },
  "routes/liesaboutjavascript": {
    id: "routes/liesaboutjavascript",
    parentId: "root",
    path: "liesaboutjavascript",
    index: void 0,
    caseSensitive: void 0,
    module: liesaboutjavascript_exports
  },
  "routes/smartbidder-diageo": {
    id: "routes/smartbidder-diageo",
    parentId: "root",
    path: "smartbidder-diageo",
    index: void 0,
    caseSensitive: void 0,
    module: smartbidder_diageo_exports
  },
  "routes/weirdinternetfacts": {
    id: "routes/weirdinternetfacts",
    parentId: "root",
    path: "weirdinternetfacts",
    index: void 0,
    caseSensitive: void 0,
    module: weirdinternetfacts_exports
  },
  "routes/threejsandweb3": {
    id: "routes/threejsandweb3",
    parentId: "root",
    path: "threejsandweb3",
    index: void 0,
    caseSensitive: void 0,
    module: threejsandweb3_exports
  },
  "routes/models-table2": {
    id: "routes/models-table2",
    parentId: "root",
    path: "models-table2",
    index: void 0,
    caseSensitive: void 0,
    module: models_table2_exports
  },
  "routes/models-table": {
    id: "routes/models-table",
    parentId: "root",
    path: "models-table",
    index: void 0,
    caseSensitive: void 0,
    module: models_table_exports
  },
  "routes/what-is-rag": {
    id: "routes/what-is-rag",
    parentId: "root",
    path: "what-is-rag",
    index: void 0,
    caseSensitive: void 0,
    module: what_is_rag_exports
  },
  "routes/dspy101": {
    id: "routes/dspy101",
    parentId: "root",
    path: "dspy101",
    index: void 0,
    caseSensitive: void 0,
    module: dspy101_exports
  },
  "routes/$title": {
    id: "routes/$title",
    parentId: "root",
    path: ":title",
    index: void 0,
    caseSensitive: void 0,
    module: title_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: "_index",
    index: void 0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/admin1": {
    id: "routes/admin1",
    parentId: "root",
    path: "admin1",
    index: void 0,
    caseSensitive: void 0,
    module: admin1_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/notes": {
    id: "routes/notes",
    parentId: "root",
    path: "notes",
    index: void 0,
    caseSensitive: void 0,
    module: notes_exports
  },
  "routes/notes/$noteId": {
    id: "routes/notes/$noteId",
    parentId: "routes/notes",
    path: ":noteId",
    index: void 0,
    caseSensitive: void 0,
    module: noteId_exports
  },
  "routes/notes/index": {
    id: "routes/notes/index",
    parentId: "routes/notes",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: notes_exports2
  },
  "routes/notes/new": {
    id: "routes/notes/new",
    parentId: "routes/notes",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: join_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
