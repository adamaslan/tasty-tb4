import { Link } from "@remix-run/react";
import box from "../../public/boxchicken2.jpeg";
export default function Article5() {
  return (
    <div>
      {" "}
      <div className=" mx-3 lg:mx-36">
        {" "}
        <h1 className="tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl">
          {" "}
          Astro.js as the Most Innovative and Modern Javascript Framework{" "}
        </h1>{" "}
        <img
          className="mx-auto my-auto h-1/2 w-1/2 "
          src={box}
          alt="Chicken Box Space Ship"
        />{" "}
        <div>
          {" "}
          <p className="text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            {" "}
            While there are established frameworks that have a loyal fanbase
            (React, Vue, Angular), and promising newcomers that offer a fresh
            perspective (Svelte, SolidJS), the most exciting and groundbreaking
            framework in the Javascript ecosystem is Astro.{" "}
          </p>
          <br />{" "}
          <p className="text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            {" "}
            Astro is a new kind of framework that lets you build faster websites
            with your favorite UI components. Astro renders your pages to static
            HTML at build time for optimal performance. No JavaScript runtime
            required. You can use any UI component library (React, Vue, Svelte
            and more) or write your own components using HTML and CSS. Astro
            makes it easy to build modern websites without sacrificing
            performance or user experience.{" "}
          </p>{" "}
          <br />{" "}

          <p className='text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl'>Astro islands are interactive UI components that render in isolation on a static HTML page. They use partial hydration, a technique that Astro handles automatically, to enable multiple islands with different functionalities on the same page. Astro uses zero client-side JavaScript by default because it renders every component to HTML ahead of time and then strips out all the JavaScript Astro islands are like mini-apps that can coexist harmoniously in a sea of HTML, bringing life and interactivity to your web pages.</p>


          <br />{" "}
          <p className="text-left font-serif text-lg font-bold tracking-tight sm:text-2xl lg:text-3xl">
            {" "}
            For the Astro docs, you can visit{" "}
            <a href="https://astro.build/" className="text-blue-500">
              {" "}
              here
            </a>
            .{" "}
          </p>{" "}
          <p className="text-center text-lg font-extrabold tracking-tight text-yellow-500 sm:text-2xl lg:text-4xl">
            {" "}
            Go back{" "}
            <Link
              to="/"
              className=" text-center text-6xl font-extrabold tracking-tight text-blue-500 sm:text-xl lg:text-4xl"
            >
              {" "}
              Home{" "}
            </Link>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
