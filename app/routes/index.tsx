
import { Link } from "@remix-run/react";
import analytics from "../../public/analytics1.jpeg"
import banner from "../../public/old-comp1.jpeg"

export default function Art2() {
  return (
    <main className=" min-h-screen bg-white  items-left justify-left mx-36 lg:mx-72">

            <h1 className="text-left text-xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl ">
                <span className="block uppercase text-blue-500 drop-shadow-md">
            Tasty Tech Bytes
                </span>
              </h1>

              <p className="text-left text-xl font-extrabold tracking-tight sm:text-xl lg:text-4xl"> Keeping it Tasty in 2023</p>



              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-left shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30">
                <Link
                  to="/article1"
                >
                </Link>


                {/*<p className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl"> ARTICLES Coming Soon!</p>*/}
              </div>

<div className="bg-blue-900 text-lg text-white rounded-full font-bold tracking-tight p-1">Code World - Fun</div>
      <img
        className="h-auto max-w-full rounded-full flex-col items-left m-2 justify-left"
        src={banner}
        alt="computer and graphs"
      />
            <h1 className="text-left text-xl pb-4 font-bold tracking-tight sm:text-3xl lg:text-4xl lg:pb-12 ">
              <Link
                to="/article1"
              >
                4 Weird Things about the Internet
              </Link></h1>

      <Link
        to="/article2"
      >
        <div className="bg-red-900 text-lg text-white rounded-full font-bold tracking-tight p-1">Code World - Helpful</div>
      <img
        className="h-auto max-w-full flex-col m-2 rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
        src={analytics}
        alt="computer and graphs"
      />
      <h1 className="text-left text-lg pb-3 font-bold tracking-tight shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30 sm:text-3xl lg:text-4xl">

        The Easy Way to Verify Domain Ownership with Google
     </h1>   </Link>




      <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-left shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30">
        <Link
          to="/article1"
        >
        </Link>


        {/*<p className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl"> ARTICLES Coming Soon!</p>*/}
      </div>

      <div className="bg-red-900 text-lg text-white rounded-full font-bold tracking-tight p-1 ">Code World - Helpful</div>
      <img
        className="h-auto max-w-full rounded-full flex-col items-left m-2 justify-left"
        src={banner}
        alt="computer and graphs"
      />
      <h1 className="text-left text-xl pb-4 font-bold tracking-tight sm:text-3xl lg:text-4xl lg:pb-12 ">
        <Link
          to="/article3"
        >
         Sweet Little JavaScript Lies
        </Link></h1>




    </main>
);
}