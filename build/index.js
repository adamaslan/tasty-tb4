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
var import_server = require("react-dom/server"), import_react = require("@remix-run/react"), import_jsx_runtime = require("react/jsx-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url })
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
var tailwind_default = "/build/_assets/tailwind-U4FRPTI2.css";

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
    secure: !0
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
var import_react2 = require("@remix-run/react"), import_react3 = require("react"), import_jsx_runtime2 = require("react/jsx-runtime"), Nav = () => {
  let [isOpen, setIsOpen] = (0, import_react3.useState)(!1);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between p-4 flex-wrap bg-skin-base text-skin-base", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      import_react2.Link,
      {
        prefetch: "intent",
        to: "/",
        className: "text-2xl font-extrabold font-palette-mosaic",
        children: [
          "Drinks Food",
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-light text-3xl", children: " Life" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "flex flex-col cursor-pointer w-8 h-8 justify-around items-center md:hidden",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "span",
            {
              className: `block w-8 h-[3px] bg-current transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "span",
            {
              className: `block w-8 h-[3px] bg-current transition-opacity ${isOpen ? "opacity-0" : ""}`
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "span",
            {
              className: `block w-8 h-[3px] bg-current transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        className: `flex flex-col items-center justify-between w-full mt-4 transition-all duration-300 ease-in-out md:flex-row md:mt-0 ${isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"} md:max-h-full md:w-auto`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_react2.Link,
            {
              prefetch: "intent",
              to: "./subscribe",
              className: "py-2 px-4 text-center text-current text-lg hover:text-yellow-500 transition-colors",
              children: "Subscribe"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_react2.Link,
            {
              prefetch: "intent",
              to: "./about",
              className: "py-2 px-4 text-center text-current text-lg hover:text-yellow-500 transition-colors",
              children: "About"
            }
          )
        ]
      }
    )
  ] });
}, Navbar_default = Nav;

// app/root.tsx
var import_jsx_runtime3 = require("react/jsx-runtime"), meta = () => ({
  title: "Putting the Sass n Fun in Tech",
  "og:image": "box"
}), links = () => [{ rel: "stylesheet", href: tailwind_default }];
async function loader({ request }) {
  return (0, import_node2.json)({
    user: await getUser(request)
  });
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react4.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react4.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("body", { className: "h-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Navbar_default, {}),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react4.Outlet, {}),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react4.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react4.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react4.LiveReload, {})
    ] })
  ] });
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
var import_jsx_runtime4 = require("react/jsx-runtime");
function Article4() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
      "The 3 Keys To Getting Your Dream Frontend or Full Stack Engineer Job",
      " "
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "img",
      {
        className: "h-full w-full  ",
        src: studio_default,
        alt: "Studio by Warren Hansen"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("br", {}),
      "If you are looking for a career in tech, focusing on developing your coding skills in front-end or full-stack development is essential. You can increase your chances of landing software engineering jobs by following the three keys of L.A.B. - Learn, Apply, and Build. Online learning and peer programming are excellent ways to improve your coding skills and stay updated with the latest trends in the industry. Creating practical projects and building a personal portfolio can help you gain experience and showcase your skills to potential employers.",
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("br", {}),
      " Utilizing job search strategies such as We Work Remotely, JSremote, and LinkedIn can help you find remote work opportunities. Preparing for coding interviews by creating features that may be asked is a smart way to showcase your practical knowledge. Professional development and continuous learning are crucial for staying updated with the latest trends in the industry. By following these strategies and staying persistent, you can transform your passion for coding into a successful career in software engineering.",
      " "
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("br", {}),
        "The three keys to becoming a successful Software Engineer are:",
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-4xl", children: "L.A.B." }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("br", {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("ol", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: "1. Learn - You can do this with online classes, peer programming, chatGPT, or just plain old college." }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("li", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          "2. Apply - How can you get a job if you don't apply for it. Wellfound,",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("a", { href: "https://www.weworkremotely.com", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("u", { children: "We Work Remotely" }) }),
          ", JSremote, and good ol Linkedin are all great for this."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("li", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: "3. Build - It's hard to gain any experience without building something. What you build can also be put on a personal website or portfolio as well so its a win win to build build build. Start small and scale up. Creating features that might be asked in a coding interview is always a smart idea." })
      ] }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("br", {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
      "Go back",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_react5.Link,
        {
          to: "/",
          className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
          children: "Home"
        }
      )
    ] })
  ] }) });
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
var import_jsx_runtime5 = require("react/jsx-runtime");
function Article5() {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
        " ",
        "Astro.js as the Most Innovative and Modern Javascript Framework",
        " "
      ] }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "img",
        {
          className: "mx-auto my-auto h-1/2 w-1/2 ",
          src: boxchicken2_default,
          alt: "Chicken Box Space Ship"
        }
      ),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "While there are established frameworks that have a loyal fanbase (React, Vue, Angular), and promising newcomers that offer a fresh perspective (Svelte, SolidJS), the most exciting and groundbreaking framework in the Javascript ecosystem is Astro.",
          " "
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {}),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "Astro is a new kind of framework that lets you build faster websites with your favorite UI components. Astro renders your pages to static HTML at build time for optimal performance. No JavaScript runtime required. You can use any UI component library (React, Vue, Svelte and more) or write your own components using HTML and CSS. Astro makes it easy to build modern websites without sacrificing performance or user experience.",
          " "
        ] }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {}),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: "Astro islands are interactive UI components that render in isolation on a static HTML page. They use partial hydration, a technique that Astro handles automatically, to enable multiple islands with different functionalities on the same page. Astro uses zero client-side JavaScript by default because it renders every component to HTML ahead of time and then strips out all the JavaScript Astro islands are like mini-apps that can coexist harmoniously in a sea of HTML, bringing life and interactivity to your web pages." }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("br", {}),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "For the Astro docs, you can visit",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("a", { href: "https://astro.build/", className: "text-blue-500", children: [
            " ",
            "here"
          ] }),
          ".",
          " "
        ] }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
          " ",
          "Go back",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            import_react6.Link,
            {
              to: "/",
              className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
              children: [
                " ",
                "Home",
                " "
              ]
            }
          ),
          " "
        ] }),
        " "
      ] }),
      " "
    ] }),
    " "
  ] });
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
var import_jsx_runtime6 = require("react/jsx-runtime"), meta2 = () => ({
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
}), RemixPage = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "min-h-screen bg-gray-100 text-gray-800", children: [
  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("header", { className: "bg-teal-600 text-white py-6 shadow-lg", children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h1", { className: "text-3xl font-bold", children: "What are the Best Free Text-to-Speech Tools?" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mt-2", children: "Turn Text into Audio with These Top Apps and Software" })
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("main", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Introduction to Text-to-Speech (TTS)" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Text-to-Speech (TTS) technology converts written text into spoken audio. It's incredibly useful for accessibility, allowing visually impaired users to consume content, and for anyone who prefers listening over reading. TTS can boost productivity by enabling multitasking (e.g., listening to articles while commuting) and aid language learners. Many great free options are available today." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Why Use Free TTS Tools?" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "font-bold text-xl mb-2", children: "Accessibility" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-lg", children: "Provides access to digital content for people with visual impairments or reading difficulties." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "font-bold text-xl mb-2", children: "Multitasking & Productivity" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-lg", children: "Listen to documents, emails, or articles while doing other tasks like driving, cooking, or exercising." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "font-bold text-xl mb-2", children: "Learning & Proofreading" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-lg", children: "Helps auditory learners absorb information and assists in catching errors by hearing the text read aloud." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Top Free Text-to-Speech Options" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "font-bold text-xl mb-2", children: "NaturalReader" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-lg", children: "Offers free tiers for web, desktop (Mac/Windows), and mobile (iOS/Android), plus a Chrome extension. Good voice quality and supports various document types." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "font-bold text-xl mb-2", children: "Voice Dream Reader & Speak4Me" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-lg", children: "Voice Dream Reader is highly regarded, especially for audiobooks and extensive features, but often involves a cost. Speak4Me is another option, though less common. Always check for current free features vs. paid upgrades." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "font-bold text-xl mb-2", children: "Web-Based Tools & Extensions" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-lg", children: "Many websites offer free TTS directly (e.g., TTSReader, ReadAloud Chrome extension). Quality and limits vary." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Features to Consider" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("ul", { className: "list-disc list-inside space-y-2 text-lg bg-white p-6 rounded-lg shadow", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: "Voice Quality & Naturalness" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: "Number of Voices and Languages Supported" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: "Speed and Pitch Control" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: "Ability to Read Different File Formats (PDF, DOCX, EPUB)" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: "Text Highlighting While Reading" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: "Offline Access" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: "Export to Audio Files (MP3, WAV)" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "text-center text-teal-500 text-lg", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react7.Link, { to: "/", children: "Go back to Home" })
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("footer", { className: "bg-gray-200 py-4 text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-sm", children: "\xA9 2024 TTS Guide. All rights reserved." }),
    " "
  ] })
] }), what_are_the_best_free_text_to_speech_tools_default = RemixPage;

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
var import_jsx_runtime7 = require("react/jsx-runtime"), meta3 = () => ({
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
}), FarmlandRestorationPage = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "min-h-screen bg-gray-100 text-gray-800", children: [
  /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("header", { className: "bg-green-700 text-white py-6 shadow-lg", children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h1", { className: "text-3xl font-bold", children: "5 Ways AI Can Help Farmland Restoration" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "mt-2", children: "Leveraging Technology for Sustainable Soil Health" })
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("section", { className: "mb-8", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("img", { className: "mx-auto my-auto h-1/2 w-1/2 ", src: restoration_default, alt: "restoration ai" }) }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("main", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Introduction" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Artificial Intelligence (AI) offers powerful tools to address the challenges of farmland degradation and promote restoration efforts. By analyzing complex data and providing actionable insights, AI can significantly contribute to sustainable agriculture and the preservation of vital soil resources. Here are five key ways AI is making a difference:" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "How AI Contributes to Restoration" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "font-bold text-xl mb-2", children: "1. Precision Agriculture" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-lg", children: "AI can analyze soil data to provide tailored recommendations for crop management, including optimal planting times and irrigation schedules. This helps in maintaining the soil horizon by ensuring that agricultural practices are aligned with the soil's specific needs, preventing degradation and promoting sustainability." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "font-bold text-xl mb-2", children: "2. Soil Health Monitoring" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-lg", children: "AI-powered sensors and algorithms can monitor soil health in real-time, providing insights into parameters like moisture, nutrient levels, and pH. This helps in detecting issues early and taking corrective actions to maintain the integrity of the soil horizon." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "font-bold text-xl mb-2", children: "3. Predictive Modeling" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-lg", children: "AI can predict future soil conditions based on current data and trends. This allows for proactive management of the soil horizon, such as anticipating nutrient depletion or erosion risks and taking preventive measures." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "font-bold text-xl mb-2", children: "4. Data-Driven Decision Making" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-lg", children: "AI can integrate various data sources, including weather forecasts and crop data, to provide comprehensive insights for soil management. This helps in making informed decisions that preserve the soil horizon and enhance crop productivity." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "font-bold text-xl mb-2", children: "5. Soil Conservation" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-lg", children: "AI can identify areas at risk of soil erosion or degradation and suggest conservation practices. This helps in protecting the soil horizon and ensuring long-term soil health and productivity." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "text-center text-green-600 text-lg", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_react8.Link, { to: "/", children: "Go back to Home" })
    ] })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("footer", { className: "bg-gray-200 py-4 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "text-sm", children: [
    "\xA9 ",
    (/* @__PURE__ */ new Date()).getFullYear(),
    " Farmland Restoration Insights. All rights reserved."
  ] }) })
] }), ways_ai_can_help_farmland_restoration_default = FarmlandRestorationPage;

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
var import_jsx_runtime8 = require("react/jsx-runtime"), meta4 = () => ({
  title: "The Easy Way to Publish on Hugging Face Spaces",
  "og:image": huggingface1_default,
  keywords: "hugging face, spaces, machine learning, AI, deep learning, natural language processing, computer vision, speech recognition, computer vision, computer vision, computer vision, computer vision, computer vision"
});
function Article52() {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
        " ",
        "The Easy Way to Host Your Python Project on Hugging Face Spaces",
        " "
      ] }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "img",
        {
          className: "mx-auto my-auto h-1/2 w-1/2 ",
          src: huggingface1_default,
          alt: "emoji"
        }
      ),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          " "
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          "Hugging Face Spaces offer a simple way to host not just ML demo apps directly on your profile or your organization\u2019s profile, but really any Python code you want. ",
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
          "  "
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          "This is especially helpful for apps that use",
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("a", { href: "https://www.gradio.app/", className: "text-blue-500", children: " Gradio" }),
          ", Streamlit, Docker, or static HTML, which can allow you to create a decent looking UI fast. "
        ] }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          "Checkout ",
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("a", { href: "https://huggingface.co/spaces/", className: "text-blue-500", children: "Hugging Face Spaces" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
          "Here's there",
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("a", { href: "https://www.huggingface.co/", className: "text-blue-500", children: [
            " ",
            "docs for spaces"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
          " ",
          "Go back",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
            import_react9.Link,
            {
              to: "/",
              className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
              children: [
                " ",
                "Home",
                " "
              ]
            }
          ),
          " "
        ] }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("br", {})
      ] }),
      " "
    ] }),
    " "
  ] });
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
var import_jsx_runtime9 = require("react/jsx-runtime");
function Article42() {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "VueJS as the Most Indie Yet Established Javascript Framework" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: js_burden_default,
        alt: "Studio by Warren Hansen"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "While there are newcomers that got that hot cheese (Astro), and lesser known yet exciting seeming frameworks (SolidJS), the uber DIY (Eleventy), the one time indie-darlings turned (Svelte)" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "There is a sweet ring to Vue\u2019s branding: \u201CThe ProgressiveJavaScript Framework An approachable, performant and versatile framework for building web user interfaces.\u201D" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "In other exciting Vuejs related news NUXT the go to framework of vue recently released its third version and seems like a great open source project to contribute to! NUXT 3 brings many new features and improvements, such as serverless rendering, auto-imported components, file-based routing and more." }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "Vue is definitely more indie with no Facebook backing, but it is still very established. Vuejs also has a vibrant ecosystem of libraries and tools that make it easy to create rich and interactive web applications. For example, pinia is a state management library that helps you manage the data flow in your app with a simple and intuitive API, Vue Router is a routing library that lets you navigate between different views, and Vite is a fast and modern build tool that supports hot module replacement and code splitting." }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "Another reason to love Vuejs is its excellent documentation and community support. The official docs are clear, comprehensive and full of examples. You can also find many tutorials, courses, books and podcasts on Vuejs online. The Vuejs community is friendly, welcoming and active on various platforms such as Discord, Reddit, Stack Overflow and Twitter. You can always find help and inspiration from other Vuejs developers." }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        "If you are looking for an alternative to Vuex, you might want to check out",
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("a", { href: "https://pinia.esm.dev/", className: "text-blue-500", children: [
          " ",
          "Pinia"
        ] }),
        ", a state management library that works well with Vuejs."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For the vue docs, you can visit",
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("a", { href: "https://vuejs.org/", className: "text-blue-500", children: [
          " ",
          "here"
        ] }),
        "."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          import_react10.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          }
        )
      ] })
    ] })
  ] }) });
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
var import_jsx_runtime10 = require("react/jsx-runtime");
function Article12() {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
        " ",
        " Five Ways to Enhance RAG Efficiency with DSPy"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "img",
        {
          className: "mx-auto my-auto h-1/2 w-1/2",
          src: letters1_default,
          alt: "letters"
        }
      ),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "  DSPy is a versatile toolkit for information retrieval and prompt engineering. It can be thought of as a prompting language. It can leverage various techniques to retrieve relevant documents efficiently. Let\u2019s explore five key approaches that make Retrieval Augmented Generation easier and less bloated!"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "1. Keyword-Based Retrieval" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy can use traditional information retrieval techniques like TF-IDF or BM25 to find documents based on keyword matching. This approach is efficient and doesn\u2019t rely on embeddings or vector databases. With the dspy.retrieve module you can create a custom retrieval function that inputs the keyword results and formats them for further processing. This module is ideal to process user queries and output relevant passages from retrieval corpuses without having to create embeddings." }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "2. Metadata Filtering" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "When documents have metadata such as tags, categories, or dates, DSPy can filter results based on this metadata. This narrows the search space and improves retrieval accuracy." }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "3. External Search APIs" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy integrates with external search APIs like Google Search or Bing Search. These APIs use their indexing mechanisms to retrieve documents, often bypassing the need for a local database." }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "4. In-Memory Data Structures" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "For smaller datasets, DSPy can load documents into memory and use efficient structures like inverted indexes or hash tables for fast lookups, avoiding vector database dependencies." }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "5. Hybrid Approaches" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Combining methods can improve retrieval accuracy. For example, DSPy might use keyword-based retrieval for initial filtering and cosine similarity on TF-IDF vectors for final ranking." }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy\u2019s flexibility makes it an excellent choice for diverse information retrieval tasks." }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
          "For more about DSPy, visit the official documentation",
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
            "a",
            {
              href: "https://dspy.ai",
              className: "text-blue-500",
              children: [
                " ",
                "here"
              ]
            }
          ),
          "."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
          "Go back",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            import_react11.Link,
            {
              to: "/",
              className: "text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
              children: "Home"
            }
          )
        ] })
      ] })
    ] })
  ] });
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
var import_jsx_runtime11 = require("react/jsx-runtime");
function Article122() {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h1", { className: "tracking-light text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "JetBlue Optimizes Databricks LLM Pipelines with DSPy" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "img",
      {
        className: "mx-auto my-auto h-1/2 w-1/2",
        src: databricks_default,
        alt: "databricks"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
        " The integration of DSPy and Databricks DSPy is revolutionizing machine learning workflows by introducing self-improving pipelines, simplifying data preparation, and optimizing large language model (LLM) performance. Learn how DSPy transforms LLM pipelines and read more in the original Databricks article",
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("a", { href: "https://www.databricks.com/blog/optimizing-databricks-llm-pipelines-dspy", className: "text-blue-500", children: " here" }),
        "."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold", children: "Key Insights from the Databricks Article" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "The Databricks article highlights the groundbreaking nature of DSPy\u2019s pipeline optimization, including:" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("ul", { className: "list-disc pl-5 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("li", { children: "Automated, self-improving pipelines that refine prompts to improve LLM responses." }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("li", { children: "Streamlined support for retrieval-augmented generation (RAG) in various workflows." }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("li", { children: "Enhanced compatibility with Databricks tools, such as Model Serving and Vector Search." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold", children: "Exploring DSPy Further" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
        "Released in October 2023, DSPy was developed by researchers in Matei Zaharia\u2019s Stanford lab. It empowers users to build modular systems that optimize LLM workflows and enables automated tuning for downstream performance improvements. For details, read their research paper",
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("a", { href: "https://arxiv.org/abs/2310.03714", className: "text-blue-500", children: " here" }),
        "."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
        "DSPy allows developers to construct complex LLM pipelines that adapt dynamically to evolving requirements, making traditional manual prompt-tuning redundant. For more on its retrieval capabilities, check out",
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("a", { href: "https://dspy.ai", className: "text-blue-500", children: " Five Ways to Do RAG with DSPy" }),
        "."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Developers can seamlessly integrate DSPy with Databricks Marketplace models like Llama 2 70B, enabling faster deployment of pipelines such as customer feedback classification or predictive maintenance chatbots." }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold", children: [
        "In Collaboration with",
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("a", { href: "https://www.jetblue.com", className: "text-blue-500", children: " JetBlue" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "JetBlue is leveraging DSPy\u2019s self-optimizing pipelines to achieve enhanced efficiency and reduced costs. Their integration highlights DSPy\u2019s role in driving innovation in real-world applications." }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif font-bold", children: "JetBlue's Use of Databricks and DSPy" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("ul", { className: "list-disc list-inside", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("li", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "font-semibold", children: "Improved Control, Dynamic Updates, and Cost Reduction:" }),
          "DSPy modularizes complex pipelines, enabling JetBlue to adapt quickly while reducing costs."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("li", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "font-semibold", children: "Enhanced Pipeline Flexibility: " }),
          "JetBlue updates their pipelines dynamically, ensuring continued optimization without rewriting entire systems."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("li", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "font-semibold", children: "Optimized Resource Allocation: " }),
          "DSPy identifies areas for efficiency, helping JetBlue scale their solutions effectively."
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "JetBlue\u2019s innovative use of DSPy demonstrates its potential to streamline complex ML workflows, adding new opportunities for LLM applications." }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          import_react12.Link,
          {
            to: "/",
            className: "text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          }
        )
      ] })
    ] })
  ] }) });
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
var import_jsx_runtime12 = require("react/jsx-runtime");
function Article43() {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "The Pie Menu Rocks in Blender      " }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: blender1_default,
        alt: "Studio by Warren Hansen"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "Using the pie menu is a quick method of accessing the Numpad hot keys and unlike Numpad emulation, it does not mess with the default shortcuts. For accessing that pie menu you need to press the backtick (`), which is located above the tab button on the left-hand side of your keyboard." }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: " The pie menu allows you to change the way you see your scene and objects in the 3D Viewport. You can choose between perspective and orthographic views, which affect the depth and distortion of your scene. You can also choose different angles to view your scene from, such as front, back, left, right, top and bottom. These angles can help you align and position your objects more precisely and easily. The view pie menu also has options to toggle quad view and toggle camera view, which can give you more control and flexibility over your scene layout and rendering. " }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For the Pie Menu in Blender docs, you can visit",
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("a", { href: "https://docs.blender.org/manual/en/latest/addons/interface/viewport_pies.html", className: "text-blue-500", children: [
          " ",
          "here"
        ] }),
        "."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          import_react13.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          }
        )
      ] })
    ] })
  ] }) });
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
var import_jsx_runtime13 = require("react/jsx-runtime");
function Article123() {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h1", { className: "tracking-light text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "The Three WebStorm Shortcuts to Rule Them All" }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto",
        src: webstorm1_default,
        alt: "WebStorm logo"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "WebStorm is a smart IDE for web development. Keyboard shortcuts can help you write, debug, and test your code faster. Here are three shortcuts that you should know." }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "1. Speed search" }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Press Shift + Up and then type the name of any file you want to find in WebStorm. You will see a list of suggestions. Press Enter to select an item. This also gets you to the navigation bar so you can clear up the file tree for a more zen like experience." }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "2. Recent files" }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Press Command + E and you will see a list of recent files that you have accessed. Press Enter to select a file." }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "3. Action search" }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Press Command + Shift + A and type the name of the action you want to execute. You will see a list of suggestions. Press Enter to execute an action." }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Use these new powers carefully ;)" }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For more shortcuts check this article out",
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("a", { href: "https://blog.jetbrains.com/webstorm/2020/07/navigation-features-that-will-make-you-faster/", className: "text-blue-500", children: [
          " ",
          "here"
        ] }),
        "."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          import_react14.Link,
          {
            to: "/",
            className: "text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          }
        )
      ] })
    ] })
  ] }) });
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
var import_jsx_runtime14 = require("react/jsx-runtime");
function Article2() {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: analytics1_default,
        alt: "computer and graphs"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("br", {}),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: " ", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "The Easy Way to Verify Domain Ownership with Google" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl ", children: "Oh domains! The web of developer sadness they can indeed weave. Luckily, whether your building your website with just HTML or in React with Nextjs, there is an easy solution for you." }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl ", children: [
        "If you have already found the Google's Publisher Center ",
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("a", { href: "https://publishercenter.google.com/", children: "  Google's Publisher Center " }),
        ", then you are half of the way there. Next, comes the challenging part, Domain Verification."
      ] }),
      "        ",
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl ", children: [
        "So what is the easy solution already? HTML Tags. Yes, just put the verification tags in your",
        "<Head>",
        " section on the main page of your site.  ",
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("br", {}),
        "  ",
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("br", {}),
        "This can be a bit tricky with something like Nextjs as their is no index.html. Instead, its just the index.js ",
        "<Head>",
        'section that u must import like so: import Head from "next/head"; Hope this helps! For more info check ',
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("a", { href: "https://support.google.com/webmasters/answer/9008080#domain_name_verification&zippy=%2Cdomain-name-provider%2Chtml-file-upload", children: " Google's docs " })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("p", { className: "text-center text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl text-yellow-500", children: [
        "Go back ",
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_react15.Link, { to: "/", className: " text-center text-6xl font-extrabold tracking-tight sm:text-xl lg:text-4xl text-blue-500", children: "Home" })
      ] })
    ] })
  ] });
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
var import_jsx_runtime15 = require("react/jsx-runtime");
function Article44() {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "AirPods Audacity: How to make AirPods(or any other bluetooth audio) work with Audacity 2023  " }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: airpods_default,
        alt: "airpods"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "AirPods Audacity: How to make AirPods(or any other bluetooth audio) work with Audacity 2023 Often times AirPods (or any other bluetooth headphones) and Audacity don\u2019t play well together. Well luckily, as of 2023, there is a way to sync up audacity and airports." }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        "To do it:",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
        "-have your AirPods connected to you computer",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
        "-click the transport tab",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
        "-select \u201Crescan audio devices\u201D",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
        "-click on audio setup",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
        "-click playback device",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
        "-select your AirPods (or other bluetooth auto devices)",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For more Audacity and podcasts, you can visit",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("a", { href: "https://www.lifewire.com/best-podcast-recording-software-2722085", className: "text-blue-500", children: [
          " ",
          "here"
        ] }),
        "."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          import_react16.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          }
        )
      ] })
    ] })
  ] }) });
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
var import_jsx_runtime16 = require("react/jsx-runtime"), meta5 = () => ({
  title: "The Art of the Clean Install",
  "og:image": graph4_default,
  keywords: "Clean Install, Coding, NVM, Tailwind UI, NUXT, Node Modules, Package Lock, Yarn Lock, npm, Web Development"
});
function Article7() {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "The Art of the Clean Install" }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: graph4_default,
        alt: "a graph"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "Coder says \u201Cyeh, bruh, did a clean install and it works great\u2026simple is as simple does\u201D Well, that\u2019s all fine and good, but then you have to use NVM and Tailwind UI. Not to mention, you want to support the \u201Cgood guys\u201D and use buggy-ass NUXT. Oy vey." }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "It\u2019s hard to remember what a \u201Cclean install\u201D actually is. Well, as one steps out of the dark tunnel of installing  the NUXT framework with Tailwind UI, the idea of a clean install becomes convoluted, murky, strange, etc." }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        "Thus, it becomes important to take a step back and provide the steps to do a clean install. ",
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("br", {}),
        "The steps are:"
      ] }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("ol", { className: "text-left text-xl tracking-tight sm:text-2xl lg:text-2xl", children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("li", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "1. Delete the projects Node Modules" }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("li", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
          "2. Delete package.lock or yarn lock or whatever other lock equivalents",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("a", { href: "https://classic.yarnpkg.com/lang/en/docs/yarn-lock/", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("u", { children: "Yarn Lock Docs" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("li", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "3. Then run npm I or whatever package manager equivalents" }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("li", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "4. Then try to run project via npm run dev or equivalents" })
      ] }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          import_react17.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          }
        )
      ] })
    ] })
  ] }) });
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
var import_jsx_runtime17 = require("react/jsx-runtime");
function Article45() {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "Highlights from NAB 2023  " }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
      "img",
      {
        className: "h-1/2 w-1/2 mx-auto my-auto ",
        src: soundsguy1_default,
        alt: "airpods"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        "NAB is the go to trade show for Audio and Video gear.  ",
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("br", {}),
        "From Zaxcom to Sound Devices to Black Magic, NAB brings together all the major players in the broadcasting game. "
      ] }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "It takes place every year in April at the Las Vegas Convention Center, attracting over 90,000 professionals from more than 160 countries. NAB showcases the latest innovations and solutions for creating, managing, delivering and monetizing content on multiple platforms. It also features conferences, workshops, awards and networking events that cover a wide range of topics and trends. NAB is the ultimate destination for anyone who wants to learn, connect and grow in the dynamic and evolving media landscape." }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For some highlights on NAB 2023, you can visit",
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("a", { href: "https://www.tvtechnology.com/news/nab-show-blackmagic-design-unveils-new-products-software", className: "text-blue-500", children: [
          " ",
          "here"
        ] }),
        "."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For some solid advice on film sound and sound mixers in NYC, you can visit",
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("a", { href: "https://www.nycsoundguy.com", className: "text-blue-500", children: [
          " ",
          "NYC Sound Guy here"
        ] }),
        "."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
          import_react18.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          }
        )
      ] })
    ] })
  ] }) });
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
var import_jsx_runtime18 = require("react/jsx-runtime"), meta6 = () => ({
  title: "3 Ways to Invest in Whiskey",
  "og:image": cask1_default,
  keywords: "Whiskey, Investment, Rare Whiskey, Whiskey Barrels, Whiskey Casks, BlockApps, Vino Vest, Whiskey Appreciation, Whiskey History, Whiskey Market, Japanese Whiskey, Ardbeg, Bowmore, Glenfarclas, Glenfiddich, Laphroaig, Lagavulin, Rosebank, Yamazaki"
});
function Article53() {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
        " ",
        "3 Ways to Invest in Whiskey",
        " "
      ] }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        "img",
        {
          className: "mx-auto my-auto h-1/2 w-1/2 ",
          src: cask1_default,
          alt: "whiskey 8 bit barrels"
        }
      ),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          'Over 500 years of whiskey history makes one think, "wow, I bet there are some rare whiskeys out there." With so much culture surrounding whiskey, it seems a bottle\u2019s narrative could drive its value through the roof if it was found in a shipwreck of a famous captain, in a secret chamber in a palace, or dating back to a time previously unknown to even be distilling whiskey.',
          " "
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("br", {}),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "The reasons for rarities are endless, but thanks  to  ",
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("a", { href: "https://www.rarewhiskey101.com/", className: "text-blue-500", children: [
            " ",
            "Rare Whiskey 101"
          ] }),
          " it is easy to track the price of these rare whiskeys making them more of an asset than a commodity. With market performance indices tracking broader markets like Japanese whiskey, its easy to get an overarching perspective on the whiskey market. They also have a database of distillery specific indices of over 24 brands including Ardbeg, Bowmore, Glenfarclas, Glenfiddich, Laphroaig, Lagavulin, Rosebank, and Yamazaki."
        ] }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("br", {}),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          "Another way of investing in whiskey is to buy ",
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("a", { href: "https://www.forbes.com/sites/forbesfinancecouncil/2023/10/18/5-things-to-know-when-investing-in-whiskey-bottles-or-barrels/", className: "text-blue-500", children: [
            " ",
            "barrels"
          ] }),
          ". One way is thru ",
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("a", { href: "https://marketplace.mercata.blockapps.net/dp/0a3a3d282806135273d9e68d8b981d923461eadb/The%20Deuces%20Wild%20Collection%20-%20Whiskey%20Casks", className: "text-blue-500", children: [
            " ",
            "BlockApps"
          ] }),
          ", and their collaboration with Connecticut Distilling to create the Deuces Wild Collection. You can buy multiple casks and 2 years of cask storage are included with purchase. You can also purchase casks with ",
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("a", { href: "https://www.vinovest.co/", className: "text-blue-500", children: [
            " ",
            "Vino Vest"
          ] }),
          ", who offer a service to bottle the whiskey from your cask."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("br", {}),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          "Whether you are purchasing a rare whiskey or an entire cask, the returns on these items have a clear track record of appreciation. ",
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("br", {}),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("br", {}),
          "For more information on Connecticut Distilling visit their website ",
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("a", { href: "https://www.ctdistillingco.com/", className: "text-blue-500", children: " here" }),
          ".",
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("br", {}),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("br", {}),
          "For more information on Block Apps visit their website ",
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("a", { href: "https://blockapps.net/", className: "text-blue-500", children: " here" }),
          ".",
          " "
        ] }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
          " ",
          "Go back",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
            import_react19.Link,
            {
              to: "/",
              className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
              children: [
                " ",
                "Home",
                " "
              ]
            }
          ),
          " "
        ] }),
        " "
      ] }),
      " "
    ] }),
    " "
  ] });
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
var import_jsx_runtime19 = require("react/jsx-runtime");
function Article3() {
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "Sweet Little JavaScript Lies About Javascript" }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        "img",
        {
          className: "h-1/2 w-1/2 mx-auto my-auto ",
          src: js1_default,
          alt: "dudes messing with an old computer"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl", children: "Sometimes it's important to take a break from JavaScript and just find out weird things about the internet. Sooo...lettuce dive in a bit. So sure, JavaScript is cool but what does it do? Well, that's a challenging thing to say with the rise of NodeJS and the developments of HTML5. " }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("br", {}),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl", children: "For example, many will say you need JS for validating input values of a form before the data is sent to a web server, but HTML5 is also doing great work with form validation. So it would be a big rotten lie to say JS is the only way to do form validation on the world wide web and people are really leaning into shipping less JS these days so maybe it's time to dive even deeper into html form validation." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("p", { className: "text-center text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl text-yellow-500", children: [
      "Go back ",
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react20.Link, { to: "/", className: " text-center text-6xl font-extrabold tracking-tight sm:text-xl lg:text-4xl text-blue-500", children: "Home" })
    ] })
  ] });
}

// app/routes/smartbidder-diageo.tsx
var smartbidder_diageo_exports = {};
__export(smartbidder_diageo_exports, {
  default: () => Article124
});
var import_react21 = require("@remix-run/react");
var import_jsx_runtime20 = require("react/jsx-runtime");
function Article124() {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("h1", { className: "tracking-light text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: [
        " ",
        " Five Ways to Do Rag with DSPy"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        "img",
        {
          className: "mx-auto my-auto h-1/2 w-1/2",
          src: letters1_default,
          alt: "letters"
        }
      ),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("p", { className: "text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl", children: [
          " ",
          " DSPy is a versatile toolkit for information retrieval and prompt engineering. It can be thought of as a prompting language. It can leverage various techniques to retrieve relevant documents efficiently. Let\u2019s explore five key approaches that make Retrieval Augmented Generation easier and less bloated!"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "1. Keyword-Based Retrieval" }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy can use traditional information retrieval techniques like TF-IDF or BM25 to find documents based on keyword matching. This approach is efficient and doesn\u2019t rely on embeddings or vector databases." }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "2. Metadata Filtering" }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "When documents have metadata such as tags, categories, or dates, DSPy can filter results based on this metadata. This narrows the search space and improves retrieval accuracy." }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "3. External Search APIs" }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy integrates with external search APIs like Google Search or Bing Search. These APIs use their indexing mechanisms to retrieve documents, often bypassing the need for a local database." }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "4. In-Memory Data Structures" }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "For smaller datasets, DSPy can load documents into memory and use efficient structures like inverted indexes or hash tables for fast lookups, avoiding vector database dependencies." }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "5. Hybrid Approaches" }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Combining methods can improve retrieval accuracy. For example, DSPy might use keyword-based retrieval for initial filtering and cosine similarity on TF-IDF vectors for final ranking." }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "DSPy\u2019s flexibility makes it an excellent choice for diverse information retrieval tasks." }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
          "For more about DSPy, visit the official documentation",
          /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("a", { href: "https://dspy.ai", className: "text-blue-500", children: [
            " ",
            "here"
          ] }),
          "."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
          "Diageo, a global leader in beverage alcohol, has been actively exploring and implementing artificial intelligence (AI) across various facets of its business. One notable application is the development of a paid social media buying tool, often referred to as",
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("a", { href: "https://www.diageo.com", className: "text-blue-500", children: " Smartbidder" }),
          " (though the exact name may vary depending on internal naming conventions). This tool aims to optimize the efficiency of media spending, ensuring that every dollar invested yields the maximum possible return. In the competitive landscape of the alcohol industry, effective marketing and targeted advertising are crucial for brand visibility and sales. The core function of such a tool is to leverage AI algorithms to analyze vast amounts of data related to consumer behavior, market trends, and advertising performance. By processing this information, the tool can make data-driven decisions about ad placement, targeting, and bidding strategies. This level of automation and analysis allows Diageo to move beyond traditional, less precise methods of media buying, enabling more effective reach of their target demographics. This is especially important for brands like",
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("a", { href: "https://www.johnniewalker.com", className: "text-blue-500", children: " Johnnie Walker" }),
          ", which cater to diverse consumer segments across different markets. Smartbidder likely uses machine learning models to predict the performance of different ad campaigns based on various factors, such as demographics, interests, and past interactions with Diageo's brands. This predictive capability allows for real-time adjustments to ad spend and targeting, maximizing the impact of each campaign. For instance, the tool might identify a specific demographic that is highly responsive to advertisements for a particular product, such as",
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("a", { href: "https://www.donjulio.com", className: "text-blue-500", children: " Don Julio" }),
          " tequila, and automatically allocate more budget to target that group. The benefits of implementing such an AI-powered tool are multifaceted. Firstly, it enhances the efficiency of media spending by minimizing wasted ad spend on ineffective campaigns. Secondly, it allows for more precise targeting, ensuring that advertisements reach the intended audience. This is particularly important in the alcohol industry, where responsible marketing and age-gating are crucial considerations. Finally, it provides valuable insights into consumer behavior and market trends, which can inform future marketing strategies and product development. In essence, Diageo's investment in AI-driven media buying tools like Smartbidder reflects a broader industry trend towards data-driven decision-making. By harnessing the power of AI, Diageo aims to optimize its marketing efforts, strengthen its brand presence, and ultimately drive sales across its extensive portfolio, from Guinness to Tanqueray. This strategic use of technology positions Diageo to remain competitive in the evolving landscape of the global beverage alcohol market."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
          "Go back",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            import_react21.Link,
            {
              to: "/",
              className: "text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
              children: "Home"
            }
          )
        ] })
      ] })
    ] })
  ] });
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
var import_jsx_runtime21 = require("react/jsx-runtime");
function Article1() {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "4 Weird Things about the Internet " }),
    "   ",
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("br", {}),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
      "img",
      {
        className: "h-full w-full  ",
        src: old_comp1_default,
        alt: "dudes messing with an old computer"
      }
    ),
    "   ",
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("br", {}),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-3xl", children: "Weird internet things. Let's go!" }),
      "   ",
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("ol", { className: "text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-2xl", children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("li", { className: "pb-2", children: "1. Before internet, there was ARPANET and packet switching." }),
        "   ",
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("li", { className: "pb-2", children: "2. The word Internet was first used in 1974 and is short for internetwork." }),
        "   ",
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("li", { className: "pb-2", children: "3. Internet used to be capitalized more, lol." }),
        "   ",
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("br", {}),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("li", { className: "pb-2", children: "4. CERN, creators of the Large Hadron Collider(LHC), is credited with the first highspeed T1 (1.5 Mbit/s) link, which connected CERN to Cornell University." }),
        "   ",
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("br", {})
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("p", { className: "text-center text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl text-yellow-500", children: [
      "Go back ",
      /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react22.Link, { to: "/", className: " text-center text-6xl font-extrabold tracking-tight sm:text-xl lg:text-4xl text-blue-500", children: "Home" })
    ] })
  ] }) });
}

// app/routes/threejsandweb3.tsx
var threejsandweb3_exports = {};
__export(threejsandweb3_exports, {
  default: () => Article46
});
var import_react23 = require("@remix-run/react"), import_chicken = __toESM(require_chicken()), import_Cloud = __toESM(require_Cloud()), import_react24 = require("react"), import_jsx_runtime22 = require("react/jsx-runtime");
function Article46() {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "relative", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: " mx-3 lg:mx-36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(import_react24.Suspense, { fallback: null, children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_chicken.default, {}),
      " "
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("h1", { className: "tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl", children: "ThreeJS, the old Web3? " }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        "ThreeJS has been around a while.  ",
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("br", {}),
        "So can it be considered part of Web3? "
      ] }),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: "Maybe its better to think of what the baseline of web3 is. Maybe its like a cusp. Sort of like being a millenial and GenZ cusp kid. " }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For the docs on ThreeJS, you can visit",
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("a", { href: "https://threejs.org/", className: "text-blue-500", children: [
          " ",
          "here"
        ] }),
        "."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_react24.Suspense, { fallback: null, children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_Cloud.default, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold", children: [
        " For some solid advice on film sound and sound mixers in NYC, you can visit",
        /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("a", { href: "https://www.nycsoundguy.com", className: "text-blue-500", children: [
          " ",
          "NYC Sound Guy here"
        ] }),
        "."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl", children: [
        "Go back",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          import_react23.Link,
          {
            to: "/",
            className: " text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl",
            children: "Home"
          }
        )
      ] })
    ] })
  ] }) }) });
}

// app/routes/models-table.tsx
var models_table_exports = {};
__export(models_table_exports, {
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

// app/routes/models-table.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
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
  let models = (0, import_react25.useLoaderData)(), actionData = (0, import_react25.useActionData)(), transition = (0, import_react25.useTransition)(), isSubmitting = transition.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "max-w-7xl mx-auto p-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_react25.Link, { to: "/", className: "text-blue-600 hover:underline", children: "Back to Home" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("section", { className: "mb-12 bg-white shadow-sm rounded-xl p-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h2", { className: "text-2xl font-bold mb-6", children: "Register New AI Model" }),
      (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "text-red-500 mb-4", children: actionData.error }),
      actionData && !actionData.error && transition.state === "idle" && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "text-green-500 mb-4", children: "Model registered successfully!" }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_react25.Form, { method: "post", className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: ["name", "type", "parameter_count", "experts", "context_window_tokens"].map((field) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("label", { className: "block text-sm font-medium capitalize mb-2", children: field.replace(/_/g, " ") }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            "input",
            {
              name: field,
              type: field === "name" || field === "type" ? "text" : "number",
              required: !0,
              className: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            }
          )
        ] }, field)) }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          "button",
          {
            type: "submit",
            disabled: isSubmitting,
            className: "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50",
            children: isSubmitting ? "Registering..." : "Register Model"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("section", { className: "bg-white shadow-sm rounded-xl overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "px-6 py-4 border-b border-gray-200", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h2", { className: "text-xl font-semibold", children: "Registered Models" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("table", { className: "w-full", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("tr", { children: ["Name", "Type", "Parameters", "Experts", "Context Window", "Release Date"].map((header) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          "th",
          {
            className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            children: header
          },
          header
        )) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("tbody", { className: "divide-y divide-gray-200", children: Array.isArray(models) && models.map((model) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900", children: model.name }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: model.type }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: (model.parameter_count ?? 0).toLocaleString() }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: model.experts ?? "N/A" }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: (model.context_window_tokens ?? 0).toLocaleString() }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: model.release_date ? new Date(model.release_date).toLocaleDateString() : "N/A" })
        ] }, model.id)) })
      ] }) }),
      (!Array.isArray(models) || models.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "px-6 py-4 text-center text-gray-500", children: "No models registered yet." })
    ] })
  ] });
}

// app/routes/what-is-rag.tsx
var what_is_rag_exports = {};
__export(what_is_rag_exports, {
  default: () => what_is_rag_default,
  meta: () => meta7
});
var import_react26 = require("@remix-run/react");

// public/dspyprompt.png
var dspyprompt_default = "/build/_assets/dspyprompt-SGTMQH6J.png";

// app/routes/what-is-rag.tsx
var import_jsx_runtime24 = require("react/jsx-runtime"), meta7 = () => ({
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
}), RemixPage2 = () => /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "min-h-screen bg-gray-100 text-gray-800", children: [
  /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("header", { className: "bg-blue-600 text-white py-6 shadow-lg", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h1", { className: "text-3xl font-bold", children: "What is RAG (Retrieval-Augmented Generation)?" }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "mt-2", children: "Understanding the Framework that Enhances LLM Capabilities" })
  ] }) }),
  /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("main", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Introduction" }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Retrieval-Augmented Generation (RAG) is an AI framework that enhances the outputs of large language models (LLMs) by incorporating information from external sources. It combines the generative capabilities of LLMs with the retrieval capabilities of traditional information retrieval. This combination allows RAG to access and reference information outside the LLMs' training data, leading to more accurate, up-to-date, and contextually relevant responses." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "How RAG Works" }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h3", { className: "font-bold text-xl mb-2", children: "1. Retrieval" }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-lg", children: "A user's query is first used to search an external knowledge base or database." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h3", { className: "font-bold text-xl mb-2", children: "2. Augmentation" }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-lg", children: "The retrieved relevant information is then integrated into the user's prompt before being sent to the LLM." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h3", { className: "font-bold text-xl mb-2", children: "3. Generation" }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-lg", children: "The LLM generates a response based on the augmented prompt, incorporating the retrieved context." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Benefits of RAG" }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h3", { className: "font-bold text-xl mb-2", children: "Enhanced Accuracy" }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-lg", children: "By accessing external knowledge, RAG can generate more factually correct and up-to-date answers." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h3", { className: "font-bold text-xl mb-2", children: "Improved Context" }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-lg", children: "RAG allows LLMs to produce responses that are more relevant to the specific user query and context." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("h3", { className: "font-bold text-xl mb-2", children: "Reduced Need for Fine-Tuning" }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-lg", children: "RAG can provide some of the benefits of a custom-trained LLM without the need for extensive training or fine-tuning." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-center text-blue-500 text-lg", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_react26.Link, { to: "/", children: "Go back to Home" }) })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("footer", { className: "bg-gray-200 py-4 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-sm", children: "\xA9 2025 RAG Guide. All rights reserved." }) })
] }), what_is_rag_default = RemixPage2;

// app/routes/dspy101.tsx
var dspy101_exports = {};
__export(dspy101_exports, {
  default: () => dspy101_default,
  meta: () => meta8
});
var import_react27 = require("@remix-run/react");

// public/fish1.png
var fish1_default = "/build/_assets/fish1-4XUS2WEO.png";

// app/routes/dspy101.tsx
var import_jsx_runtime25 = require("react/jsx-runtime"), meta8 = () => ({
  title: "DSPy 101 Tutorial: Prompting Guide",
  "og:image": fish1_default,
  keywords: "DSPy, Python, AI, AI Agent, AI Tutorial, AI Chatbot"
}), RemixPage3 = () => /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "min-h-screen bg-gray-100 text-gray-800", children: [
  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("header", { className: "bg-blue-600 text-white py-6 shadow-lg", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h1", { className: "text-3xl font-bold", children: "DSPy 101 Tutorial: Prompting Guide" }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "mt-2", children: "Simplify LLM-powered applications with DSPy." })
  ] }) }),
  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("section", { className: "mb-8", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("img", { className: "mx-auto my-auto h-1/2 w-1/2 ", src: fish1_default, alt: "DSPy Prompt" }) }),
  /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("main", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Quick Start" }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("pre", { className: "bg-gray-800 text-white p-4 rounded-lg overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("code", { children: `
import dspy

lm = dspy.LM('ollama_chat/llama3.2:1b', api_base='http://localhost:11434')
dspy.configure(lm=lm)
` }) }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "This snippet initializes a language model and configures DSPy for use." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Defining a Signature" }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("pre", { className: "bg-gray-800 text-white p-4 rounded-lg overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("code", { children: `
from typing import Literal

class Categorize(dspy.Signature):
    event: str = dspy.InputField()
    category: Literal['Wars and Conflicts', 'Politics'] = dspy.OutputField()
    confidence: float = dspy.OutputField()
` }) }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Signatures define input-output structures, making your models more intuitive." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Calling the Module" }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("pre", { className: "bg-gray-800 text-white p-4 rounded-lg overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("code", { children: `
classify = dspy.Predict(Categorize)
classification = classify(event="[YOUR HISTORIC EVENT]")
print(classification)
` }) }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: [
        "Use the ",
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("code", { children: "Predict" }),
        " module to classify events with ease."
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Optimizing Prompts" }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("pre", { className: "bg-gray-800 text-white p-4 rounded-lg overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("code", { children: `
from dspy.teleprompt import *
tp = dspy.MIPROv2(metric=validate_category, auto="light")
optimized_classify = tp.compile(classify, trainset=trainset)
` }) }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Optimize prompts with DSPy\u2019s Teleprompt module for better performance." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("section", { className: "mb-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("h2", { className: "text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold mb-4", children: "Saving Optimized Systems" }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("pre", { className: "bg-gray-800 text-white p-4 rounded-lg overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("code", { children: `
optimized_classify.save("optimized_event_classifier.json")
` }) }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "mt-2 text-left text-lg tracking-tight sm:text-xl lg:text-2xl font-serif", children: "Save your optimized classification systems for later use or deployment." })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "text-center text-blue-500 text-lg", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react27.Link, { to: "/", children: "Go back to Home" }) })
  ] }),
  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("footer", { className: "bg-gray-200 py-4 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "text-sm", children: "\xA9 2025 DSPy Guide. All rights reserved." }) })
] }), dspy101_default = RemixPage3;

// app/routes/$title.tsx
var title_exports = {};
__export(title_exports, {
  action: () => action2,
  default: () => NoteDetailsPage,
  loader: () => loader3
});
var import_node4 = require("@remix-run/node"), import_react28 = require("@remix-run/react");

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
var import_tiny_invariant4 = __toESM(require("tiny-invariant")), import_jsx_runtime26 = require("react/jsx-runtime");
async function loader3({ params }) {
  (0, import_tiny_invariant4.default)(params.title, "noteTitle not found");
  let note = await getNoteListItems();
  if (!note)
    throw new Response("Not Found", { status: 404 });
  return (0, import_node4.json)({ note });
}
var action2 = async ({ params }) => ((0, import_tiny_invariant4.default)(params.title, "noteTitle not found"), await deleteNoteByTitle(params.title), (0, import_node4.redirect)("/notes"));
function NoteDetailsPage() {
  let data = (0, import_react28.useLoaderData)();
  return console.log(data), /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("h3", { className: "text-2xl font-bold", children: data.note.title }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("p", { className: "py-6", children: data.note.body }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("hr", { className: "my-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_react28.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      "button",
      {
        type: "submit",
        className: "rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Delete"
      }
    ) })
  ] });
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Art2,
  meta: () => meta9
});
var import_react29 = require("@remix-run/react");

// public/cloud1.jpeg
var cloud1_default = "/build/_assets/cloud1-FTZDJF7K.jpeg";

// app/routes/_index.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
function meta9() {
  return { "og:image": boxchicken2_default };
}
function Art2() {
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("main", { className: " items-left justify-left mx-4 min-h-screen bg-white lg:mx-36 md:mx-16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "text-left text-xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl ", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "block uppercase text-blue-500 drop-shadow-md", children: "Tasty Tech Bytes" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("p", { className: "text-left text-xl font-extrabold tracking-tight sm:text-xl lg:text-4xl", children: [
      " ",
      "Keeping it Tasty in 2025"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "grid lg:grid-cols-4 h-1/4 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "col-span-1  h-1/4  ", children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/how-to-invest-in-whisky", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-yellow-500 p-1 text-lg font-bold tracking-tight text-white", children: "Drink World - Helpful" }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
            "img",
            {
              className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
              src: cask1_default,
              alt: "casks"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "3 Ways to Invest in Whiskey" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/artihow-to-use-the-pie-menu-in-blender", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-purple-900 p-1 text-lg font-bold tracking-tight text-white", children: "3D World - Helpful" }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
            "img",
            {
              className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
              src: blender1_default,
              alt: "computer and graphs"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "The Pie Menu Rocks in Blender" })
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "lg:col-span-2  lg:h-1/4  ", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/three-essential-webstorm-shortcuts", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-blue-500 p-1 text-lg font-bold tracking-tight text-white", children: "Software - Webstorm" }),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          "img",
          {
            className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
            src: webstorm1_default,
            alt: "computer and graphs"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "The Three WebStorm Shortcuts to Rule Them All" }),
        " "
      ] }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "col-span-1 h-1/4 ", children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/weirdinternetfacts", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-green-400 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Random" }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
            "img",
            {
              className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
              src: old_comp1_default,
              alt: "computer and graphs"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "4 Weird Things about the Internet" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/nab-2023-audio-video-gear", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
            "img",
            {
              className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
              src: soundsguy1_default,
              alt: "computer and graphs"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "Highlights from NAB 2023" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "grid grid-cols-4 h-1/4 gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "col-span-1 row-span-1 ", children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/threekeys-to-getting-a-frontend-or-fullstackjob", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
            "img",
            {
              className: "m-2 h-auto flex-col rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30",
              src: studio_default,
              alt: "Studio by Warren Hansen"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-3 text-left text-lg font-bold tracking-tight shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30 sm:text-3xl lg:text-4xl", children: "The 3 Keys To Getting Your Dream Frontend or Full Stack Engineer Job" }),
          " "
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "col-span-1 ", children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/vuejs-independant-javascript-framework", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
            "img",
            {
              className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
              src: js_burden_default,
              alt: "computer and graphs"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "VueJS as the Most Indie Yet Established Javascript Framework" })
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "col-span-1  ", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/astro-the-most-innovative-javascript-framwork", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          "img",
          {
            className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
            src: boxchicken2_default,
            alt: "computer and graphs"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "Astro.js as the Most Innovative and Modern Javascript Framework" })
      ] }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "col-span-1  ", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/the-art-of-the-clean-install", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          "img",
          {
            className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
            src: graph4_default,
            alt: "computer and graphs"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "The Art of the Clean Install" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/what-is-rag", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white", children: "AI Tips" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: fish1_default,
          alt: "fish"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "RAG 101 Tutorial: All you need to know about RAG" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/what-are-the-best-free-text-to-speech-tools", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white", children: "AI Tips" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: text2speech_default,
          alt: "text to speech"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "What are the Best Free Text-to-Speech Tools? " })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/dspy101", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white", children: "AI Tips" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: dspyprompt_default,
          alt: "dspyprompt"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "DSPy 101 Tutorial: Prompting Guide" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/databricks-dspy-jetblue-ai-chatbot", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white", children: "AI Tips" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: databricks_default,
          alt: "databricks"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: " JetBlue Optimizes Databricks LLM Pipelines with DSPy " })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/5waystoenhanceragefficiencywithdspy", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white", children: "AI Tips" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: letters1_default,
          alt: "letters"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: " 5 ways to enhance RAG efficiency with DSPy   " })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/threejsandweb3", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-green-800 p-1 text-lg font-bold tracking-tight text-white", children: "Code Art - ThreeJS" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: cloud1_default,
          alt: "clouds"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "ThreeJS, the old Web3?" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/easydomainverificationwithgoogle", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: analytics1_default,
          alt: "analytics chart"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "The Easy Way to Verify Domain Ownership with Google" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/liesaboutjavascript", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: js1_default,
          alt: "javascript chart"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "Sweet Little JavaScript Lies About Javascript          " })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/create-your-own-huggingface-space-easy", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white", children: "Code World - Helpful" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: huggingface1_default,
          alt: "emoji"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "The easy way to publish on Hugging Face Spaces" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(import_react29.Link, { to: "/5-ways-ai-can-help-farmland-restoration", children: [
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "rounded-full bg-green-700 p-1 text-lg font-bold tracking-tight text-white", children: [
          " ",
          "AI & Sustainability "
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          "img",
          {
            className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
            src: restoration_default,
            alt: "Farmland restoration"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "5 Ways AI Can Help Farmland Restoration " })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/models-table", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "rounded-full bg-indigo-600 p-1 text-lg font-bold tracking-tight text-white", children: [
        " ",
        "AI Models"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: databricks_default,
          alt: "AI models table"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "View Registered AI Models " })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_react29.Link, { to: "/using-airpods-and-audacity-hack", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "transition-shadow duration-300 ease-in-out hover:bg-gray-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "rounded-full bg-pink-600 p-1 text-lg font-bold tracking-tight text-white", children: "Tech World - Helpful" }),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "img",
        {
          className: "items-left justify-left m-2 h-auto max-w-full flex-col rounded-full",
          src: airpods_default,
          alt: "computer and graphs"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h1", { className: "pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ", children: "AirPods Audacity: How to make AirPods(or any other bluetooth audio) work with Audacity 2023" })
    ] }) })
  ] });
}

// app/routes/admin1.tsx
var admin1_exports = {};
__export(admin1_exports, {
  default: () => Article125
});
var import_jsx_runtime28 = require("react/jsx-runtime");
function Article125() {
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_jsx_runtime28.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "grid grid-cols-8 grid-rows-auto gap-4 mx-12", children: [
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "bg-blue-500 min-w-[300px] col-span-5 p-4", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor ex in nisi laoreet, vel gravida ex faucibus. Proin vitae urna nec augue sollicitudin finibus vel in magna. Ut et augue vitae magna commodo cursus. Sed sit amet justo ac eros venenatis venenatis." }),
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "bg-green-500 min-w-[300px] col-span-3 p-4", children: "Sidebar content" }),
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "bg-yellow-500 min-w-[300px] col-span-5 p-4", children: "Cras vel velit ac ex tincidunt eleifend. Donec sed dui et nulla ultricies finibus. Duis vitae varius nulla. Fusce sodales justo vel pede" }),
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "bg-red-500 min-w-[300px] col-span-3 p-4", children: "Sidebar content" }),
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "bg-purple-500 min-w-[300px] col-span-5 p-4", children: "Sed commodo, augue vel ultrices finibus, mi eros bibendum magna, vitae fermentum magna nisl vel sapien. Proin rutrum quam et velit facilisis, vel aliquam eros tempus." }),
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "bg-teal-500 min-w-[300px] col-span-3 p-4", children: "Sidebar content" }),
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "bg-orange-500 min-w-[300px] col-span-5 p-4", children: "Mauris vel mauris ut velit euismod venenatis. Proin vulputate mi vel magna finibus, vel ultrices augue fermentum. Sed vel mi at dui commodo finibus." }),
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "bg-pink-500 min-w-[300px] col-span-3 p-4", children: "Sidebar content" }),
    " "
  ] }) });
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action3,
  loader: () => loader4
});
var import_node5 = require("@remix-run/node");
var action3 = async ({ request }) => logout(request);
async function loader4() {
  return (0, import_node5.redirect)("/");
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action4,
  default: () => Login,
  loader: () => loader5,
  meta: () => meta10
});
var import_react32 = __toESM(require("react")), import_node6 = require("@remix-run/node"), import_react33 = require("@remix-run/react");

// app/utils.ts
var import_react30 = require("react"), import_react31 = require("@remix-run/react");
function useMatchesData(id) {
  let matchingRoutes = (0, import_react31.useMatches)(), route = (0, import_react30.useMemo)(
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
var import_jsx_runtime29 = require("react/jsx-runtime"), meta10 = () => ({
  title: "Login"
});
async function loader5({ request }) {
  return await getUserId(request) ? (0, import_node6.redirect)("/") : (0, import_node6.json)({});
}
var action4 = async ({ request }) => {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = formData.get("redirectTo"), remember = formData.get("remember");
  if (!validateEmail(email))
    return (0, import_node6.json)({ errors: { email: "Email is invalid." } }, { status: 400 });
  if (typeof password != "string")
    return (0, import_node6.json)(
      { errors: { password: "Valid password is required." } },
      { status: 400 }
    );
  if (password.length < 6)
    return (0, import_node6.json)(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  let user = await verifyLogin(email, password);
  return user ? createUserSession({
    request,
    userId: user.id,
    remember: remember === "on",
    redirectTo: typeof redirectTo == "string" ? redirectTo : "/notes"
  }) : (0, import_node6.json)(
    { errors: { email: "Invalid email or password" } },
    { status: 400 }
  );
};
function Login() {
  var _a, _b, _c, _d, _e, _f;
  let [searchParams] = (0, import_react33.useSearchParams)(), redirectTo = searchParams.get("redirectTo") ?? "/notes", actionData = (0, import_react33.useActionData)(), emailRef = import_react32.default.useRef(null), passwordRef = import_react32.default.useRef(null);
  return import_react32.default.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email && ((_b2 = emailRef == null ? void 0 : emailRef.current) == null || _b2.focus()), (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef == null ? void 0 : passwordRef.current) == null || _d2.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_react33.Form, { method: "post", className: "space-y-6", noValidate: !0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("label", { className: "text-sm font-medium", htmlFor: "email", children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "block text-gray-700", children: "Email Address" }),
        ((_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.email) && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "block pt-1 text-red-700", id: "email-error", children: (_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("label", { className: "text-sm font-medium", htmlFor: "password", children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "block text-gray-700", children: "Password" }),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "block font-light text-gray-700", children: "Must have at least 6 characters." }),
        ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "pt-1 text-red-700", id: "password-error", children: (_e = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _e.password })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
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
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      "button",
      {
        className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        type: "submit",
        children: "Log in"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("input", { type: "hidden", name: "redirectTo", value: redirectTo }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          "input",
          {
            className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
            id: "remember",
            name: "remember",
            type: "checkbox"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          "label",
          {
            className: "ml-2 block text-sm text-gray-900",
            htmlFor: "remember",
            children: "Remember me"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "text-center text-sm text-gray-500", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          import_react33.Link,
          {
            className: "text-blue-500 underline",
            to: { pathname: "/join" },
            children: "Sign up"
          }
        )
      ] })
    ] })
  ] }) }) });
}

// app/routes/notes.tsx
var notes_exports = {};
__export(notes_exports, {
  default: () => NotesPage,
  loader: () => loader6
});
var import_node7 = require("@remix-run/node"), import_react34 = require("@remix-run/react");

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
var import_jsx_runtime30 = require("react/jsx-runtime");
async function loader6({ request }) {
  let userId = await requireUserId(request), noteListItems = await getNoteListItems2({ userId });
  return (0, import_node7.json)({ noteListItems });
}
function NotesPage() {
  let data = (0, import_react34.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "flex h-full min-h-screen flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Header, {}),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("main", { className: "flex h-full bg-white", children: [
      /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "h-full w-80 border-r bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react34.Link, { to: "new", className: "block p-4 text-xl text-blue-500", children: "+ New Note" }),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("hr", {}),
        data.noteListItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("p", { className: "p-4", children: "No notes yet" }) : /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("ol", { children: data.noteListItems.map((note) => /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
          import_react34.NavLink,
          {
            className: ({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`,
            to: note.id,
            children: [
              "\u{1F4DD} ",
              note.title
            ]
          }
        ) }, note.id)) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "flex-1 p-6", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react34.Outlet, {}) })
    ] })
  ] });
}
function Header() {
  let user = useUser();
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("header", { className: "flex items-center justify-between bg-slate-800 p-4 text-white", children: [
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("h1", { className: "text-3xl font-bold", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react34.Link, { to: ".", children: "Notes" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("p", { children: user.email }),
    /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react34.Form, { action: "/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
      "button",
      {
        type: "submit",
        className: "rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600",
        children: "Logout"
      }
    ) })
  ] });
}

// app/routes/notes/$noteId.tsx
var noteId_exports = {};
__export(noteId_exports, {
  action: () => action5,
  default: () => NoteDetailsPage2,
  loader: () => loader7
});
var import_node8 = require("@remix-run/node"), import_react35 = require("@remix-run/react");
var import_tiny_invariant5 = __toESM(require("tiny-invariant")), import_jsx_runtime31 = require("react/jsx-runtime");
async function loader7({ request, params }) {
  let userId = await requireUserId(request);
  (0, import_tiny_invariant5.default)(params.noteId, "noteId not found");
  let note = await getNote({ userId, id: params.noteId });
  if (!note)
    throw new Response("Not Found", { status: 404 });
  return (0, import_node8.json)({ note });
}
var action5 = async ({ request, params }) => {
  let userId = await requireUserId(request);
  return (0, import_tiny_invariant5.default)(params.noteId, "noteId not found"), await deleteNote({ userId, id: params.noteId }), (0, import_node8.redirect)("/notes");
};
function NoteDetailsPage2() {
  let data = (0, import_react35.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("h3", { className: "text-2xl font-bold", children: data.note.title }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: "py-6", children: data.note.body }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("hr", { className: "my-4" }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_react35.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
      "button",
      {
        type: "submit",
        className: "rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Delete"
      }
    ) })
  ] });
}

// app/routes/notes/index.tsx
var notes_exports2 = {};
__export(notes_exports2, {
  default: () => NoteIndexPage
});
var import_react36 = require("@remix-run/react"), import_jsx_runtime32 = require("react/jsx-runtime");
function NoteIndexPage() {
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("p", { children: [
    "No note selected. Select a note on the left, or",
    " ",
    /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_react36.Link, { to: "new", className: "text-blue-500 underline", children: "create a new note." })
  ] });
}

// app/routes/notes/new.tsx
var new_exports = {};
__export(new_exports, {
  action: () => action6,
  default: () => NewNotePage
});
var import_node9 = require("@remix-run/node"), import_react37 = require("@remix-run/react");
var import_jsx_runtime33 = require("react/jsx-runtime"), action6 = async ({ request }) => {
  let userId = await requireUserId(request), formData = await request.formData(), title = formData.get("title"), body = formData.get("body");
  if (typeof title != "string" || title.length === 0)
    return (0, import_node9.json)({ errors: { title: "Title is required" } }, { status: 400 });
  if (typeof body != "string" || body.length === 0)
    return (0, import_node9.json)({ errors: { body: "Body is required" } }, { status: 400 });
  let note = await createNote({ title, body, userId });
  return (0, import_node9.redirect)(`/notes/${note.id}`);
};
function NewNotePage() {
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
    import_react37.Form,
    {
      method: "post",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("label", { className: "flex w-full flex-col gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { children: "Title: " }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            "input",
            {
              name: "title",
              className: "flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            }
          )
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("label", { className: "flex w-full flex-col gap-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { children: "Body: " }),
          /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            "textarea",
            {
              name: "body",
              rows: 8,
              className: "w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
            }
          )
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "text-right", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
          "button",
          {
            type: "submit",
            className: "rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
            children: "Save"
          }
        ) })
      ]
    }
  );
}

// app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  action: () => action7,
  default: () => Join,
  loader: () => loader8,
  meta: () => meta11
});
var import_node10 = require("@remix-run/node"), import_react38 = require("@remix-run/react");
var React3 = __toESM(require("react")), import_jsx_runtime34 = require("react/jsx-runtime"), meta11 = () => ({
  title: "Sign Up"
});
async function loader8({ request }) {
  return await getUserId(request) ? (0, import_node10.redirect)("/") : (0, import_node10.json)({});
}
var action7 = async ({ request }) => {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = formData.get("redirectTo");
  if (!validateEmail(email))
    return (0, import_node10.json)(
      { errors: { email: "Email is invalid." } },
      { status: 400 }
    );
  if (typeof password != "string")
    return (0, import_node10.json)(
      { errors: { password: "Valid password is required." } },
      { status: 400 }
    );
  if (password.length < 6)
    return (0, import_node10.json)(
      { errors: { password: "Password is too short." } },
      { status: 400 }
    );
  if (await getProfileByEmail(email))
    return (0, import_node10.json)(
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
  let [searchParams] = (0, import_react38.useSearchParams)(), redirectTo = searchParams.get("redirectTo") ?? void 0, actionData = (0, import_react38.useActionData)(), emailRef = React3.useRef(null), passwordRef = React3.useRef(null);
  return React3.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email && ((_b2 = emailRef == null ? void 0 : emailRef.current) == null || _b2.focus()), (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef == null ? void 0 : passwordRef.current) == null || _d2.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(import_react38.Form, { className: "space-y-6", method: "post", noValidate: !0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("label", { className: "text-sm font-medium", htmlFor: "email", children: [
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "block text-gray-700", children: "Email Address" }),
        ((_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.email) && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "block pt-1 text-red-700", id: "email-error", children: (_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("label", { className: "text-sm font-medium", htmlFor: "password", children: [
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "block text-gray-700", children: "Password" }),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "block font-light text-gray-700", children: "Must have at least 6 characters." }),
        ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "pt-1 text-red-700", id: "password-error", children: (_e = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _e.password })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
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
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
      "button",
      {
        className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        type: "submit",
        children: "Create Account"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("input", { type: "hidden", name: "redirectTo", value: redirectTo }),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { className: "text-center text-sm text-gray-500", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
        import_react38.Link,
        {
          className: "text-blue-500 underline",
          to: {
            pathname: "/login",
            search: searchParams.toString()
          },
          children: "Log in"
        }
      )
    ] }) })
  ] }) }) });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-7ALGIEHY.js", imports: ["/build/_shared/chunk-BDTC4FAY.js", "/build/_shared/chunk-BVJBT3X3.js", "/build/_shared/chunk-T36URGAI.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-EXDYIW5L.js", imports: ["/build/_shared/chunk-KPWQHS6G.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/$title": { id: "routes/$title", parentId: "root", path: ":title", index: void 0, caseSensitive: void 0, module: "/build/routes/$title-VHWXS2GA.js", imports: ["/build/_shared/chunk-URNZPFSF.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/5-ways-ai-can-help-farmland-restoration": { id: "routes/5-ways-ai-can-help-farmland-restoration", parentId: "root", path: "5-ways-ai-can-help-farmland-restoration", index: void 0, caseSensitive: void 0, module: "/build/routes/5-ways-ai-can-help-farmland-restoration-7CZBYYKJ.js", imports: ["/build/_shared/chunk-W33ECSIC.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/5waystoenhanceragefficiencywithdspy": { id: "routes/5waystoenhanceragefficiencywithdspy", parentId: "root", path: "5waystoenhanceragefficiencywithdspy", index: void 0, caseSensitive: void 0, module: "/build/routes/5waystoenhanceragefficiencywithdspy-AAHMTA23.js", imports: ["/build/_shared/chunk-MWVEH5RE.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: "_index", index: void 0, caseSensitive: void 0, module: "/build/routes/_index-AHGNYEYN.js", imports: ["/build/_shared/chunk-M5SHCGLP.js", "/build/_shared/chunk-T2U3ZTMG.js", "/build/_shared/chunk-HQBQR4PI.js", "/build/_shared/chunk-DHR5PEFW.js", "/build/_shared/chunk-XSERSIXR.js", "/build/_shared/chunk-MWVEH5RE.js", "/build/_shared/chunk-IRPVW56I.js", "/build/_shared/chunk-OJ2YKJ2F.js", "/build/_shared/chunk-NCVUUDNJ.js", "/build/_shared/chunk-OGJMEMOB.js", "/build/_shared/chunk-RKRFNDQT.js", "/build/_shared/chunk-LJONBSKC.js", "/build/_shared/chunk-O5PCSKPP.js", "/build/_shared/chunk-LSU3ZOZE.js", "/build/_shared/chunk-AO5PVIJC.js", "/build/_shared/chunk-43QK5DKL.js", "/build/_shared/chunk-W33ECSIC.js", "/build/_shared/chunk-RK2JDMYW.js", "/build/_shared/chunk-HOSSLJSE.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin1": { id: "routes/admin1", parentId: "root", path: "admin1", index: void 0, caseSensitive: void 0, module: "/build/routes/admin1-H7R3F2G4.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/astro-the-most-innovative-javascript-framwork": { id: "routes/astro-the-most-innovative-javascript-framwork", parentId: "root", path: "astro-the-most-innovative-javascript-framwork", index: void 0, caseSensitive: void 0, module: "/build/routes/astro-the-most-innovative-javascript-framwork-C6LCCGZH.js", imports: ["/build/_shared/chunk-AO5PVIJC.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/create-your-own-huggingface-space-easy": { id: "routes/create-your-own-huggingface-space-easy", parentId: "root", path: "create-your-own-huggingface-space-easy", index: void 0, caseSensitive: void 0, module: "/build/routes/create-your-own-huggingface-space-easy-233G3UWU.js", imports: ["/build/_shared/chunk-RK2JDMYW.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/databricks-dspy-jetblue-ai-chatbot": { id: "routes/databricks-dspy-jetblue-ai-chatbot", parentId: "root", path: "databricks-dspy-jetblue-ai-chatbot", index: void 0, caseSensitive: void 0, module: "/build/routes/databricks-dspy-jetblue-ai-chatbot-WMUUMGJ3.js", imports: ["/build/_shared/chunk-IRPVW56I.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/dspy101": { id: "routes/dspy101", parentId: "root", path: "dspy101", index: void 0, caseSensitive: void 0, module: "/build/routes/dspy101-OG5FXIUS.js", imports: ["/build/_shared/chunk-XSERSIXR.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/easydomainverificationwithgoogle": { id: "routes/easydomainverificationwithgoogle", parentId: "root", path: "easydomainverificationwithgoogle", index: void 0, caseSensitive: void 0, module: "/build/routes/easydomainverificationwithgoogle-N4HIY2R7.js", imports: ["/build/_shared/chunk-OGJMEMOB.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/how-to-invest-in-whisky": { id: "routes/how-to-invest-in-whisky", parentId: "root", path: "how-to-invest-in-whisky", index: void 0, caseSensitive: void 0, module: "/build/routes/how-to-invest-in-whisky-DZFJVEAQ.js", imports: ["/build/_shared/chunk-M5SHCGLP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/how-to-use-the-pie-menu-in-blender": { id: "routes/how-to-use-the-pie-menu-in-blender", parentId: "root", path: "how-to-use-the-pie-menu-in-blender", index: void 0, caseSensitive: void 0, module: "/build/routes/how-to-use-the-pie-menu-in-blender-M43UETLT.js", imports: ["/build/_shared/chunk-OJ2YKJ2F.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/join": { id: "routes/join", parentId: "root", path: "join", index: void 0, caseSensitive: void 0, module: "/build/routes/join-OHV6EZBL.js", imports: ["/build/_shared/chunk-IRYEX53N.js", "/build/_shared/chunk-Y6GQZCXA.js", "/build/_shared/chunk-DYV54FQG.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/liesaboutjavascript": { id: "routes/liesaboutjavascript", parentId: "root", path: "liesaboutjavascript", index: void 0, caseSensitive: void 0, module: "/build/routes/liesaboutjavascript-LBP4BELD.js", imports: ["/build/_shared/chunk-T2U3ZTMG.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-SZ7KBFYN.js", imports: ["/build/_shared/chunk-IRYEX53N.js", "/build/_shared/chunk-Y6GQZCXA.js", "/build/_shared/chunk-DYV54FQG.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-HOPHOQJQ.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/models-table": { id: "routes/models-table", parentId: "root", path: "models-table", index: void 0, caseSensitive: void 0, module: "/build/routes/models-table-D2PMF6NU.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/nab-2023-audio-video-gear": { id: "routes/nab-2023-audio-video-gear", parentId: "root", path: "nab-2023-audio-video-gear", index: void 0, caseSensitive: void 0, module: "/build/routes/nab-2023-audio-video-gear-PWCCBQ5S.js", imports: ["/build/_shared/chunk-O5PCSKPP.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes": { id: "routes/notes", parentId: "root", path: "notes", index: void 0, caseSensitive: void 0, module: "/build/routes/notes-BWJBNYEJ.js", imports: ["/build/_shared/chunk-Y6GQZCXA.js", "/build/_shared/chunk-KZNWDO46.js", "/build/_shared/chunk-DYV54FQG.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes/$noteId": { id: "routes/notes/$noteId", parentId: "routes/notes", path: ":noteId", index: void 0, caseSensitive: void 0, module: "/build/routes/notes/$noteId-ILMQLSDL.js", imports: ["/build/_shared/chunk-URNZPFSF.js", "/build/_shared/chunk-KPWQHS6G.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes/index": { id: "routes/notes/index", parentId: "routes/notes", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/notes/index-75PZYL5B.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes/new": { id: "routes/notes/new", parentId: "routes/notes", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/notes/new-LW5JSYQO.js", imports: ["/build/_shared/chunk-KPWQHS6G.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/smartbidder-diageo": { id: "routes/smartbidder-diageo", parentId: "root", path: "smartbidder-diageo", index: void 0, caseSensitive: void 0, module: "/build/routes/smartbidder-diageo-RZ7GXWZS.js", imports: ["/build/_shared/chunk-MWVEH5RE.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/the-art-of-the-clean-install": { id: "routes/the-art-of-the-clean-install", parentId: "root", path: "the-art-of-the-clean-install", index: void 0, caseSensitive: void 0, module: "/build/routes/the-art-of-the-clean-install-K5H2YZHT.js", imports: ["/build/_shared/chunk-LJONBSKC.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/three-essential-webstorm-shortcuts": { id: "routes/three-essential-webstorm-shortcuts", parentId: "root", path: "three-essential-webstorm-shortcuts", index: void 0, caseSensitive: void 0, module: "/build/routes/three-essential-webstorm-shortcuts-IV2ZG3VP.js", imports: ["/build/_shared/chunk-NCVUUDNJ.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/threejsandweb3": { id: "routes/threejsandweb3", parentId: "root", path: "threejsandweb3", index: void 0, caseSensitive: void 0, module: "/build/routes/threejsandweb3-BX4JDPBW.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/threekeys-to-getting-a-frontend-or-fullstackjob": { id: "routes/threekeys-to-getting-a-frontend-or-fullstackjob", parentId: "root", path: "threekeys-to-getting-a-frontend-or-fullstackjob", index: void 0, caseSensitive: void 0, module: "/build/routes/threekeys-to-getting-a-frontend-or-fullstackjob-Z6E5JJJ5.js", imports: ["/build/_shared/chunk-LSU3ZOZE.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/using-airpods-and-audacity-hack": { id: "routes/using-airpods-and-audacity-hack", parentId: "root", path: "using-airpods-and-audacity-hack", index: void 0, caseSensitive: void 0, module: "/build/routes/using-airpods-and-audacity-hack-O47L7IOH.js", imports: ["/build/_shared/chunk-RKRFNDQT.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/vuejs-independant-javascript-framework": { id: "routes/vuejs-independant-javascript-framework", parentId: "root", path: "vuejs-independant-javascript-framework", index: void 0, caseSensitive: void 0, module: "/build/routes/vuejs-independant-javascript-framework-GHRAHGZD.js", imports: ["/build/_shared/chunk-HOSSLJSE.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/weirdinternetfacts": { id: "routes/weirdinternetfacts", parentId: "root", path: "weirdinternetfacts", index: void 0, caseSensitive: void 0, module: "/build/routes/weirdinternetfacts-HGUVVC6U.js", imports: ["/build/_shared/chunk-HQBQR4PI.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/what-are-the-best-free-text-to-speech-tools": { id: "routes/what-are-the-best-free-text-to-speech-tools", parentId: "root", path: "what-are-the-best-free-text-to-speech-tools", index: void 0, caseSensitive: void 0, module: "/build/routes/what-are-the-best-free-text-to-speech-tools-XUL32MDI.js", imports: ["/build/_shared/chunk-43QK5DKL.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/what-is-rag": { id: "routes/what-is-rag", parentId: "root", path: "what-is-rag", index: void 0, caseSensitive: void 0, module: "/build/routes/what-is-rag-N2U35P5B.js", imports: ["/build/_shared/chunk-DHR5PEFW.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "5626fa33", hmr: void 0, url: "/build/manifest-5626FA33.js" };

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
