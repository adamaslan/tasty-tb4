
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">

            <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-blue-500 drop-shadow-md">
            Tasty Tech Bytes
                </span>
              </h1>

              <p className="text-center text-6xl font-extrabold tracking-tight sm:text-xl lg:text-4xl"> Always Tasty:</p>
              <Link
                to="/article1"
              >
              </Link>
              <Link
                to="/article2"
              >
              </Link>

              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <Link
                  to="/article1"
                >
                </Link>


                <p className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl"> ARTICLES Coming Soon!</p>
              </div>



            <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
              <Link
                to="/article1"
              >
                Cute little Article  here
              </Link></h1>

    </main>
);
}