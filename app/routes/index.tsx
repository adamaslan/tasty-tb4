import { Link } from "@remix-run/react";
import analytics from "../../public/analytics1.jpeg";
import banner from "../../public/old-comp1.jpeg";
import studio from "../../public/studio.jpg";
import burden from "../../public/js-burden.jpeg";
import box from "../../public/boxchicken2.jpeg";
import graph4 from "../../public/graph4.jpeg";
import blender1 from "../../public/blender1.jpeg";
import airpods from "../../public/airpods.jpeg";
import js1 from "../../public/js1.jpeg";
import soundguy1 from "../../public/soundsguy1.jpeg";
import webstorm1 from "../../public/webstorm1.jpeg";
import cloud from "../../public/cloud1.jpeg"
import cask from "../../public/cask1.jpeg";
import letters1 from "../../public/letters1.png";
import databricks from "../../public/databricks.png";
import dspyprompt from "../../public/dspyprompt.png";
import type {  } from "remix";

export function meta() {
  return {  "og:image": box}}

export default function Art2() {

  return (
    <main className=" items-left justify-left mx-4 min-h-screen bg-white lg:mx-36 md:mx-16">
    
    <h1 className="text-left text-xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl ">
        <span className="block uppercase text-blue-500 drop-shadow-md">
          Tasty Tech Bytes
        </span>
      </h1>

      <p className="text-left text-xl font-extrabold tracking-tight sm:text-xl lg:text-4xl">
        {" "}
        Keeping it Tasty in 2024
      </p>
      
      {/* elaborate div section */}

      <div className="grid lg:grid-cols-4 h-1/4 gap-4"> 
      <div className="col-span-1  h-1/4  ">
 
      <Link to="/how-to-invest-in-whisky">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-yellow-200 p-1 text-lg font-bold tracking-tight text-white">
            Drink World - Helpful
          </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={cask}
            alt="casks"
          />
          <h1 className="pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
          3 Ways to Invest in Whiskey
          </h1>

        </div>
      </Link>
      <Link to="/artihow-to-use-the-pie-menu-in-blender">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
        <div className="rounded-full bg-purple-900 p-1 text-lg font-bold tracking-tight text-white">
            3D World - Helpful
          </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={blender1}
            alt="computer and graphs"
          />
          <h1 className="pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
            The Pie Menu Rocks in Blender
          </h1>

        </div>
      </Link>
      </div>
      
       <div className="lg:col-span-2  lg:h-1/4  "><Link to="/three-essential-webstorm-shortcuts">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-blue-500 p-1 text-lg font-bold tracking-tight text-white">
            Software - Webstorm
          </div>
          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={webstorm1}
            alt="computer and graphs"
          />
          <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
            The Three WebStorm Shortcuts to Rule Them All
          </h1>{" "}
        </div>
      </Link></div>

        <div className="col-span-1 h-1/4 "> <Link to="/weirdinternetfacts">

        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-green-400 p-1 text-lg font-bold tracking-tight text-white">
            Code World - The Internet
          </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={banner}
            alt="computer and graphs"
          />
          <h1 className="pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
            4 Weird Things about the Internet
          </h1>
        </div>
      </Link>
      
      
     
      <Link to="/nab-2023-audio-video-gear">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white">
            Code World - Helpful
          </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={soundguy1}
            alt="computer and graphs"
          />
          <h1 className="pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
            Highlights from NAB 2023
          </h1>

        </div>
      </Link>
          </div> 


        </div>


{/* smaller div section */}


        <div className="grid grid-cols-4 h-1/4 gap-4">
          
           <div className="col-span-1 row-span-1 "> <Link to="/threekeys-to-getting-a-frontend-or-fullstackjob">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white">
            Code World - Helpful
          </div>
          <img
            className="m-2 h-auto flex-col rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
            src={studio}
            alt="Studio by Warren Hansen"
          />
          <h1 className="pb-3 text-left text-lg font-bold tracking-tight shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30 sm:text-3xl lg:text-4xl">
            The 3 Keys To Getting Your Dream Frontend or Full Stack Engineer Job
          </h1>{" "}
        </div>
      </Link></div> 
           
           <div className="col-span-1 "> <Link to="/vuejs-independant-javascript-framework">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white">
            Code World - Helpful
          </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={burden}
            alt="computer and graphs"
          />
          <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
            VueJS as the Most Indie Yet Established Javascript Framework
          </h1>
        </div>
      </Link></div>
            <div className="col-span-1  ">
      <Link to="/astro-the-most-innovative-javascript-framwork">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white">
            Code World - Helpful
          </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={box}
            alt="computer and graphs"
          />
          <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
            Astro.js as the Most Innovative and Modern Javascript Framework
          </h1>
        </div>
      </Link>
      </div>
             <div className="col-span-1  ">
     
     <Link to="/the-art-of-the-clean-install">
       <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
         <div className="rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white">
           Code World - Helpful
         </div>

         <img
           className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
           src={graph4}
           alt="computer and graphs"
         />
         <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
           The Art of the Clean Install
         </h1>

       </div>
     </Link></div> 
     </div>

    
     {/* Bigger articles */}

     

     <Link to="/dspy101">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white">
            AI Tips
          </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={dspyprompt}
            alt="dspyprompt"
          />
          <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">DSPy 101 Tutorial: Prompting Guide</h1>
        </div>
      </Link>   

     <Link to="/databricks-dspy-jetblue-ai-chatbot">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white">
            AI Tips
          </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={databricks}
            alt="databricks"
          />
          <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl "> JetBlue Optimizes Databricks LLM Pipelines with DSPy </h1>
        </div>
      </Link>   

     <Link to="/5waystoenhanceragefficiencywithdspy">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-purple-400 p-1 text-lg font-bold tracking-tight text-white">
            AI Tips
          </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={letters1}
            alt="letters"
          />
          <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl "> 5 ways to enhance RAG efficiency with DSPy   </h1>
        </div>
      </Link>
      
      <Link to="/threejsandweb3">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-yellow-400 p-1 text-lg font-bold tracking-tight text-white">
            Code Art - ThreeJS
          </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={cloud}
            alt="clouds"
          />
          <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
            ThreeJS, the old Web3?
          </h1>
        </div>
      </Link>

      <Link to="/easydomainverificationwithgoogle">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
        <div className="rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white">
           Code World - Helpful
         </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={analytics}
            alt="analytics chart"
          />
          <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
          The Easy Way to Verify Domain Ownership with Google
          </h1>
        </div>
      </Link>
      <Link to="/liesaboutjavascript">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
        <div className="rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white">
           Code World - Helpful
         </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={js1}
            alt="javascript chart"
          />
          <h1 className="pb-4 text-left text-xl font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
          Sweet Little JavaScript Lies About Javascript          </h1>
        </div>
      </Link>
      <Link to="/using-airpods-and-audacity-hack">
        <div className="transition-shadow duration-300 ease-in-out hover:bg-gray-100">
          <div className="rounded-full bg-red-900 p-1 text-lg font-bold tracking-tight text-white">
            Code World - Helpful
          </div>

          <img
            className="items-left justify-left m-2 h-auto max-w-full flex-col rounded-full"
            src={airpods}
            alt="computer and graphs"
          />
          <h1 className="pb-4 text-left text-lg font-bold tracking-tight sm:text-3xl lg:pb-12 lg:text-4xl ">
            AirPods Audacity: How to make AirPods(or any other bluetooth audio) work with Audacity 2023
          </h1>

        </div>
      </Link>
    </main>
  );
}
