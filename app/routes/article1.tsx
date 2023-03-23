import { Link } from "@remix-run/react";
import banner from "../../public/old-comp1.jpeg"

export default function Article1() {
  return (
    <div>



      <div className=" mx-36 lg:mx-72">
      <h1 className="text-center text-2xl font-extrabold tracking-light sm:text-4xl lg:text-7xl text-blue-500 mx-10">4 Weird Things about the Internet </h1>
        <img
          className="h-full w-full  "
          src={banner}
          alt="dudes messing with an old computer"
        />

      <div>
        <p className="text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl">
          Weird internet things. Let's go!</p>
        <ol className="text-left text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl">
          <li>1. Before internet, there was ARPANET and packet switching.</li>
          <li>
            2. The word Internet was first used in 1974 and is short for
            internetwork.
          </li>
          <li>3. Internet used to be capitalized more, lol.</li>
          <li>
            4. CERN, creators of the Large Hadron Collider(LHC), is credited
            with the first highspeed T1 (1.5 Mbit/s) link, which connected CERN
            to Cornell University.
          </li>
        </ol>
      </div>
        <p className="text-center text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl text-yellow-500">
          Go back <Link to="/" className=" text-center text-6xl font-extrabold tracking-tight sm:text-xl lg:text-4xl text-blue-500">
             Home
          </Link>
        </p>
      </div>
    </div>
  );
}
