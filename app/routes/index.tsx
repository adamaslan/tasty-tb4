
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              {/*<img*/}
              {/*  className="h-full w-full object-cover"*/}
              {/*  src="https://user-images.githubusercontent.com/1500684/157774694-99820c51-8165-4908-a031-34fc371ac0d6.jpg"*/}
              {/*  alt="Sonic Youth On Stage"*/}
              {/*/>*/}
              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-blue-500 drop-shadow-md">
            Tasty Tech Bytes
                </span>
              </h1>
              {/*<p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">*/}
              {/*  Check the .md file for instructions on how to get this*/}
              {/*  project deployed.*/}
              {/*</p>*/}
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
            </div>

            <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">

              <p className="text-center text-6xl font-extrabold tracking-tight sm:text-xl lg:text-4xl"> Stuff We're Interesting in </p>


            </div>
            <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
              <Link
                to="/article1"
              >
                Cute little Article  here
              </Link></h1>

          </div>
    </main>
);
}