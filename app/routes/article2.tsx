import { Link} from "@remix-run/react";

import analytics from "../../public/analytics1.jpeg"


export default function Article2() {


  return (


    <div>

      <img
        className="h-full w-full object-cover"
        src={analytics}
        alt="dudes messing with an old computer"
      />

      <div className="pl-10">
        <h1 className="text-center text-2xl font-extrabold tracking-light sm:text-4xl lg:text-7xl text-blue-500">The Easy Way to Verify Domain Ownership with Google</h1>

        <p className="text-center text-xl font-extrabold tracking-tight sm:text-2xl lg:text-4xl">

          Oh domains! The web of developer sadness they can indeed weave. Luckily, whether your building your website with just HTML or in React with Nextjs, there is an easy solution for you.
          If you have already found the Google's Publisher Center <a href="https://publishercenter.google.com/">  Google's Publisher Center </a>, then you are half of the way there. Next, comes the challenging part, Domain Verification.
          So what is the easy solution already? HTML Tags. Yes, just put the verification tags in your{"<Head>"} section on the main page of your site.
          This can be a bit tricky with something like Nextjs as their is no index.html. Instead, its just the index.js {"<Head>"}section that u must import like so:
            import Head from "next/head";
            Hope this helps!
          For more info check <a href="https://support.google.com/webmasters/answer/9008080#domain_name_verification&zippy=%2Cdomain-name-provider%2Chtml-file-upload"> Google's docs </a>
        </p>








      </div>
    </div>

  );
}