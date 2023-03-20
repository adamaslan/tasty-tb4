
import { Link } from "@remix-run/react";
import banner from "../../public/old-comp1.jpeg";
import analytics from "../../public/analytics1.jpeg"

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

              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30">
                <Link
                  to="/article1"
                >
                </Link>


                {/*<p className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl"> ARTICLES Coming Soon!</p>*/}
              </div>


      <img
        className="h-auto max-w-full rounded-full"
        src={banner}
        alt="dudes messing with an old computer"
      />
            <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
              <Link
                to="/article1"
              >
                Weird Things about the Internet and lies about JavaScript
              </Link></h1>

      <Link
        to="/article1"
      >
      <img
        className="h-auto max-w-full rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
        src={analytics}
        alt="computer and graphs"
      />
      <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">

        The Easy Way to Verify Domain Ownership with Google
     </h1>   </Link>

    </main>
);
}