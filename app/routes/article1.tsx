import { Link } from "@remix-run/react";
import banner from "../../public/old-comp1.jpeg"

export default function Article1() {
  return (
    <div>

      <img
        className="h-full w-full object-cover mx-10"
        src={banner}
        alt="dudes messing with an old computer"
      />

      <div className="pl-10 mx-36 lg:mx-72">
      <h1 className="text-center text-2xl font-extrabold tracking-light sm:text-4xl lg:text-7xl text-blue-500 mx-10">Weird Things about the Internet and lies about JavaScript</h1>
        <p className="text-center text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl">
        Sometimes it's important to take a break from JavaScript and just find out weird things about the internet. Sooo...lettuce dive in a bit. So sure, JavaScript is cool but what does it do? Well, that's a challenging thing to say with the rise of NodeJS and the developments of HTML5. For example, many will say you need JS for validating input values of a form before the data is sent to a web server, but HTML5 is also doing great work with form validation. So it would be a big rotten lie to say JS is the only way to do form validation on the world wide web and people are really leaning into shipping less JS these days so maybe it's time to dive even deeper into html form validation.
      </p>
        <br />
      <div>
        <p className="text-center text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl">
          Anyways, weird internet things. Let's go!</p>
        <ol className="text-center text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl">
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
