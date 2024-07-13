
import { Link} from "@remix-run/react";

import graph4 from "../../public/graph4.jpeg";
import type {

  MetaFunction,
} from "@remix-run/node";
export const meta: MetaFunction = () => {
  return {
    title: "The Art of the Clean Install",
    "og:image": graph4,
  };
};

export default function Article7() {
  return (
    <div>
      <div className=" mx-3 lg:mx-36">
        <h1 className="tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl">

          The Art of the Clean Install
        </h1>
        <img
          className="h-1/2 w-1/2 mx-auto my-auto "
          src={graph4}
          alt="a graph"
        />

        <div>
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            Coder says “yeh, bruh, did a clean install and it works great…simple is as simple does”

            Well, that’s all fine and good, but then you have to use NVM and Tailwind UI. Not to mention, you want to support the “good guys” and use buggy-ass NUXT. Oy vey.
          </p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            It’s hard to remember what a “clean install” actually is.

            Well, as one steps out of the dark tunnel of installing  the NUXT framework with Tailwind UI, the idea of a clean install becomes convoluted, murky, strange, etc.
          </p><br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            Thus, it becomes important to take a step back and provide the steps to do a clean install. <br />The steps are:

          </p> <br />
          <ol className="text-left text-xl tracking-tight sm:text-2xl lg:text-2xl">
            <li className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
               1. Delete the projects Node Modules
            </li>
            <li className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
              2. Delete package.lock or yarn lock or whatever other lock equivalents{" "}
              <a href="https://classic.yarnpkg.com/lang/en/docs/yarn-lock/">
                <u>Yarn Lock Docs</u>
              </a>

            </li>
            <li className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
              3. Then run npm I or whatever package manager equivalents
            </li>

            <li className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">4. Then try to run project via npm run dev or equivalents</li>
          </ol>{" "}
          <p className="text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl">
            Go back{" "}
            <Link
              to="/"
              className=" text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl"
            >
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
