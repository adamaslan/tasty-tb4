import { Link } from "@remix-run/react";
import burden from "../../public/js-burden.jpeg";

export default function Article4() {
  return (
    <div>
      <div className=" mx-3 lg:mx-36">
        <h1 className="tracking-light  text-center text-2xl font-extrabold text-blue-500 sm:text-4xl lg:text-5xl">

          VueJS as the Most Indie Yet Established Javascript Framework

        </h1>
        <img
          className="h-1/2 w-1/2 mx-auto my-auto "
          src={burden}
          alt="Studio by Warren Hansen"
        />

        <div>
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            While there are newcomers that got that hot cheese (Astro), and lesser known yet exciting seeming frameworks (SolidJS), the uber DIY (Eleventy), the one time indie-darlings turned (Svelte)

          </p>
<br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">
            There is a sweet ring to Vue’s branding: “The Progressive JavaScript Framework
            An approachable, performant and versatile framework for building web user interfaces.”

          </p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">In other exciting Vuejs related news NUXT the go to framework of vue recently released its third version and seems like a great open source project to contribute to! NUXT 3 brings many new features and improvements, such as serverless rendering, auto-imported components, file-based routing and more.</p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">Vue is definitely more indie with no Facebook backing, but it is still very established. Vuejs also has a vibrant ecosystem of libraries and tools that make it easy to create rich and interactive web applications. For example, pinia is a state management library that helps you manage the data flow in your app with a simple and intuitive API, Vue Router is a routing library that lets you navigate between different views, and Vite is a fast and modern build tool that supports hot module replacement and code splitting.</p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">Another reason to love Vuejs is its excellent documentation and community support. The official docs are clear, comprehensive and full of examples.
         You can also find many tutorials, courses, books and podcasts on Vuejs online. The Vuejs community is friendly, welcoming and active on various platforms such as Discord, Reddit, Stack Overflow and Twitter. You can always find help and inspiration from other Vuejs developers.</p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold">If you are looking for an alternative to Vuex, you might want to check out
            <a href='https://pinia.esm.dev/' className='text-blue-500' >{" "}Pinia</a>, a state management library that works well with Vuejs.</p>
          <br />
          <p className="text-left text-lg tracking-tight sm:text-2xl lg:text-3xl font-serif font-bold"> For the vue docs, you can visit
            <a href='https://vuejs.org/' className='text-blue-500'>{" "}here</a>.
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