

import { Link } from "@remix-run/react";
import airpods from "../../public/airpods.jpeg";

export default function Article4() {
  return (
    <div>
      <div className=" mx-3 lg:mx-36">
        <h1 className="tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl">

          AirPods Audacity: How to make AirPods(or any other bluetooth audio) work with Audacity 2023  </h1>
        <img
          className="h-1/2 w-1/2 mx-auto my-auto "
          src={airpods}
          alt="airpods"
        />

        <div>
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            AirPods Audacity: How to make AirPods(or any other bluetooth audio) work with Audacity 2023

            Often times AirPods (or any other bluetooth headphones) and Audacity don’t play well together.
            Well luckily, as of 2023, there is a way to sync up audacity and airports.</p> <br />
          <p className='text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold'>
            To do it:<br />
            -have your AirPods connected to you computer<br />
            -click the transport tab<br />
            -select “rescan audio devices”<br />
            -click on audio setup<br />
            -click playback device<br />
            -select your AirPods (or other bluetooth auto devices)<br />
        </p>
          <br />

          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold"> For more Audacity and podcasts, you can visit
            <a href='https://www.lifewire.com/best-podcast-recording-software-2722085' className='text-blue-500'>{" "}here</a>.
          </p>
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

