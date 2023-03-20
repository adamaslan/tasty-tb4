import { Link} from "@remix-run/react";


export default function Article2() {


  return (


    <div className="h-full w-80 border-r bg-gray-50">
      <Link to="/article1" className="block p-4 text-xl text-blue-500">
        ARTICLE 1
      </Link>
      {/*The Easy Way to Verify Domain Ownership with Google*/}
      {/*Oh domains! The web of developer sadness they can indeed weave. Luckily, whether your building your website with just HTML or in React with Nextjs, there is an easy solution for you.*/}
      {/*If you have already found the Google's Publisher Center , then you are half of the way there. Next, comes the challenging part, Domain Verification.*/}
      {/*So what is the easy solution already? HTML Tags. Yes, just put the verification tags in your <Head> section on the main page of your site.*/}
      {/*This can be a bit tricky with something like Nextjs as their is no index.html. Instead, its just the index.js <Head> section that u must import like so:*/}
      {/*  import Head from "next/head";*/}
      {/*  Hope this helps!*/}
      {/*  For more info check Google's docs*/}




        <p className="p-4">Article 2</p>
    </div>

  );
}