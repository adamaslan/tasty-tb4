import { Link } from "@remix-run/react";
import banner from "../../public/old-comp1.jpeg";
import DonutRainbow from "../components/Donut";
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
          <DonutRainbow />
          <br />
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
