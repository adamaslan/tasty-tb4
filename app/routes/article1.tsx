import { Link } from "@remix-run/react";
import banner from "../../public/old-comp1.jpeg";

export default function Article1() {
  return (
    <div>
      <div className=" mx-3 lg:mx-36">
        <h1 className="tracking-light mx-10 text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl">
          4 Weird Things about the Internet{" "}
        </h1>
        <img
          className="h-full w-full  "
          src={banner}
          alt="dudes messing with an old computer"
        />

        <div>
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-2xl">
            Weird internet things. Let's go!
          </p>
          <br />
          <ol className="text-left text-xl tracking-tight sm:text-2xl lg:text-2xl">
            <li className="pb-2">
              1. Before internet, there was ARPANET and packet switching.
            </li>
            <li className="pb-2">
              2. The word Internet was first used in 1974 and is short for
              internetwork.
            </li>
            <li className="pb-2">
              3. Internet used to be capitalized more, lol.
            </li>
            <li className="pb-2">
              4. CERN, creators of the Large Hadron Collider(LHC), is credited
              with the first highspeed T1 (1.5 Mbit/s) link, which connected
              CERN to Cornell University.
            </li>
          </ol>
        </div>
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
  );
}
