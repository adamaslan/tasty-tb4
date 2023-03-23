
import { Link } from "@remix-run/react";
import analytics from "../../public/analytics1.jpeg"
import banner from "../../public/old-comp1.jpeg"

export default function Art2() {
  return (
    <main className=" min-h-screen bg-white  items-center justify-center mx-36 lg:mx-72">

            <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl ">
                <span className="block uppercase text-blue-500 drop-shadow-md">
            Tasty Tech Bytes
                </span>
              </h1>

              <p className="text-center text-6xl font-extrabold tracking-tight sm:text-xl lg:text-4xl"> Keeping it Tasty in 2023</p>



              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30">
                <Link
                  to="/article1"
                >
                </Link>


                {/*<p className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl"> ARTICLES Coming Soon!</p>*/}
              </div>


      <img
        className="h-auto max-w-full rounded-full flex-col items-center justify-center"
        src={banner}
        alt="computer and graphs"
      />
            <h1 className="text-center text-xl font-bold tracking-tight sm:text-8xl lg:text-9xl">
              <Link
                to="/article1"
              >
                Weird Things about the Internet and lies about JavaScript
              </Link></h1>

      <Link
        to="/article2"
      >
      <img
        className="h-auto max-w-full flex-col rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
        src={analytics}
        alt="computer and graphs"
      />
      <h1 className="text-center text-lg font-bold tracking-tight sm:text-8xl lg:text-9xl">

        The Easy Way to Verify Domain Ownership with Google
     </h1>   </Link>

    </main>
);
}