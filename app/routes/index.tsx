import { Link } from "@remix-run/react";
import analytics from "../../public/analytics1.jpeg";
import banner from "../../public/old-comp1.jpeg";
import studio from "../../public/studio.jpg";
export default function Art2() {
  return (
    <main className=" items-left justify-left  mx-3 min-h-screen bg-white lg:mx-36 ">
      <h1 className="text-left text-xl font-extrabold tracking-tight sm:text-3xl lg:text-6xl ">
        <span className="block uppercase text-blue-500 drop-shadow-md">
          Tasty Tech Bytes
        </span>
      </h1>

      <p className="text-left text-xl font-extrabold tracking-tight sm:text-xl lg:text-4xl">
        {" "}
        Keeping it Tasty in 2023
      </p>
      <Link to="/article1">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="sm:justify-left mx-auto mt-10 max-w-sm shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30 sm:flex sm:max-w-none">
            {/*<p className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl"> ARTICLES Coming Soon!</p>*/}
          </div>

          <div className="rounded-full bg-blue-900 p-1 text-lg font-bold tracking-tight text-white">
            Code World - Fun
          </div>
          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={banner}
            alt="computer and graphs"
          />
          <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
            4 Weird Things about the Internet
          </h1>
        </div>
      </Link>
      <Link to="/article2">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white">
            Code World - Helpful
          </div>
          <img
            className="m-2 h-auto max-w-full flex-col rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
            src={analytics}
            alt="computer and graphs"
          />
          <h1 className="pb-3 text-left text-lg font-bold tracking-tight shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30 sm:text-3xl lg:text-4xl">
            The Easy Way to Verify Domain Ownership with Google
          </h1>{" "}
        </div>
      </Link>

      <Link to="/article4">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white">
            Code World - Helpful
          </div>
          <img
            className="m-2 h-auto max-w-full flex-col rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
            src={studio}
            alt="Studio by Warren Hansen"
          />
          <h1 className="pb-3 text-left text-lg font-bold tracking-tight shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30 sm:text-3xl lg:text-4xl">
            The 3 Keys To Getting Your Dream Frontend or Full Stack Engineer Job
          </h1>{" "}
        </div>
      </Link>

      <div className="sm:justify-left mx-auto mt-10 max-w-sm shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30 sm:flex sm:max-w-none">
        {/*<p className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl"> ARTICLES Coming Soon!</p>*/}
      </div>
      <Link to="/article3">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white ">
            Code World - Helpful
          </div>
          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={banner}
            alt="computer and graphs"
          />
          <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
            Sweet Little JavaScript Lies
          </h1>
        </div>
      </Link>
    </main>
  );
}
